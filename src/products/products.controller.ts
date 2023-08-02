import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsServie: ProductsService) {}

  @Post()
  createProduct(@Body() createPorductDto: CreateProductDto): Product {
    return this.productsServie.createProduct(createPorductDto);
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsServie.getAllProducts();
  }
}
