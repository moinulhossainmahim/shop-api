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
exports.OrderItemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const OrderItem_1 = require("../entity/OrderItem");
const typeorm_2 = require("typeorm");
const Product_1 = require("../entity/Product");
let OrderItemsService = exports.OrderItemsService = class OrderItemsService {
    constructor(OrderItemRepository, productRepository) {
        this.OrderItemRepository = OrderItemRepository;
        this.productRepository = productRepository;
    }
    async createOrderItem(createOrderItemDto) {
        const data = await this.productRepository.findOne({
            where: { id: createOrderItemDto.productId },
        });
        const orderItem = new OrderItem_1.OrderItem();
        orderItem.quantity = createOrderItemDto.quantity;
        orderItem.subtotal = createOrderItemDto.subtotal;
        orderItem.unit_price = createOrderItemDto.unit_price;
        orderItem.product = data;
        try {
            const savedOrderItem = await this.OrderItemRepository.save(orderItem);
            const itemsWithProduct = await this.OrderItemRepository.findOne({
                where: { id: savedOrderItem.id },
                relations: ['product'],
            });
            return itemsWithProduct;
        }
        catch (error) {
            if (error.errno === 1452) {
                throw new common_1.BadRequestException('Order item ID must be a product ID');
            }
            console.log(error);
        }
    }
    async getOrderItemById(id) {
        const orderItem = await this.OrderItemRepository.findOne({
            where: { id },
            relations: ['product'],
        });
        return orderItem;
    }
};
exports.OrderItemsService = OrderItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(OrderItem_1.OrderItem)),
    __param(1, (0, typeorm_1.InjectRepository)(Product_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrderItemsService);
//# sourceMappingURL=order-items.service.js.map