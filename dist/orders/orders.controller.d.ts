import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/entity/User';
import { Order } from 'src/entity/Order';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
import { CreateApiResponse } from 'src/common/create-response.interface';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(createOrderDto: CreateOrderDto, user: User): Promise<CreateApiResponse<Omit<Order, 'user'>>>;
    getAllOrders(user: User): Promise<ApiGetResponse<Order>>;
    getAllUserOrders(): Promise<ApiGetResponse<Order>>;
    deleteOrderById(id: string): Promise<ApiDeleteResponse>;
    updateOrderById(id: string, updateOrderDto: Partial<CreateOrderDto>): Promise<CreateApiResponse<Order>>;
    getOrderById(id: string): Promise<CreateApiResponse<Order>>;
}
