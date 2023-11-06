import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
import { Address } from 'src/entity/Address';
import { CreateOrderItemDto } from 'src/order-items/dto/create-order-item.dto';
export declare class CreateOrderDto {
    order_status: OrderStatus;
    delivery_fee: number;
    amount: number;
    total: number;
    payment_status: PaymentStatus;
    payment_method: PaymentMethod;
    billingAddress: Address;
    shippingAddress: Address;
    orderItems: CreateOrderItemDto[];
}
