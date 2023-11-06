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
exports.SubCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const sub_categories_service_1 = require("./sub-categories.service");
const sub_category_dto_1 = require("./dto/sub-category.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../decorators/role.decorator");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const role_guard_1 = require("../guards/role.guard");
const role_enum_1 = require("../users/enums/role.enum");
const response_interceptor_1 = require("../interceptors/response.interceptor");
let SubCategoriesController = exports.SubCategoriesController = class SubCategoriesController {
    constructor(subCategoriesService) {
        this.subCategoriesService = subCategoriesService;
    }
    async createSubCategory(subCategoryDto) {
        return this.subCategoriesService.createSubCategory(subCategoryDto);
    }
    async updateSubCategory(id, subCategoryDto) {
        return this.subCategoriesService.updateSubCategoryById(id, subCategoryDto);
    }
    async deleteSubCategory(id) {
        return this.subCategoriesService.deleteSubCategoryById(id);
    }
    async getAllSubCategories() {
        return this.subCategoriesService.getAllSubCategories();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sub_category_dto_1.SubCategoryDto]),
    __metadata("design:returntype", Promise)
], SubCategoriesController.prototype, "createSubCategory", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubCategoriesController.prototype, "updateSubCategory", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubCategoriesController.prototype, "deleteSubCategory", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubCategoriesController.prototype, "getAllSubCategories", null);
exports.SubCategoriesController = SubCategoriesController = __decorate([
    (0, common_1.Controller)('sub-categories'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Admin]),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiTags)('sub-categories'),
    __metadata("design:paramtypes", [sub_categories_service_1.SubCategoriesService])
], SubCategoriesController);
//# sourceMappingURL=sub-categories.controller.js.map