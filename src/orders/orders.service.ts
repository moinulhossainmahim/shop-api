import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entity/Order';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/entity/User';
import { OrderItemsService } from 'src/order-items/order-items.service';
import { generateTrackingNo } from 'src/utils/generate-tracking-no';
import { ApiGetResponse } from 'src/common/get-response.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private OrdersRepository: Repository<Order>,
    private orderItemsService: OrderItemsService,
  ) {}

  async createOrder(user: User, createOrderDto: CreateOrderDto) {
    const { orderItems, ...newCreateOrderDto } = createOrderDto;
    const order = this.OrdersRepository.create({
      user,
      ...newCreateOrderDto,
      tracking_no: generateTrackingNo(),
    });
    try {
      const orderedItem = await this.OrdersRepository.save(order);
      for (const product of orderItems) {
        await this.orderItemsService.createOrderItem({
          productId: product.id,
          quantity: product.quantity,
          unit_price: product.salePrice,
          orderId: orderedItem.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAllOrdersOfAUser(user: User): Promise<ApiGetResponse<Order>> {
    const orders = await this.OrdersRepository.find({
      where: { user: { id: user.id } },
      relations: ['orderItems'],
    });
    return {
      success: true,
      data: orders,
      meta: {
        page: 1,
        take: 0,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: true,
      },
      message: 'Orders fetch successfully',
    };
  }

  async deleteOrderById(id: string) {
    const result = await this.OrdersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found!`);
    }
  }
}