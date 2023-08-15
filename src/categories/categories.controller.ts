import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
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

@Controller('categories')
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
  createProduct(
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
}
