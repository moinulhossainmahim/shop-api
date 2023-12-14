import { Order } from 'src/entity/Order';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/entity/User';
import { OrderItemsService } from 'src/order-items/order-items.service';
import { CreateApiResponse, ApiGetResponse, ApiDeleteResponse } from 'src/common/interfaces';
export declare class OrdersService {
    private ordersRepository;
    private orderItemsService;
    constructor(ordersRepository: Repository<Order>, orderItemsService: OrderItemsService);
    createOrder(user: User, createOrderDto: CreateOrderDto): Promise<CreateApiResponse<Omit<Order, 'user'>>>;
    getAllOrdersOfAUser(user: User): Promise<ApiGetResponse<any>>;
    deleteOrderById(id: string): Promise<ApiDeleteResponse>;
    findOrderById(id: string): Promise<CreateApiResponse<Order>>;
    updateOrderById(id: string, updateOrderDto: Partial<CreateOrderDto>): Promise<CreateApiResponse<Order>>;
    getAllUsersOrders(): Promise<ApiGetResponse<any>>;
}
