import { Categories } from './Categories';
import { Product } from './Product';
export declare class SubCategory {
    id: string;
    name: string;
    description: string;
    slug: string;
    category: Categories;
    products: Product[];
}
