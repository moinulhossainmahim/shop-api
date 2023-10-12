import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
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
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserRole } from 'src/decorators/role.decorator';
import { Role } from 'src/users/enums/role.enum';
import { UNSUPPORTED_FILE } from 'src/utils/constants';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';

@UseGuards(JwtAuthGuard, RoleGuard)
@UserRole(Role.Admin)
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
    ResponseInterceptor,
  )
  createCategories(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ): Promise<CreateApiResponse<Categories>> {
    if (req[UNSUPPORTED_FILE]) {
      throw new BadRequestException(
        `Accepted file extensions are: jpg, jpeg, webp, png`,
      );
    } else {
      return this.categoriesService.createCategory(createCategoryDto, file);
    }
  }

  @Get(`pictures/:filename`)
  async getPicture(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }

  @Get()
  @UseInterceptors(ResponseInterceptor)
  async getAllCategories(): Promise<ApiGetResponse<Categories>> {
    return this.categoriesService.getAllCategories();
  }

  @Get('/:id')
  @UseInterceptors(ResponseInterceptor)
  async getCategoryById(
    @Param('id') id: string,
  ): Promise<CreateApiResponse<Categories>> {
    return this.categoriesService.getCategoryById(id);
  }

  @Delete('/:id')
  @UseInterceptors(ResponseInterceptor)
  async deleteCategoryById(
    @Param('id') id: string,
  ): Promise<ApiDeleteResponse> {
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
    ResponseInterceptor,
  )
  updateCategory(
    @Body() updateCategoryDto: Partial<UpdateCategoryDto>,
    @Param('id') id: string,
    @Req() req,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<CreateApiResponse<Categories>> {
    if (req[UNSUPPORTED_FILE]) {
      throw new BadRequestException(
        `Accepted file extensions are: jpg, jpeg, webp, png`,
      );
    } else {
      return this.categoriesService.updateCategory(id, updateCategoryDto, file);
    }
  }
}
