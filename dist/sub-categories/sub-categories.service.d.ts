import { SubCategory } from 'src/entity/SubCategory';
import { Repository } from 'typeorm';
import { SubCategoryDto } from './dto/sub-category.dto';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
export declare class SubCategoriesService {
    private subCategoriesRepository;
    constructor(subCategoriesRepository: Repository<SubCategory>);
    createSubCategory(subCategoryDto: SubCategoryDto): Promise<CreateApiResponse<SubCategory[]>>;
    updateSubCategoryById(id: string, subCategoryDto: Partial<SubCategoryDto>): Promise<CreateApiResponse<SubCategory>>;
    getAllSubCategories(): Promise<ApiGetResponse<SubCategory>>;
    deleteSubCategoryById(id: string): Promise<ApiDeleteResponse>;
}