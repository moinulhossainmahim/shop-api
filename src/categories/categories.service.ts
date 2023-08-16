import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../entity/Categories';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ): Promise<Categories> {
    const category = this.categoriesRepository.create({
      ...createCategoryDto,
    });

    category.icon = `http://localhost:3000/categories/pictures/${file.filename}`;
    try {
      await this.categoriesRepository.save(category);
      return category;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCategories(): Promise<Categories[]> {
    try {
      const categories = await this.categoriesRepository.find();
      return categories;
    } catch (error) {
      console.log(error);
    }
  }

  async getCategoryById(id: string): Promise<Categories> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });
    if (category) {
      return category;
    } else {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  async deleteCategoryById(id: string): Promise<void> {
    const result = await this.categoriesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} is not find`);
    }
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    file: Express.Multer.File,
  ): Promise<Categories> {
    const category = await this.getCategoryById(id);
    if (category) {
      category.icon = `http://localhost:3000/categories/pictures/${file.filename}`;
      Object.assign(category, updateCategoryDto);
      try {
        await this.categoriesRepository.save(category);
        return category;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
