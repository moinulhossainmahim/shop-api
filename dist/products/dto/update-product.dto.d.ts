import { ProductStatus } from '../enums/product-status.enum';
export declare class UpdateProductDto {
    name: string;
    desc: string;
    status: ProductStatus;
    unit: string;
    price: string;
    salePrice: string;
    quantity: number;
    sku: string;
    slug: string;
    categories: string[];
    subCategories: string[];
}
