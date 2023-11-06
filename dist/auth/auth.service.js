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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../entity/User");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const role_enum_1 = require("../users/enums/role.enum");
let AuthService = exports.AuthService = class AuthService {
    constructor(usersRepository, usersService, jwtService) {
        this.usersRepository = usersRepository;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(signInCredentialsDto) {
        const { email, password } = signInCredentialsDto;
        const foundUser = await this.usersService.findUserByEmail(email);
        const { password: userPassword, validatePassword, ...user } = foundUser;
        if (foundUser && (await foundUser.validatePassword(password))) {
            return user;
        }
        else {
            return null;
        }
    }
    async hashPassword(password, salt) {
        return await bcrypt.hash(password, salt);
    }
    async signUp(signUpCredentialsDto) {
        const { fullName, email, password, contact } = signUpCredentialsDto;
        const user = new User_1.User();
        if (email === 'moinulhossainmahim@gmail.com') {
            user.userType = role_enum_1.Role.Admin;
        }
        user.fullName = fullName;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.email = email;
        user.contact = contact;
        try {
            await this.usersRepository.save(user);
            return {
                message: 'sign up successfully',
                data: [],
                success: true,
            };
        }
        catch (error) {
            if (error.errno === 1062) {
                throw new common_1.ConflictException('Email already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async signIn(signInCredentialsDto) {
        const user = await this.validateUser(signInCredentialsDto);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { name: user.fullName, userId: user.id };
        const accessToken = this.jwtService.sign(payload);
        return {
            message: 'sign in successfully',
            data: { accessToken },
            success: true,
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map