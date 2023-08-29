import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { Product } from 'src/entity/Product';

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  order_status: OrderStatus;

  @IsNotEmpty()
  delivery_fee: number;

  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  tax: number;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  payment_status: PaymentStatus;

  @IsNotEmpty()
  @IsString()
  shipping_address: string;

  @IsNotEmpty()
  @IsString()
  billing_address: string;

  @IsNotEmpty()
  @IsArray()
  orderItems: Pick<Product, 'quantity' | 'salePrice' | 'id'>[];
}
