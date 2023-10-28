import { OrderItem } from 'src/entity/OrderItem';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { Product } from 'src/entity/Product';
export declare class OrderItemsService {
    private OrderItemRepository;
    private productRepository;
    constructor(OrderItemRepository: Repository<OrderItem>, productRepository: Repository<Product>);
    createOrderItem(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem>;
    getOrderItemById(id: string): Promise<OrderItem>;
}
