import { IsArray, IsEnum, IsNumberString, IsString } from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsString()
  desc: string;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsString()
  unit: string;

  @IsNumberString()
  price: string;

  @IsNumberString()
  salePrice: string;

  @IsNumberString()
  quantity: number;

  @IsString()
  sku: string;

  @IsString()
  slug: string;

  @IsArray()
  categories: string[];

  @IsArray()
  subCategories: string[];
}
