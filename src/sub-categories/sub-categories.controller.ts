import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategory } from 'src/entity/SubCategory';
import { SubCategoryDto } from './dto/sub-category.dto';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  async createSubCategory(
    @Body() subCategoryDto: SubCategoryDto,
  ): Promise<SubCategory> {
    return this.subCategoriesService.createSubCategory(subCategoryDto);
  }

  @Patch('/:id')
  async updateSubCategory(
    @Param('id') id: string,
    @Body() subCategoryDto: SubCategoryDto,
  ): Promise<SubCategory> {
    return this.subCategoriesService.updateSubCategoryById(id, subCategoryDto);
  }

  @Delete('/:id')
  async deleteSubCategory(@Param('id') id: string): Promise<void> {
    return this.subCategoriesService.deleteSubCategoryById(id);
  }

  @Get()
  async getAllSubCategories(): Promise<SubCategory[]> {
    return this.subCategoriesService.getAllSubCategories();
  }
}
