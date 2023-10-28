/// <reference types="multer" />
import { ProductsService } from './products.service';
import { Product } from 'src/entity/Product';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(createProductDto: CreateProductDto, images: Array<Express.Multer.File>, req: any): Promise<CreateApiResponse<Product>>;
    getPicture(filename: string, res: Response): Promise<void>;
    getAllProducts(): Promise<ApiGetResponse<Product>>;
    getProductById(id: string): Promise<CreateApiResponse<Product>>;
    deleteProductById(id: string): Promise<ApiDeleteResponse>;
    updateProduct(updateProductDto: Partial<UpdateProductDto>, id: string, req: any, images?: Array<Express.Multer.File>): Promise<CreateApiResponse<Product>>;
}
