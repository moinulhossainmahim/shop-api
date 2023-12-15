import { OrderItem } from './OrderItem';
import { User } from './User';
import { OrderStatus } from 'src/orders/enums/order-status.enum';
import { PaymentMethod } from 'src/orders/enums/payment-method.enum';
import { Address } from './Address';
import { PaymentStatus } from 'src/orders/enums/payment-status.enum';
export declare class Order {
    id: string;
    tracking_no: string;
    order_date: Date;
    order_status: OrderStatus;
    delivery_fee: number;
    total: number;
    amount: number;
    payment_status: PaymentStatus;
    payment_method: PaymentMethod;
    shippingAddress: Address;
    billingAddress: Address;
    orderItems: OrderItem[];
    user: User;
}
