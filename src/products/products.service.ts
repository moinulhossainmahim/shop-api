import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/Product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Categories } from 'src/entity/Categories.entity';
import { SubCategory } from 'src/entity/SubCategory.entity';
import { uploadFileUrl } from 'src/utils/constants';
import {
  CreateApiResponse,
  ApiGetResponse,
  ApiDeleteResponse,
} from 'src/common/interfaces';
import { FilterOptionsDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import { CheckAvailabilityDto } from 'src/orders/dto/check-availability.dto';

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
  ): Promise<CreateApiResponse<Omit<Product, 'categories' | 'subcategories'>>> {
    const category = await this.categoriesRepository.findOne({
      where: { id: createProductDto.categoryId },
    });
    const subCategory = await this.subCategoriesRepository.findOne({
      where: { id: createProductDto.subCategoryId },
    });
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
    product.categories = [category];
    product.subcategories = [subCategory];
    product.featuredImg = `${uploadFileUrl}/products/pictures/${images[0].filename}`;
    product.galleryImg = images
      .slice(1)
      .map((img) => `${uploadFileUrl}/products/pictures/${img.filename}`);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { categories, subcategories, ...savedProduct } =
        await this.productsRepository.save(product);
      return {
        success: true,
        message: 'Product created successfully',
        data: savedProduct,
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

      if (filterOptionsDto.search) {
        queryBuilder = queryBuilder.andWhere(
          '(LOWER(product.name) LIKE LOWER(:search))',
          { search: `%${filterOptionsDto.search}%` },
        );
      }

      const products = await queryBuilder.getMany();
      const itemCount = await this.productsRepository.count();
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
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['categories', 'subCategories'],
    });
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
  ): Promise<CreateApiResponse<any>> {
    const { data: product } = await this.getProductById(id);
    let category;
    let subCategory;
    if (createProductDto.categoryId) {
      category = await this.categoriesRepository.findOne({
        where: { id: createProductDto.categoryId },
      });
    }
    if (createProductDto.subCategoryId) {
      subCategory = await this.subCategoriesRepository.findOne({
        where: { id: createProductDto.subCategoryId },
      });
    }
    if (category) product.categories = [category];
    if (subCategory) product.subcategories = [subCategory];
    if (product) {
      if (files.length) {
        product.featuredImg = `${uploadFileUrl}/products/pictures/${files[0].filename}`;
        product.galleryImg = files
          .slice(1)
          .map((file) => `${uploadFileUrl}/products/pictures/${file.filename}`);
      }
      try {
        const updateProduct = await this.productsRepository.update(
          { id: product.id },
          product,
        );
        if (updateProduct.affected === 1) {
          return {
            message: 'Product updated successfully',
            success: true,
            data: product,
          };
        } else {
          return {
            message: 'something went wrong',
            success: false,
            data: {},
          };
        }
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

  async checkIfProductsExist(checkAvailabilityDto: CheckAvailabilityDto) {
    let isTrue = true;
    try {
      await Promise.all(
        checkAvailabilityDto.items.map(async (item) => {
          const product = await this.productsRepository.findOne({
            where: { id: item.productId },
          });
          if (Number(item.quantity) > Number(product.quantity)) {
            isTrue = false;
          }
        }),
      );
      return isTrue;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}
