import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/entity/OrderItem';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private OrderItemRepository: Repository<OrderItem>,
  ) {}
  async createOrderItem(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = this.OrderItemRepository.create(createOrderItemDto);
    try {
      await this.OrderItemRepository.save(orderItem);
    } catch (error) {
      console.log(error);
    }
  }
}
