import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entity/User';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Order } from 'src/entity/Order';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ) {
    return this.ordersService.createOrder(user, createOrderDto);
  }

  @Get()
  async getAllOrders(@GetUser() user: User): Promise<Order[]> {
    return this.ordersService.getAllOrdersOfAUser(user);
  }

  @Delete('/:id')
  async deleteOrderById(@Param('id') id: string) {
    return this.ordersService.deleteOrderById(id);
  }
}
