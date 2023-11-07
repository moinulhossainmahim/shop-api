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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const User_1 = require("../entity/User");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_upload_utils_1 = require("../products/file-upload.utils");
const swagger_1 = require("@nestjs/swagger");
const response_interceptor_1 = require("../interceptors/response.interceptor");
const get_user_decorator_1 = require("../decorators/get-user.decorator");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const role_guard_1 = require("../guards/role.guard");
const role_decorator_1 = require("../decorators/role.decorator");
const role_enum_1 = require("./enums/role.enum");
const update_password_dto_1 = require("./dto/update-password.dto");
let UsersController = exports.UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }
    async getPicture(filename, res) {
        res.sendFile(filename, { root: './uploads' });
    }
    getProfile(user) {
        return this.usersService.getUserById(user.id);
    }
    async deleteUserById(id) {
        return this.usersService.deleteUserById(id);
    }
    async updatePassword(id, updatePasswordDto) {
        return this.usersService.updatePassword(id, updatePasswordDto);
    }
    updateUser(updateUserDto, id, avatar) {
        if (avatar) {
            updateUserDto.avatar = `http://localhost:3000/users/pictures/${avatar.filename}`;
        }
        return this.usersService.updateUser(id, updateUserDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Admin, role_enum_1.Role.Customer]),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(`pictures/:filename`),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPicture", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Customer, role_enum_1.Role.Admin]),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Admin]),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.Patch)('/:id/update-password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Admin, role_enum_1.Role.Customer]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.UserRole)([role_enum_1.Role.Customer, role_enum_1.Role.Admin]),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: file_upload_utils_1.editFilename,
        }),
        fileFilter: file_upload_utils_1.imageFileFilter,
    }), response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map