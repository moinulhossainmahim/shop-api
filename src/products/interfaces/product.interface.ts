import { ProductStatus } from '../enums/product-status.enum';

export interface Product {
  name: string;
  desc: string;
  status: ProductStatus;
}
