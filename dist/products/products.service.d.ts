/// <reference types="multer" />
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from 'src/entity/Product';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
import { Categories } from 'src/entity/Categories';
import { SubCategory } from 'src/entity/SubCategory';
export declare class ProductsService {
    private productsRepository;
    private categoriesRepository;
    private subCategoriesRepository;
    constructor(productsRepository: Repository<Product>, categoriesRepository: Repository<Categories>, subCategoriesRepository: Repository<SubCategory>);
    createProduct(createProductDto: CreateProductDto, images: Array<Express.Multer.File>): Promise<CreateApiResponse<Product>>;
    getAllProducts(): Promise<ApiGetResponse<Product>>;
    getProductById(id: string): Promise<CreateApiResponse<Product>>;
    updateProduct(createProductDto: Partial<UpdateProductDto>, id: string, files?: Array<Express.Multer.File>): Promise<CreateApiResponse<Product>>;
    deleteProductById(id: string): Promise<ApiDeleteResponse>;
}
