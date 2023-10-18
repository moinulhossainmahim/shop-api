import { IsNotEmpty, IsString } from 'class-validator';
import { Categories } from 'src/entity/Categories';

export class SubCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  category: Categories;
}
