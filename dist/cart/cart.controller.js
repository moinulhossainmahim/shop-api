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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const addToCart_dto_1 = require("./dto/addToCart-dto");
const get_user_decorator_1 = require("../decorators/get-user.decorator");
const User_1 = require("../entity/User");
const response_interceptor_1 = require("../interceptors/response.interceptor");
let CartController = exports.CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async addToCart(addToCartDto, user) {
        return await this.cartService.addToCart(addToCartDto, user);
    }
    async getCartOfAUser(user) {
        return this.cartService.getCartOfAUser(user);
    }
    async updateCart(productId, user, quantity) {
        return this.cartService.updateCart(user, productId, quantity);
    }
    async deleteAllCartOfAUser(user) {
        return this.cartService.deleteAllCartOfAUser(user);
    }
    async deleteCartByProductId(productId, user) {
        return this.cartService.deleteCartByProductId(productId, user);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addToCart_dto_1.AddToCartDto,
        User_1.User]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCartOfAUser", null);
__decorate([
    (0, common_1.Put)('/:productId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Query)('quantity', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, User_1.User, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCart", null);
__decorate([
    (0, common_1.Delete)('/all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteAllCartOfAUser", null);
__decorate([
    (0, common_1.Delete)('/:productId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, User_1.User]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCartByProductId", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map