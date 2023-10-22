import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entity/Order';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/entity/User';
import { OrderItemsService } from 'src/order-items/order-items.service';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
import { CreateApiResponse } from 'src/common/create-response.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private orderItemsService: OrderItemsService,
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

  async getAllOrdersOfAUser(user: User): Promise<ApiGetResponse<any>> {
    const orders = await this.ordersRepository.find({
      where: { user: { id: user.id } },
      relations: ['orderItems', 'shippingAddress', 'billingAddress'],
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
    return {
      success: true,
      data: newOrders,
      meta: {
        page: 1,
        take: 0,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      },
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
}
