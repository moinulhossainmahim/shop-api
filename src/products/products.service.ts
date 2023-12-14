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
import { Categories } from 'src/entity/Categories';
import { SubCategory } from 'src/entity/SubCategory';
import { uploadFileUrl } from 'src/utils/constants';
import {
  CreateApiResponse,
  ApiGetResponse,
  ApiDeleteResponse,
} from 'src/common/interfaces';
import { FilterOptionsDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos';

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
    product.featuredImg = `${uploadFileUrl}/products/pictures/${images[0].filename}`;
    product.galleryImg = images
      .slice(1)
      .map((img) => `${uploadFileUrl}/products/pictures/${img.filename}`);
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

  async getAllProducts(
    pageOptionsDto: PageOptionsDto,
    filterOptionsDto: FilterOptionsDto,
  ): Promise<ApiGetResponse<Product>> {
    try {
      let queryBuilder = this.productsRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.categories', 'categories')
        .leftJoinAndSelect('product.subcategories', 'subcategories')
        .orderBy('product.createdAt', pageOptionsDto.order)
        .take(pageOptionsDto.take)
        .skip(pageOptionsDto.skip);

      if (filterOptionsDto.category) {
        queryBuilder = queryBuilder.andWhere(
          'categories.slug = :categorySlug',
          { categorySlug: filterOptionsDto.category },
        );
      }

      if (filterOptionsDto.subCategory) {
        queryBuilder = queryBuilder.andWhere(
          'subcategories.slug = :subcategorySlug',
          { subcategorySlug: filterOptionsDto.subCategory },
        );
      }

      const products = await queryBuilder.getMany();
      const itemCount = products.length;
      const meta = new PageMetaDto({ itemCount, pageOptionsDto });

      return {
        success: true,
        message: 'Fetch products successfully',
        data: products,
        meta: meta,
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
        product.featuredImg = `${uploadFileUrl}/products/pictures/${files[0].filename}`;
        product.galleryImg = files
          .slice(1)
          .map((file) => `${uploadFileUrl}/products/pictures/${file.filename}`);
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
