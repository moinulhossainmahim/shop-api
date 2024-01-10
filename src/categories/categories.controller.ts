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
import { Categories } from '../entity/Categories.entity';
import { Response } from 'express';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserRole } from 'src/decorators/role.decorator';
import { Role } from 'src/users/enums/role.enum';
import { UNSUPPORTED_FILE, uploadFileUrl } from 'src/utils/constants';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import {
  CreateApiResponse,
  ApiGetResponse,
  ApiDeleteResponse,
} from 'src/common/interfaces';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin])
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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ResponseInterceptor)
  async getCategoryById(
    @Param('id') id: string,
  ): Promise<CreateApiResponse<Categories>> {
    return this.categoriesService.getCategoryById(id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin])
  @UseInterceptors(ResponseInterceptor)
  async deleteCategoryById(
    @Param('id') id: string,
  ): Promise<ApiDeleteResponse> {
    return this.categoriesService.deleteCategoryById(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin])
  @UseInterceptors(
    FileInterceptor('icon', {
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
    @UploadedFile() icon?: Express.Multer.File,
  ): Promise<CreateApiResponse<Categories>> {
    if (req[UNSUPPORTED_FILE]) {
      throw new BadRequestException(
        `Accepted file extensions are: jpg, jpeg, webp, png`,
      );
    } else {
      if (icon) {
        updateCategoryDto.icon = `${uploadFileUrl}/categories/pictures/${icon.filename}`;
      }
      return this.categoriesService.updateCategory(id, updateCategoryDto);
    }
  }
}
