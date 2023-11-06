import { Product } from './Product';
import { Order } from './Order';
export declare class OrderItem {
    id: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    product: Product;
    order: Order;
}
