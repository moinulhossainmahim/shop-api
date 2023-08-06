import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ): Promise<Category> {
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
}
