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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../entity/User");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../auth/auth.service");
let UsersService = exports.UsersService = class UsersService {
    constructor(usersRepository, authService) {
        this.usersRepository = usersRepository;
        this.authService = authService;
    }
    async getAllUsers() {
        const users = await this.usersRepository.find({
            select: ['id', 'avatar', 'email', 'fullName', 'status', 'userType'],
            relations: ['address'],
        });
        return {
            message: 'Fetched users successfully',
            success: true,
            data: users,
            meta: {},
        };
    }
    async getUserById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            select: [
                'id',
                'avatar',
                'email',
                'fullName',
                'status',
                'userType',
                'contact',
            ],
            relations: ['address'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found!`);
        }
        return {
            message: 'Fetched user successfully',
            data: user,
            success: true,
        };
    }
    async findUserByEmail(email) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException(`Invalid credentials`);
        }
        return user;
    }
    async deleteUserById(id) {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with ID ${id} is not found`);
        }
        return {
            success: true,
            data: [],
            message: 'User deleted successfully',
        };
    }
    async updateUser(id, updateUserDto) {
        const { data: user } = await this.getUserById(id);
        if (!user) {
            throw new common_1.UnauthorizedException(`User with the given ID is not found`);
        }
        try {
            await this.usersRepository.update(id, updateUserDto);
            const result = await this.usersRepository.findOne({
                where: { id },
                select: [
                    'id',
                    'avatar',
                    'email',
                    'fullName',
                    'status',
                    'userType',
                    'contact',
                ],
                relations: ['address'],
            });
            return {
                message: 'Updated user successfully',
                success: true,
                data: result,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async updatePassword(id, updatePassword) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const isValidated = await user.validatePassword(updatePassword.oldPassword);
        if (!isValidated) {
            throw new common_1.UnauthorizedException('Old password you have provided is incorrect');
        }
        user.salt = user.salt;
        user.password = await this.authService.hashPassword(updatePassword.newPassword, user.salt);
        try {
            await this.usersRepository.save(user);
            return {
                data: [],
                message: 'Password updated successfully',
                success: true,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map