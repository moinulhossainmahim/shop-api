import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/entity/OrderItem';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { Product } from 'src/entity/Product';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private OrderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createOrderItem(createOrderItemDto: CreateOrderItemDto) {
    const data = await this.productRepository.findOne({
      where: { id: createOrderItemDto.productId },
    });
    const orderItem = new OrderItem();
    orderItem.quantity = createOrderItemDto.quantity;
    orderItem.subtotal = createOrderItemDto.subtotal;
    orderItem.unit_price = createOrderItemDto.unit_price;
    orderItem.product = data;
    try {
      const savedOrderItem = await this.OrderItemRepository.save(orderItem);
      const itemsWithProduct = await this.OrderItemRepository.findOne({
        where: { id: savedOrderItem.id },
        relations: ['product'],
      });
      return itemsWithProduct;
    } catch (error) {
      if (error.errno === 1452) {
        throw new BadRequestException('Order item ID must be a product ID');
      }
      console.log(error);
    }
  }

  async getOrderItemById(id: string) {
    const orderItem = await this.OrderItemRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    return orderItem;
  }
}
