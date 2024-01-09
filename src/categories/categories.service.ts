import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../entity/Categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { uploadFileUrl } from 'src/utils/constants';
import {
  CreateApiResponse,
  ApiGetResponse,
  ApiDeleteResponse,
} from 'src/common/interfaces';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ): Promise<CreateApiResponse<Categories>> {
    const category = this.categoriesRepository.create({
      ...createCategoryDto,
    });
    if (!file.filename) {
      throw new BadRequestException('Category image can not be empty');
    }
    category.icon = `${uploadFileUrl}/categories/pictures/${file.filename}`;
    console.log(uploadFileUrl);
    try {
      await this.categoriesRepository.save(category);
      return {
        success: true,
        message: 'Category created successfully',
        data: category,
      };
    } catch (error) {
      if (error.errno === 1062) {
        throw new BadRequestException('Category name must be unique');
      }
      console.log(error);
    }
  }

  async getAllCategories(): Promise<ApiGetResponse<Categories>> {
    try {
      const categories = await this.categoriesRepository.find({
        relations: ['subCategories'],
      });
      return {
        success: true,
        message: 'Fetched categories successfully',
        data: categories,
        meta: {},
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getCategoryById(id: string): Promise<CreateApiResponse<Categories>> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });
    if (category) {
      return {
        success: true,
        message: 'Fetched category successfully',
        data: category,
      };
    } else {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  async deleteCategoryById(id: string): Promise<ApiDeleteResponse> {
    const result = await this.categoriesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} is not found`);
    }
    return {
      success: true,
      data: [],
      message: 'Category deleted successfully',
    };
  }

  async updateCategory(
    id: string,
    updateCategoryDto: Partial<UpdateCategoryDto>,
  ): Promise<CreateApiResponse<Categories>> {
    const { data: category } = await this.getCategoryById(id);
    if (category) {
      try {
        await this.categoriesRepository.update(id, updateCategoryDto);
        return {
          success: true,
          message: 'Category updated successfully',
          data: category,
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
}
