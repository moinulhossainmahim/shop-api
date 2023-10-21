import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/Product';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
import { Categories } from 'src/entity/Categories';
import { SubCategory } from 'src/entity/SubCategory';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @InjectRepository(SubCategory)
    private subCategoriesRepository: Repository<SubCategory>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    images: Array<Express.Multer.File>,
  ): Promise<CreateApiResponse<Product>> {
    const Promisecategories = createProductDto.categories.map(async (cat) => {
      return await this.categoriesRepository.findOne({ where: { id: cat } });
    });
    const PromisesubCategories = createProductDto.subCategories.map(
      async (subCat) => {
        return await this.subCategoriesRepository.findOne({
          where: { id: subCat },
        });
      },
    );
    const product = this.productsRepository.create({
      salePrice: Number(createProductDto.salePrice),
      quantity: Number(createProductDto.quantity),
      price: Number(createProductDto.price),
      slug: createProductDto.slug,
      name: createProductDto.name,
      desc: createProductDto.desc,
      sku: createProductDto.sku,
      status: createProductDto.status,
      unit: createProductDto.unit,
    });
    product.categories = await Promise.all(Promisecategories);
    product.subcategories = await Promise.all(PromisesubCategories);
    console.log(product.categories);
    product.featuredImg = `http://localhost:3000/products/pictures/${images[0].filename}`;
    product.galleryImg = images
      .slice(1)
      .map((img) => `http://localhost:3000/products/pictures/${img.filename}`);
    try {
      await this.productsRepository.save(product);
      return {
        success: true,
        message: 'Product created successfully',
        data: product,
      };
    } catch (error) {
      if (error.errno === 1062) {
        throw new BadRequestException('Prodcut name and sku must be unique');
      } else {
        console.log(error);
      }
    }
  }

  async getAllProducts(): Promise<ApiGetResponse<Product>> {
    try {
      const products = await this.productsRepository.find({
        relations: ['categories', 'subcategories'],
      });
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
    const Promisecategories = createProductDto.categories.map(async (cat) => {
      return await this.categoriesRepository.findOne({ where: { id: cat } });
    });
    const PromisesubCategories = createProductDto.subCategories.map(
      async (subCat) => {
        return await this.subCategoriesRepository.findOne({
          where: { id: subCat },
        });
      },
    );
    product.categories = await Promise.all(Promisecategories);
    product.subcategories = await Promise.all(PromisesubCategories);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { categories, subCategories, ...newCreateProductDto } =
        createProductDto;
      Object.assign(product, newCreateProductDto);
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
