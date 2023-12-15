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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Order_1 = require("../entity/Order");
const typeorm_2 = require("typeorm");
const order_items_service_1 = require("../order-items/order-items.service");
const dtos_1 = require("../common/dtos");
let OrdersService = exports.OrdersService = class OrdersService {
    constructor(ordersRepository, orderItemsService) {
        this.ordersRepository = ordersRepository;
        this.orderItemsService = orderItemsService;
    }
    async createOrder(user, createOrderDto) {
        const orderItems = await Promise.all(createOrderDto.orderItems.map((orderItem) => this.orderItemsService.createOrderItem(orderItem)));
        const order = {
            ...createOrderDto,
            orderItems,
            user,
        };
        const neworder = this.ordersRepository.create(order);
        try {
            const savedOrder = await this.ordersRepository.save(neworder);
            const { user, ...newSavedOrder } = savedOrder;
            return {
                data: newSavedOrder,
                message: 'Order placed successfully',
                success: true,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAllOrdersOfAUser(user, pageOptionsDto) {
        const orders = await this.ordersRepository.find({
            relations: ['orderItems', 'shippingAddress', 'billingAddress'],
            where: { user: { id: user.id } },
            take: pageOptionsDto.take,
            skip: pageOptionsDto.skip,
        });
        const newOrders = await Promise.all(orders.map(async (order) => {
            const items = await Promise.all(order.orderItems.map(async (item) => await this.orderItemsService.getOrderItemById(item.id)));
            return {
                ...order,
                orderItems: items,
            };
        }));
        const itemCount = newOrders.length;
        const meta = new dtos_1.PageMetaDto({ itemCount, pageOptionsDto });
        return {
            success: true,
            data: newOrders,
            meta: meta,
            message: 'Orders fetched successfully',
        };
    }
    async deleteOrderById(id) {
        const result = await this.ordersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found!`);
        }
        return {
            message: 'Order deleted successfully',
            data: [],
            success: true,
        };
    }
    async findOrderById(id) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['orderItems', 'shippingAddress', 'billingAddress'],
        });
        const orderItems = await Promise.all(order.orderItems.map(async (item) => await this.orderItemsService.getOrderItemById(item.id)));
        order.orderItems = orderItems;
        return {
            message: 'Fetched order successfully',
            data: order,
            success: true,
        };
    }
    async updateOrderById(id, updateOrderDto) {
        const result = await this.ordersRepository.update(id, updateOrderDto);
        if (result.affected !== 0) {
            const updateOrder = this.findOrderById(id);
            return {
                message: 'Order updated successfully',
                data: (await updateOrder).data,
                success: true,
            };
        }
    }
    async getAllUsersOrders(pageOptionsDto) {
        const orders = await this.ordersRepository.find({
            relations: ['orderItems', 'shippingAddress', 'billingAddress'],
            take: pageOptionsDto.take,
            skip: pageOptionsDto.skip,
        });
        const newOrders = await Promise.all(orders.map(async (order) => {
            const items = await Promise.all(order.orderItems.map(async (item) => await this.orderItemsService.getOrderItemById(item.id)));
            return {
                ...order,
                orderItems: items,
            };
        }));
        const itemCount = newOrders.length;
        const meta = new dtos_1.PageMetaDto({ itemCount, pageOptionsDto });
        return {
            success: true,
            data: newOrders,
            meta: meta,
            message: 'Orders fetched successfully',
        };
    }
};
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Order_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        order_items_service_1.OrderItemsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map