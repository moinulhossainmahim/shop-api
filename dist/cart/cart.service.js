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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Cart_1 = require("../entity/Cart");
const Product_1 = require("../entity/Product");
const User_1 = require("../entity/User");
const typeorm_2 = require("typeorm");
let CartService = exports.CartService = class CartService {
    constructor(cartRepository, userRepository, productRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }
    async addToCart(addToCartDto, user) {
        const { productId, quantity } = addToCartDto;
        const cartItems = await this.cartRepository.find({
            relations: ['product', 'user'],
        });
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        const authUser = await this.userRepository.findOne({
            where: { id: user.id },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product item not found');
        }
        const cart = cartItems.filter((item) => item.product.id === productId && item.user.id === user.id);
        if (cart.length < 1) {
            const newItem = this.cartRepository.create({
                total: Number(product.salePrice) * Number(quantity),
                quantity,
            });
            newItem.user = authUser;
            newItem.product = product;
            newItem.productId = productId;
            const cartItem = await this.cartRepository.save(newItem);
            const { user, ...cart } = cartItem;
            return {
                message: 'Add product to cart successfully',
                success: true,
                data: cart,
            };
        }
    }
    async updateCart(user, productId, quantity) {
        const found = await this.cartRepository.findOne({
            where: { productId, user: { id: user.id } },
            relations: ['product'],
        });
        if (found) {
            const total = Number(found.product.salePrice) * quantity;
            try {
                const result = await this.cartRepository.update({ productId }, {
                    quantity,
                    total,
                });
                if (result.affected === 1) {
                    const cart = await this.cartRepository.findOne({
                        where: { productId },
                        relations: ['product'],
                    });
                    return {
                        message: 'Cart updated successfully',
                        data: cart,
                        success: true,
                    };
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    async getCartOfAUser(user) {
        const cart = await this.cartRepository.find({
            relations: ['product'],
            where: { user: { id: user.id } },
        });
        return {
            message: 'Fetched cart successfully',
            success: true,
            data: cart,
        };
    }
    async deleteAllCartOfAUser(user) {
        let isSuccess = true;
        const carts = await this.getCartOfAUser(user);
        if (carts.data.length) {
            carts.data.forEach(async (cart) => {
                const result = await this.cartRepository.delete(cart.id);
                if (result.affected === 0)
                    isSuccess = false;
            });
            if (isSuccess) {
                return {
                    message: 'Cart removed successfully',
                    success: true,
                    data: [],
                };
            }
        }
        else {
            return {
                message: 'Empty cart list',
                success: false,
                data: [],
            };
        }
    }
    async deleteCartByProductId(productId, user) {
        const found = await this.cartRepository.findOne({
            where: { productId, user: { id: user.id } },
        });
        if (found) {
            const result = await this.cartRepository.delete({ productId });
            if (result.affected === 1) {
                return {
                    message: 'Removed product from cart successfully',
                    data: [],
                    success: true,
                };
            }
            else {
                return {
                    message: `Product with ID - ${productId} not found`,
                    data: [],
                    success: false,
                };
            }
        }
        else {
            return {
                message: `Cart item with product ID - ${productId} and the user not found`,
                data: [],
                success: false,
            };
        }
    }
};
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Cart_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(Product_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map