import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  slug: string;
}
