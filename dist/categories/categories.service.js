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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Categories_1 = require("../entity/Categories");
const typeorm_2 = require("typeorm");
const constants_1 = require("../utils/constants");
let CategoriesService = exports.CategoriesService = class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async createCategory(createCategoryDto, file) {
        const category = this.categoriesRepository.create({
            ...createCategoryDto,
        });
        if (!file.filename) {
            throw new common_1.BadRequestException('Category image can not be empty');
        }
        category.icon = `${constants_1.uploadFileUrl}/categories/pictures/${file.filename}`;
        try {
            await this.categoriesRepository.save(category);
            return {
                success: true,
                message: 'Category created successfully',
                data: category,
            };
        }
        catch (error) {
            if (error.errno === 1062) {
                throw new common_1.BadRequestException('Category name must be unique');
            }
            console.log(error);
        }
    }
    async getAllCategories() {
        try {
            const categories = await this.categoriesRepository.find({
                relations: ['subCategories'],
            });
            return {
                success: true,
                message: 'Fetched categories successfully',
                data: categories,
                meta: {},
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getCategoryById(id) {
        const category = await this.categoriesRepository.findOne({
            where: { id },
        });
        if (category) {
            return {
                success: true,
                message: 'Fetched category successfully',
                data: category,
            };
        }
        else {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
    }
    async deleteCategoryById(id) {
        const result = await this.categoriesRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Category with ID ${id} is not found`);
        }
        return {
            success: true,
            data: [],
            message: 'Category deleted successfully',
        };
    }
    async updateCategory(id, updateCategoryDto) {
        const { data: category } = await this.getCategoryById(id);
        if (category) {
            try {
                await this.categoriesRepository.update(id, updateCategoryDto);
                return {
                    success: true,
                    message: 'Category updated successfully',
                    data: category,
                };
            }
            catch (error) {
                console.log(error);
            }
        }
    }
};
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Categories_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map