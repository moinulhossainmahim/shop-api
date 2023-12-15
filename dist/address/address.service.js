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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Address_1 = require("../entity/Address");
const typeorm_2 = require("typeorm");
let AddressService = exports.AddressService = class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async getAddressById(user, addressId) {
        const query = this.addressRepository.createQueryBuilder('address');
        const getAddressByUserId = await query
            .where('address.userId = :userId', {
            userId: user.id,
        })
            .getMany();
        if (!getAddressByUserId.length) {
            throw new common_1.BadRequestException(`This user is not eligible to do the operation`);
        }
        const address = getAddressByUserId.find((address) => address.id === addressId);
        if (!address) {
            throw new common_1.NotFoundException(`Address with ID ${addressId} not found`);
        }
        return address;
    }
    async createAddress(createAddressDto, user) {
        const address = this.addressRepository.create({
            ...createAddressDto,
            user,
        });
        try {
            await this.addressRepository.save(address);
            delete address.user;
            return {
                message: 'Address added successfully',
                success: true,
                data: address,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAllAddress(user) {
        const query = this.addressRepository.createQueryBuilder('address');
        query
            .where('address.userId = :userId', { userId: user.id })
            .andWhere('address.isActive = :isActive', { isActive: true });
        const allAddress = await query.getMany();
        return {
            message: 'Fetched addresses successfully',
            data: allAddress,
            success: true,
            meta: {},
        };
    }
    async updateAddress(user, updateAddressDto, id) {
        const address = await this.getAddressById(user, id);
        Object.assign(address, updateAddressDto);
        try {
            await this.addressRepository.save(address);
            return {
                message: 'Address updated successfully',
                success: true,
                data: address,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteAddress(user, id) {
        const address = await this.getAddressById(user, id);
        if (address) {
            await this.addressRepository.update(id, { isActive: false });
        }
        return {
            success: true,
            data: [],
            message: 'Address deleted successfully',
        };
    }
};
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Address_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddressService);
//# sourceMappingURL=address.service.js.map