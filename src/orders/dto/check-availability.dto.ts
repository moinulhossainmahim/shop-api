import { IsNotEmpty } from 'class-validator';

export type ProductIdWithQuantity = {
  productId: string;
  quantity: number;
};

export class CheckAvailabilityDto {
  @IsNotEmpty()
  items: ProductIdWithQuantity[];
}
