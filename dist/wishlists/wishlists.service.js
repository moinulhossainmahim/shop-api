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
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dtos_1 = require("../common/dtos");
const Product_1 = require("../entity/Product");
const Wishlist_1 = require("../entity/Wishlist");
const typeorm_2 = require("typeorm");
let WishlistsService = exports.WishlistsService = class WishlistsService {
    constructor(wishlistsRepository, productsRepository) {
        this.wishlistsRepository = wishlistsRepository;
        this.productsRepository = productsRepository;
    }
    async addToWishlist(user, productId) {
        const product = await this.productsRepository.findOne({
            where: { id: productId },
        });
        const wishlistItem = this.wishlistsRepository.create({
            product,
            user,
        });
        try {
            const wishlist = await this.wishlistsRepository.save(wishlistItem);
            if (wishlist) {
                return {
                    message: 'Added to wishlist successfully',
                    data: [],
                    success: true,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAllWishlist(user, pageOptionsDto) {
        const wishlists = await this.wishlistsRepository.find({
            where: { user: { id: user.id } },
            relations: ['product'],
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take,
        });
        const itemCount = wishlists.length;
        const meta = new dtos_1.PageMetaDto({ itemCount, pageOptionsDto });
        return {
            success: true,
            data: wishlists,
            meta,
            message: 'Fetched wishlists successfully',
        };
    }
    async removeFromWishlist(id) {
        const wishlist = await this.wishlistsRepository.findOne({ where: { id } });
        if (!wishlist) {
            throw new common_1.NotFoundException(`Wishlist with ID ${id} not found`);
        }
        const result = await this.wishlistsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Wishlist with ID ${id} not found`);
        }
        return {
            success: true,
            data: [],
            message: 'Wishlist removed successfully',
        };
    }
};
exports.WishlistsService = WishlistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Wishlist_1.Wishlist)),
    __param(1, (0, typeorm_1.InjectRepository)(Product_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WishlistsService);
//# sourceMappingURL=wishlists.service.js.map