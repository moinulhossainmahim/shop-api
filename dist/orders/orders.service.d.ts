import { Order } from 'src/entity/Order';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/entity/User';
import { OrderItemsService } from 'src/order-items/order-items.service';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
import { CreateApiResponse } from 'src/common/create-response.interface';
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
