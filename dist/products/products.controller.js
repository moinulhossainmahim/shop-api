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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const create_product_dto_1 = require("./dto/create-product.dto");
const file_upload_utils_1 = require("./file-upload.utils");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const role_guard_1 = require("../guards/role.guard");
const role_decorator_1 = require("../decorators/role.decorator");
const role_enum_1 = require("../users/enums/role.enum");
const response_interceptor_1 = require("../interceptors/response.interceptor");
const constants_1 = require("../utils/constants");
const dtos_1 = require("../common/dtos");
let ProductsController = exports.ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    createProduct(createProductDto, images, req) {
        if (req[constants_1.UNSUPPORTED_FILE]) {
            throw new common_1.BadRequestException(`Accepted file extensions are: jpg, jpeg, webp, png`);
        }
        else {
            return this.productsService.createProduct(createProductDto, images);
        }
    }
    async getPicture(filename, res) {
        res.sendFile(filename, { root: './uploads' });
    }
    getAllProducts(pageOptionsDto) {
        return this.productsService.getAllProducts(pageOptionsDto);
    }
    getProductById(id) {
        return this.productsService.getProductById(id);
    }
    deleteProductById(id) {
        console.log(id);
        return this.productsService.deleteProductById(id);
    }
    updateProduct(updateProductDto, id, req, images) {
        if (req[constants_1.UNSUPPORTED_FILE]) {
            throw new common_1.BadRequestException(`Accepted file extensions are: jpg, jpeg, webp, png`);
        }
        else {
            console.log(updateProductDto);
            console.log(images);
            return this.productsService.updateProduct(updateProductDto, id, images);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Admin]),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: file_upload_utils_1.editFilename,
        }),
        fileFilter: file_upload_utils_1.imageFileFilter,
    }), response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto,
        Array, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)(`pictures/:filename`),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getPicture", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Admin]),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProductById", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Admin]),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: file_upload_utils_1.editFilename,
        }),
        fileFilter: file_upload_utils_1.imageFileFilter,
    }), response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    (0, swagger_1.ApiTags)('Products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map