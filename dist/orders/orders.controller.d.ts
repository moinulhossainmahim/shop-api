import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/entity/User';
import { Order } from 'src/entity/Order';
import { CreateApiResponse, ApiGetResponse, ApiDeleteResponse } from 'src/common/interfaces';
import { PageOptionsDto } from 'src/common/dtos';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(createOrderDto: CreateOrderDto, user: User): Promise<CreateApiResponse<Omit<Order, 'user'>>>;
    getAllOrders(user: User, pageOptionsDto?: PageOptionsDto): Promise<ApiGetResponse<Order>>;
    getAllUserOrders(pageOptionsDto: PageOptionsDto): Promise<ApiGetResponse<Order>>;
    deleteOrderById(id: string): Promise<ApiDeleteResponse>;
    updateOrderById(id: string, updateOrderDto: Partial<CreateOrderDto>): Promise<CreateApiResponse<Order>>;
    getOrderById(id: string): Promise<CreateApiResponse<Order>>;
}
