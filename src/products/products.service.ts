import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductStatus } from './enums/product-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create({
      ...createProductDto,
      status: ProductStatus.DRAFT,
    });
    await this.productsRepository.save(product);
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.productsRepository.find();
      return products;
    } catch (error) {
      console.log(error.message);
    }
  }
}
