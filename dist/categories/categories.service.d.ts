/// <reference types="multer" />
import { Categories } from '../entity/Categories';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateApiResponse, ApiGetResponse, ApiDeleteResponse } from 'src/common/interfaces';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    createCategory(createCategoryDto: CreateCategoryDto, file: Express.Multer.File): Promise<CreateApiResponse<Categories>>;
    getAllCategories(): Promise<ApiGetResponse<Categories>>;
    getCategoryById(id: string): Promise<CreateApiResponse<Categories>>;
    deleteCategoryById(id: string): Promise<ApiDeleteResponse>;
    updateCategory(id: string, updateCategoryDto: Partial<UpdateCategoryDto>): Promise<CreateApiResponse<Categories>>;
}
