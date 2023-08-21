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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/entity/Product';
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

@UseGuards(JwtAuthGuard, RoleGuard)
@UserRole(Role.Admin)
@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFilename,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Product> {
    if (!files) {
      throw new BadRequestException('File is not an image');
    } else {
      return this.productsService.createProduct(createProductDto, files);
    }
  }

  @Get(`pictures/:filename`)
  async getPicture(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Delete('/:id')
  deleteProductById(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProductById(id);
  }

  @Patch('/:id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFilename,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateProduct(
    @Body() updateProductDto: Partial<UpdateProductDto>,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
  ): Promise<Product> {
    if (!files) {
      throw new BadRequestException('File is not an image');
    } else {
      return this.productsService.updateProduct(updateProductDto, files, id);
    }
  }
}
