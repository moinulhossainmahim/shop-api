import { SubCategoriesService } from './sub-categories.service';
import { SubCategory } from 'src/entity/SubCategory';
import { SubCategoryDto } from './dto/sub-category.dto';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
export declare class SubCategoriesController {
    private readonly subCategoriesService;
    constructor(subCategoriesService: SubCategoriesService);
    createSubCategory(subCategoryDto: SubCategoryDto): Promise<CreateApiResponse<SubCategory[]>>;
    updateSubCategory(id: string, subCategoryDto: Partial<SubCategoryDto>): Promise<CreateApiResponse<SubCategory>>;
    deleteSubCategory(id: string): Promise<ApiDeleteResponse>;
    getAllSubCategories(): Promise<ApiGetResponse<SubCategory>>;
}
