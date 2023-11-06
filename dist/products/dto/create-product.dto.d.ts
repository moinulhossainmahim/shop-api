import { ProductStatus } from '../enums/product-status.enum';
export declare class CreateProductDto {
    name: string;
    desc: string;
    status: ProductStatus;
    unit: string;
    price: number;
    salePrice: number;
    quantity: number;
    sku: string;
    slug: string;
    categories: string[];
    subCategories: string[];
}
