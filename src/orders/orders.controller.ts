import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { RoleGuard } from 'src/guards/role.guard';
import { UserRole } from 'src/decorators/role.decorator';
import { Role } from 'src/users/enums/role.enum';
import {
  CreateApiResponse,
  ApiGetResponse,
  ApiDeleteResponse,
} from 'src/common/interfaces';
import { PageOptionsDto } from 'src/common/dtos';
import Stripe from 'stripe';
import { StripeSignatureGuard } from 'src/guards/stripe-signature.guard';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Customer, Role.Admin])
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<CreateApiResponse<Omit<Order, 'user'>>> {
    return this.ordersService.createOrder(user, createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Customer, Role.Admin])
  async getAllOrders(
    @GetUser() user: User,
    @Query() pageOptionsDto?: PageOptionsDto,
  ): Promise<ApiGetResponse<Order>> {
    return this.ordersService.getAllOrdersOfAUser(user, pageOptionsDto);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin])
  async getAllUserOrders(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<ApiGetResponse<Order>> {
    return this.ordersService.getAllUsersOrders(pageOptionsDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin])
  async deleteOrderById(@Param('id') id: string): Promise<ApiDeleteResponse> {
    return this.ordersService.deleteOrderById(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin])
  async updateOrderById(
    @Param('id') id: string,
    @Body() updateOrderDto: Partial<CreateOrderDto>,
  ): Promise<CreateApiResponse<Order>> {
    return this.ordersService.updateOrderById(id, updateOrderDto);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin, Role.Customer])
  async getOrderById(
    @Param('id') id: string,
  ): Promise<CreateApiResponse<Order>> {
    return this.ordersService.findOrderById(id);
  }

  @Post('stripe_webhook')
  @UseGuards(StripeSignatureGuard)
  async webhook(@Body() event: Stripe.Event): Promise<object> {
    await this.ordersService.updatePaymentStatus(event);
    return { message: 'success' };
  }
}
