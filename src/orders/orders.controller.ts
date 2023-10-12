import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entity/User';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Order } from 'src/entity/Order';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
import { CreateApiResponse } from 'src/common/create-response.interface';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<CreateApiResponse<Order>> {
    return this.ordersService.createOrder(user, createOrderDto);
  }

  @Get()
  async getAllOrders(@GetUser() user: User): Promise<ApiGetResponse<Order>> {
    return this.ordersService.getAllOrdersOfAUser(user);
  }

  @Delete('/:id')
  async deleteOrderById(@Param('id') id: string): Promise<ApiDeleteResponse> {
    return this.ordersService.deleteOrderById(id);
  }
}
