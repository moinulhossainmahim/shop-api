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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Product_1 = require("../entity/Product");
const typeorm_2 = require("typeorm");
const Categories_1 = require("../entity/Categories");
const SubCategory_1 = require("../entity/SubCategory");
let ProductsService = exports.ProductsService = class ProductsService {
    constructor(productsRepository, categoriesRepository, subCategoriesRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
        this.subCategoriesRepository = subCategoriesRepository;
    }
    async createProduct(createProductDto, images) {
        const Promisecategories = createProductDto.categories.map(async (cat) => {
            return await this.categoriesRepository.findOne({ where: { id: cat } });
        });
        const PromisesubCategories = createProductDto.subCategories.map(async (subCat) => {
            return await this.subCategoriesRepository.findOne({
                where: { id: subCat },
            });
        });
        const product = this.productsRepository.create({
            salePrice: Number(createProductDto.salePrice),
            quantity: Number(createProductDto.quantity),
            price: Number(createProductDto.price),
            slug: createProductDto.slug,
            name: createProductDto.name,
            desc: createProductDto.desc,
            sku: createProductDto.sku,
            status: createProductDto.status,
            unit: createProductDto.unit,
        });
        product.categories = await Promise.all(Promisecategories);
        product.subcategories = await Promise.all(PromisesubCategories);
        console.log(product.categories);
        product.featuredImg = `http://localhost:3000/products/pictures/${images[0].filename}`;
        product.galleryImg = images
            .slice(1)
            .map((img) => `http://localhost:3000/products/pictures/${img.filename}`);
        try {
            await this.productsRepository.save(product);
            return {
                success: true,
                message: 'Product created successfully',
                data: product,
            };
        }
        catch (error) {
            if (error.errno === 1062) {
                throw new common_1.BadRequestException('Prodcut name and sku must be unique');
            }
            else {
                console.log(error);
            }
        }
    }
    async getAllProducts() {
        try {
            const products = await this.productsRepository.find({
                relations: ['categories', 'subcategories'],
            });
            return {
                success: true,
                message: 'Fetch products successfully',
                data: products,
                meta: {},
            };
        }
        catch (error) {
            console.log(error.message);
        }
    }
    async getProductById(id) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (product) {
            return {
                success: true,
                message: 'Get product successfully',
                data: product,
            };
        }
        else {
            throw new common_1.NotFoundException(`Product with ID ${id} not found!`);
        }
    }
    async updateProduct(createProductDto, id, files) {
        const { data: product } = await this.getProductById(id);
        const Promisecategories = createProductDto.categories.map(async (cat) => {
            return await this.categoriesRepository.findOne({ where: { id: cat } });
        });
        const PromisesubCategories = createProductDto.subCategories.map(async (subCat) => {
            return await this.subCategoriesRepository.findOne({
                where: { id: subCat },
            });
        });
        product.categories = await Promise.all(Promisecategories);
        product.subcategories = await Promise.all(PromisesubCategories);
        if (product) {
            if (files.length) {
                product.featuredImg = `http://localhost:3000/products/pictures/${files[0].filename}`;
                product.galleryImg = files
                    .slice(1)
                    .map((file) => `http://localhost:3000/products/pictures/${file.filename}`);
            }
            const { categories, subCategories, ...newCreateProductDto } = createProductDto;
            Object.assign(product, newCreateProductDto);
            try {
                await this.productsRepository.save(product);
                return {
                    message: 'Product updated successfully',
                    success: true,
                    data: product,
                };
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    async deleteProductById(id) {
        const result = await this.productsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return {
            data: [],
            success: true,
            message: 'Successfully deleted the product',
        };
    }
};
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Product_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(Categories_1.Categories)),
    __param(2, (0, typeorm_1.InjectRepository)(SubCategory_1.SubCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map