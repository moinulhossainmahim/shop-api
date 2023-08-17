import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from 'src/entity/SubCategory';
import { Repository } from 'typeorm';
import { SubCategoryDto } from './dto/sub-category.dto';
import { Categories } from 'src/entity/Categories';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoriesRepository: Repository<SubCategory>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  public async createSubCategory(
    subCategoryDto: SubCategoryDto,
  ): Promise<SubCategory> {
    const category = await this.categoriesRepository.findOne({
      where: { id: subCategoryDto.categoryID },
    });
    const subCategory = this.subCategoriesRepository.create({
      ...subCategoryDto,
      category,
    });
    try {
      await this.subCategoriesRepository.save(subCategory);
      return subCategory;
    } catch (error) {
      console.log(error);
    }
  }

  public async updateSubCategoryById(
    id: string,
    subCategoryDto: SubCategoryDto,
  ): Promise<SubCategory> {
    const subCategory = await this.subCategoriesRepository.findOne({
      where: { id },
    });
    if (!subCategory) {
      throw new BadRequestException(`SubCategory with ID ${id} not found!`);
    }
    Object.assign(subCategory, subCategoryDto);
    return subCategory;
  }

  async getAllSubCategories(): Promise<SubCategory[]> {
    try {
      const subCategories = await this.subCategoriesRepository.find();
      return subCategories;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteSubCategoryById(id: string): Promise<void> {
    const result = await this.subCategoriesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sub Category with ID ${id} not found!`);
    }
  }
}
