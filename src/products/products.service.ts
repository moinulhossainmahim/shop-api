import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductStatus } from './enums/product-status.enum';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];

  createProduct(createProductDto: CreateProductDto) {
    const product: Product = {
      ...createProductDto,
      status: ProductStatus.DRAFT,
    };
    this.products.push(product);
    return product;
  }

  getAllProducts(): Product[] {
    return this.products;
  }
}
