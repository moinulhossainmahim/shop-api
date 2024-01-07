import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entity/Order';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/entity/User';
import { OrderItemsService } from 'src/order-items/order-items.service';
import {
  CreateApiResponse,
  ApiGetResponse,
  ApiDeleteResponse,
} from 'src/common/interfaces';
import { PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import { StripeService } from 'src/stripe/stripe.service';
import { ProductsService } from 'src/products/products.service';
import { CheckAvailabilityDto } from './dto/check-availability.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly orderItemsService: OrderItemsService,
    private readonly stripeService: StripeService,
    private readonly productsService: ProductsService,
  ) {}

  async createOrder(
    user: User,
    createOrderDto: CreateOrderDto,
  ): Promise<CreateApiResponse<Omit<Order, 'user'>>> {
    const orderItems = await Promise.all(
      createOrderDto.orderItems.map((orderItem) =>
        this.orderItemsService.createOrderItem(orderItem),
      ),
    );
    const order = {
      ...createOrderDto,
      orderItems,
      user,
    };
    const neworder = this.ordersRepository.create(order);
    try {
      const savedOrder = await this.ordersRepository.save(neworder);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, ...newSavedOrder } = savedOrder;
      return {
        data: newSavedOrder,
        message: 'Order placed successfully',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getAllOrdersOfAUser(
    user: User,
    pageOptionsDto: PageOptionsDto,
  ): Promise<ApiGetResponse<any>> {
    const orders = await this.ordersRepository.find({
      where: { user: { id: user.id } },
      relations: ['orderItems', 'shippingAddress', 'billingAddress'],
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    });
    const newOrders = await Promise.all(
      orders.map(async (order) => {
        const items = await Promise.all(
          order.orderItems.map(
            async (item) =>
              await this.orderItemsService.getOrderItemById(item.id),
          ),
        );
        return {
          ...order,
          orderItems: items,
        };
      }),
    );
    const [_foundOrders, itemCount] = await this.ordersRepository.findAndCount({
      where: { user: { id: user.id } },
    });
    const meta = new PageMetaDto({ itemCount, pageOptionsDto });
    return {
      success: true,
      data: newOrders,
      meta: meta,
      message: 'Orders fetched successfully',
    };
  }

  async deleteOrderById(id: string): Promise<ApiDeleteResponse> {
    const result = await this.ordersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found!`);
    }
    return {
      message: 'Order deleted successfully',
      data: [],
      success: true,
    };
  }

  async findOrderById(id: string): Promise<CreateApiResponse<Order>> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderItems', 'shippingAddress', 'billingAddress'],
    });
    const orderItems = await Promise.all(
      order.orderItems.map(
        async (item) => await this.orderItemsService.getOrderItemById(item.id),
      ),
    );
    order.orderItems = orderItems;
    return {
      message: 'Fetched order successfully',
      data: order,
      success: true,
    };
  }

  async updateOrderById(
    id: string,
    updateOrderDto: Partial<CreateOrderDto>,
  ): Promise<CreateApiResponse<Order>> {
    const result = await this.ordersRepository.update(id, updateOrderDto);
    if (result.affected !== 0) {
      const updateOrder = this.findOrderById(id);
      return {
        message: 'Order updated successfully',
        data: (await updateOrder).data,
        success: true,
      };
    }
  }

  async getAllUsersOrders(
    pageOptionsDto: PageOptionsDto,
  ): Promise<ApiGetResponse<any>> {
    const orders = await this.ordersRepository.find({
      relations: ['orderItems', 'shippingAddress', 'billingAddress'],
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
    });
    const newOrders = await Promise.all(
      orders.map(async (order) => {
        const items = await Promise.all(
          order.orderItems.map(
            async (item) =>
              await this.orderItemsService.getOrderItemById(item.id),
          ),
        );
        return {
          ...order,
          orderItems: items,
        };
      }),
    );
    const itemCount = await this.ordersRepository.count();
    const meta = new PageMetaDto({ itemCount, pageOptionsDto });
    return {
      success: true,
      data: newOrders,
      meta: meta,
      message: 'Orders fetched successfully',
    };
  }

  async checkAvailability(
    checkAvailabilityDto: CheckAvailabilityDto,
  ): Promise<CreateApiResponse<any>> {
    const result = await this.productsService.checkIfProductsExist(
      checkAvailabilityDto,
    );
    console.log(result);
    if (result) {
      return {
        message: 'Customer can continue the process',
        success: true,
        data: [],
      };
    } else {
      return {
        message: 'Product with the given quantity not available',
        success: false,
        data: [],
      };
    }
  }
}
