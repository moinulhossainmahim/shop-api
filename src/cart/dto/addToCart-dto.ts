import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
