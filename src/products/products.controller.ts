import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/entity/Product.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { editFilename, imageFileFilter } from './file-upload.utils';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserRole } from 'src/decorators/role.decorator';
import { Role } from 'src/users/enums/role.enum';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { UNSUPPORTED_FILE } from 'src/utils/constants';
import {
  CreateApiResponse,
  ApiGetResponse,
  ApiDeleteResponse,
} from 'src/common/interfaces';
import { FilterOptionsDto, PageOptionsDto } from 'src/common/dtos';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin])
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFilename,
      }),
      fileFilter: imageFileFilter,
    }),
    ResponseInterceptor,
  )
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Req() req,
  ): Promise<CreateApiResponse<Omit<Product, 'categories' | 'subcategories'>>> {
    if (req[UNSUPPORTED_FILE]) {
      throw new BadRequestException(
        `Accepted file extensions are: jpg, jpeg, webp, png`,
      );
    } else {
      return this.productsService.createProduct(createProductDto, images);
    }
  }

  @Get(`pictures/:filename`)
  async getPicture(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }

  @Get()
  @UseInterceptors(ResponseInterceptor)
  getAllProducts(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() filterOptionsDto: FilterOptionsDto,
  ): Promise<ApiGetResponse<Product>> {
    return this.productsService.getAllProducts(
      pageOptionsDto,
      filterOptionsDto,
    );
  }

  @Get('/:id')
  @UseInterceptors(ResponseInterceptor)
  getProductById(@Param('id') id: string): Promise<CreateApiResponse<Product>> {
    return this.productsService.getProductById(id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin])
  @UseInterceptors(ResponseInterceptor)
  deleteProductById(@Param('id') id: string): Promise<ApiDeleteResponse> {
    console.log(id);
    return this.productsService.deleteProductById(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin])
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFilename,
      }),
      fileFilter: imageFileFilter,
    }),
    ResponseInterceptor,
  )
  updateProduct(
    @Body() updateProductDto: Partial<UpdateProductDto>,
    @Param('id') id: string,
    @Req() req,
    @UploadedFiles() images?: Array<Express.Multer.File>,
  ): Promise<CreateApiResponse<Product>> {
    if (req[UNSUPPORTED_FILE]) {
      throw new BadRequestException(
        `Accepted file extensions are: jpg, jpeg, webp, png`,
      );
    } else {
      return this.productsService.updateProduct(updateProductDto, id, images);
    }
  }
}
