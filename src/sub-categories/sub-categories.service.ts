import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from 'src/entity/SubCategory.entity';
import { Repository } from 'typeorm';
import { SubCategoryDto } from './dto/sub-category.dto';
import {
  CreateApiResponse,
  ApiGetResponse,
  ApiDeleteResponse,
} from 'src/common/interfaces';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoriesRepository: Repository<SubCategory>,
    private readonly categoryService: CategoriesService,
  ) {}

  public async createSubCategory(
    subCategoryDto: SubCategoryDto,
  ): Promise<CreateApiResponse<Omit<SubCategory, 'category'>[]>> {
    const category = await this.categoryService.getCategoryById(
      subCategoryDto.categoryId,
    );
    const subCategory = this.subCategoriesRepository.create(subCategoryDto);
    subCategory.category = category.data;
    try {
      const { category: cat, ...subCat } =
        await this.subCategoriesRepository.save(subCategory);
      return {
        message: 'Sub category created successfully',
        success: true,
        data: [subCat],
      };
    } catch (error) {
      if (error.errno === 1062) {
        throw new BadRequestException('Sub category name must be unique');
      }
      console.log(error);
    }
  }

  public async updateSubCategoryById(
    id: string,
    subCategoryDto: Partial<SubCategoryDto>,
  ): Promise<CreateApiResponse<SubCategory>> {
    const subCategory = await this.subCategoriesRepository.findOne({
      where: { id },
    });
    if (!subCategory) {
      throw new BadRequestException(`SubCategory with ID ${id} not found!`);
    }
    try {
      await this.subCategoriesRepository.update(id, subCategoryDto);
      const subCategories = await this.subCategoriesRepository.findOne({
        where: { id },
      });
      return {
        message: 'SubCategory updated successfully',
        data: subCategories,
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSubCategories(): Promise<ApiGetResponse<SubCategory>> {
    try {
      const subCategories = await this.subCategoriesRepository.find({
        relations: ['category'],
      });
      return {
        message: 'Fetched categories successfully',
        data: subCategories,
        success: true,
        meta: {},
      };
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteSubCategoryById(id: string): Promise<ApiDeleteResponse> {
    const result = await this.subCategoriesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sub Category with ID ${id} not found!`);
    }
    return {
      message: 'Sub category deleted successfully',
      data: [],
      success: true,
    };
  }
}
