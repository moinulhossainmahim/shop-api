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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_upload_utils_1 = require("../products/file-upload.utils");
const create_category_dto_1 = require("./dto/create-category.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const role_guard_1 = require("../guards/role.guard");
const role_decorator_1 = require("../decorators/role.decorator");
const role_enum_1 = require("../users/enums/role.enum");
const constants_1 = require("../utils/constants");
const response_interceptor_1 = require("../interceptors/response.interceptor");
let CategoriesController = exports.CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    createCategories(createCategoryDto, file, req) {
        if (req[constants_1.UNSUPPORTED_FILE]) {
            throw new common_1.BadRequestException(`Accepted file extensions are: jpg, jpeg, webp, png`);
        }
        else {
            return this.categoriesService.createCategory(createCategoryDto, file);
        }
    }
    async getPicture(filename, res) {
        res.sendFile(filename, { root: './uploads' });
    }
    async getAllCategories() {
        return this.categoriesService.getAllCategories();
    }
    async getCategoryById(id) {
        return this.categoriesService.getCategoryById(id);
    }
    async deleteCategoryById(id) {
        return this.categoriesService.deleteCategoryById(id);
    }
    updateCategory(updateCategoryDto, id, req, icon) {
        if (req[constants_1.UNSUPPORTED_FILE]) {
            throw new common_1.BadRequestException(`Accepted file extensions are: jpg, jpeg, webp, png`);
        }
        else {
            if (icon) {
                updateCategoryDto.icon = `${constants_1.uploadFileUrl}/categories/pictures/${icon.filename}`;
            }
            return this.categoriesService.updateCategory(id, updateCategoryDto);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Admin]),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: file_upload_utils_1.editFilename,
        }),
        fileFilter: file_upload_utils_1.imageFileFilter,
    }), response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategories", null);
__decorate([
    (0, common_1.Get)(`pictures/:filename`),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getPicture", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Admin]),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Admin]),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteCategoryById", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Admin]),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('icon', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: file_upload_utils_1.editFilename,
        }),
        fileFilter: file_upload_utils_1.imageFileFilter,
    }), response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateCategory", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    (0, swagger_1.ApiTags)('Categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map