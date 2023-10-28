import { SubCategory } from './SubCategory';
import { Product } from './Product';
export declare class Categories {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    subCategories: SubCategory[];
    products: Product[];
}
