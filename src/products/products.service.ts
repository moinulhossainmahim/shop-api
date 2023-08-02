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

  async createProduct(
    createProductDto: CreateProductDto,
    files: Array<Express.Multer.File>,
  ): Promise<Product> {
    const product = this.productsRepository.create({
      ...createProductDto,
      status: ProductStatus.DRAFT,
    });

    product.featuredImg = `http://localhost:3000/products/pictures/${files[0].filename}`;
    product.galleryImg = files
      .slice(1)
      .map(
        (file) => `http://localhost:3000/products/pictures/${file.filename}`,
      );
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
