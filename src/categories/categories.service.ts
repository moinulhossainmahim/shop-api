import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../entity/Categories';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

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
}
