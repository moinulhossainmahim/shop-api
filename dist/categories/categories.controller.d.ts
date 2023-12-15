/// <reference types="multer" />
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from '../entity/Categories';
import { Response } from 'express';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateApiResponse, ApiGetResponse, ApiDeleteResponse } from 'src/common/interfaces';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createCategories(createCategoryDto: CreateCategoryDto, file: Express.Multer.File, req: any): Promise<CreateApiResponse<Categories>>;
    getPicture(filename: string, res: Response): Promise<void>;
    getAllCategories(): Promise<ApiGetResponse<Categories>>;
    getCategoryById(id: string): Promise<CreateApiResponse<Categories>>;
    deleteCategoryById(id: string): Promise<ApiDeleteResponse>;
    updateCategory(updateCategoryDto: Partial<UpdateCategoryDto>, id: string, req: any, icon?: Express.Multer.File): Promise<CreateApiResponse<Categories>>;
}
