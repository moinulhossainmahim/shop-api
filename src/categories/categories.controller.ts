import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFilename, imageFileFilter } from 'src/products/file-upload.utils';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from '../entity/Categories';
import { Response } from 'express';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFilename,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  createCategories(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Categories> {
    if (!file) {
      throw new BadRequestException('File is not an image');
    } else {
      return this.categoriesService.createCategory(createCategoryDto, file);
    }
  }

  @Get(`pictures/:filename`)
  async getPicture(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }

  @Get()
  async getAllCategories(): Promise<Categories[]> {
    return this.categoriesService.getAllCategories();
  }

  @Get('/:id')
  async getCategoryById(@Param('id') id: string): Promise<Categories> {
    return this.categoriesService.getCategoryById(id);
  }

  @Delete('/:id')
  async deleteCategoryById(@Param('id') id: string): Promise<void> {
    return this.categoriesService.deleteCategoryById(id);
  }

  @Patch('/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFilename,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<Categories> {
    if (!file) {
      throw new BadRequestException('File is not an image');
    } else {
      return this.categoriesService.updateCategory(id, updateCategoryDto, file);
    }
  }
}
