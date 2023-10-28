"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const SubCategory_1 = require("../entity/SubCategory");
const typeorm_2 = require("typeorm");
let SubCategoriesService = exports.SubCategoriesService = class SubCategoriesService {
    constructor(subCategoriesRepository) {
        this.subCategoriesRepository = subCategoriesRepository;
    }
    async createSubCategory(subCategoryDto) {
        const subCategory = this.subCategoriesRepository.create(subCategoryDto);
        try {
            await this.subCategoriesRepository.save(subCategory);
            return {
                message: 'Sub category created successfully',
                success: true,
                data: [subCategory],
            };
        }
        catch (error) {
            if (error.errno === 1062) {
                throw new common_1.BadRequestException('Sub category name must be unique');
            }
            console.log(error);
        }
    }
    async updateSubCategoryById(id, subCategoryDto) {
        const subCategory = await this.subCategoriesRepository.findOne({
            where: { id },
        });
        if (!subCategory) {
            throw new common_1.BadRequestException(`SubCategory with ID ${id} not found!`);
        }
        try {
            await this.subCategoriesRepository.update(id, subCategoryDto);
            const subCategories = await this.subCategoriesRepository.findOne({
                where: { id },
            });
            return {
                message: 'SubCategory updated successfully',
                data: subCategories,
                success: true,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAllSubCategories() {
        try {
            const subCategories = await this.subCategoriesRepository.find({
                relations: ['category'],
            });
            return {
                message: 'Fetched categories successfully',
                data: subCategories,
                success: true,
                meta: {},
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteSubCategoryById(id) {
        const result = await this.subCategoriesRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Sub Category with ID ${id} not found!`);
        }
        return {
            message: 'Sub category deleted successfully',
            data: [],
            success: true,
        };
    }
};
exports.SubCategoriesService = SubCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(SubCategory_1.SubCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubCategoriesService);
//# sourceMappingURL=sub-categories.service.js.map