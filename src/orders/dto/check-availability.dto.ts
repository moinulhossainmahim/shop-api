import { IsArray, IsNotEmpty } from 'class-validator';

export type ProductIdWithQuantity = {
  productId: string;
  quantity: number;
};

export class CheckAvailabilityDto {
  @IsNotEmpty()
  @IsArray()
  items: ProductIdWithQuantity[];
}
