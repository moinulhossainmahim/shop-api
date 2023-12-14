/// <reference types="multer" />
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from 'src/entity/Product';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Categories } from 'src/entity/Categories';
import { SubCategory } from 'src/entity/SubCategory';
import { CreateApiResponse, ApiGetResponse, ApiDeleteResponse } from 'src/common/interfaces';
import { PageOptionsDto } from 'src/common/dtos';
export declare class ProductsService {
    private productsRepository;
    private categoriesRepository;
    private subCategoriesRepository;
    constructor(productsRepository: Repository<Product>, categoriesRepository: Repository<Categories>, subCategoriesRepository: Repository<SubCategory>);
    createProduct(createProductDto: CreateProductDto, images: Array<Express.Multer.File>): Promise<CreateApiResponse<Product>>;
    getAllProducts(pageOptionsDto: PageOptionsDto): Promise<ApiGetResponse<Product>>;
    getProductById(id: string): Promise<CreateApiResponse<Product>>;
    updateProduct(createProductDto: Partial<UpdateProductDto>, id: string, files?: Array<Express.Multer.File>): Promise<CreateApiResponse<Product>>;
    deleteProductById(id: string): Promise<ApiDeleteResponse>;
}
