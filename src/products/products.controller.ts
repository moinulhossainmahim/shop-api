import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsServie: ProductsService) {}

  @Post()
  createProduct(@Body() createPorductDto: CreateProductDto): Promise<Product> {
    return this.productsServie.createProduct(createPorductDto);
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productsServie.getAllProducts();
  }
}
