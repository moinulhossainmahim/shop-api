import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
import { Address } from 'src/entity/Address';
import { CreateOrderItemDto } from 'src/order-items/dto/create-order-item.dto';

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  order_status: OrderStatus;

  @IsNotEmpty()
  delivery_fee: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  payment_status: PaymentStatus;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsNotEmpty()
  billingAddress: Address;

  @IsNotEmpty()
  shippingAddress: Address;

  @IsNotEmpty()
  @IsArray()
  orderItems: CreateOrderItemDto[];
}
