import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      await this.productsRepository.save(product);
      return product;
    } catch (error) {
      if (error.errno === 1062) {
        throw new BadRequestException(`Product name and sku must be unique`);
      } else {
        console.log(error);
      }
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.productsRepository.find();
      return products;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (product) {
      return product;
    } else {
      throw new NotFoundException(`Product with ID ${id} not found!`);
    }
  }

  async deleteProductById(id: string): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
