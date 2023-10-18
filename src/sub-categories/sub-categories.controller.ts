import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategory } from 'src/entity/SubCategory';
import { SubCategoryDto } from './dto/sub-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/decorators/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/users/enums/role.enum';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';

@Controller('sub-categories')
@UseGuards(JwtAuthGuard, RoleGuard)
@UserRole(Role.Admin)
@UseInterceptors(ResponseInterceptor)
@ApiTags('sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  async createSubCategory(
    @Body() subCategoryDto: SubCategoryDto,
  ): Promise<CreateApiResponse<SubCategory[]>> {
    return this.subCategoriesService.createSubCategory(subCategoryDto);
  }

  @Patch('/:id')
  async updateSubCategory(
    @Param('id') id: string,
    @Body() subCategoryDto: Partial<SubCategoryDto>,
  ): Promise<CreateApiResponse<SubCategory>> {
    return this.subCategoriesService.updateSubCategoryById(id, subCategoryDto);
  }

  @Delete('/:id')
  async deleteSubCategory(@Param('id') id: string): Promise<ApiDeleteResponse> {
    return this.subCategoriesService.deleteSubCategoryById(id);
  }

  @Get()
  async getAllSubCategories(): Promise<ApiGetResponse<SubCategory>> {
    return this.subCategoriesService.getAllSubCategories();
  }
}
