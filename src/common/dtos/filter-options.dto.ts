import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterOptionsDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly category?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly subCategory?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
