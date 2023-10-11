import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/Product';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    files: Array<Express.Multer.File>,
  ): Promise<CreateApiResponse<Product>> {
    const product = this.productsRepository.create({
      ...createProductDto,
    });

    product.featuredImg = `http://localhost:3000/products/pictures/${files[0].filename}`;
    product.galleryImg = files
      .slice(1)
      .map(
        (file) => `http://localhost:3000/products/pictures/${file.filename}`,
      );
    try {
      await this.productsRepository.save(product);
      return {
        success: true,
        message: 'Product created successfully',
        data: product,
      };
    } catch (error) {
      if (error.errno === 1062) {
        return {
          error: true,
          success: false,
          message: 'product name and sku must be unique',
          data: product,
        };
      } else {
        console.log(error);
      }
    }
  }

  async getAllProducts(): Promise<ApiGetResponse<Product>> {
    try {
      const products = await this.productsRepository.find();
      return {
        success: true,
        message: 'Fetch products successfully',
        data: products,
        meta: {},
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  async getProductById(id: string): Promise<CreateApiResponse<Product>> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (product) {
      return {
        success: true,
        message: 'Get product successfully',
        data: product,
      };
    } else {
      throw new NotFoundException(`Product with ID ${id} not found!`);
    }
  }

  async updateProduct(
    createProductDto: Partial<UpdateProductDto>,
    id: string,
    files?: Array<Express.Multer.File>,
  ): Promise<CreateApiResponse<Product>> {
    const { data: product } = await this.getProductById(id);
    if (product) {
      if (files.length) {
        product.featuredImg = `http://localhost:3000/products/pictures/${files[0].filename}`;
        product.galleryImg = files
          .slice(1)
          .map(
            (file) =>
              `http://localhost:3000/products/pictures/${file.filename}`,
          );
      }
      Object.assign(product, createProductDto);
      try {
        await this.productsRepository.save(product);
        return {
          message: 'Product updated successfully',
          success: true,
          data: product,
        };
      } catch (error) {
        console.log(error);
      }
    }
  }

  async deleteProductById(id: string): Promise<ApiDeleteResponse> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      data: [],
      success: true,
      message: 'Successfully deleted the product',
    };
  }
}
