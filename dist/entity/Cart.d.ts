import { Product } from './Product';
import { User } from './User';
export declare class Cart {
    id: string;
    total: number;
    quantity: number;
    productId: string;
    product: Product;
    user: User;
}
