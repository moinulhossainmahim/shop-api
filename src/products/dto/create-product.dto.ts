import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  salePrice: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsString()
  slug: string;
}
