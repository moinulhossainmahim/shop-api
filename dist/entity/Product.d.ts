import { ProductStatus } from 'src/products/enums/product-status.enum';
import { Wishlist } from './Wishlist';
import { OrderItem } from './OrderItem';
import { Categories } from './Categories';
import { SubCategory } from './SubCategory';
export declare class Product {
    id: string;
    createdAt: Date;
    name: string;
    desc: string;
    status: ProductStatus;
    featuredImg: string;
    galleryImg: string[];
    unit: string;
    price: number;
    salePrice: number;
    quantity: number;
    sku: string;
    slug: string;
    wishlist: Wishlist[];
    orderItems: OrderItem[];
    categories: Categories[];
    subcategories: SubCategory[];
}
