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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(userData) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: userData.email },
        });
        if (userExists) {
            throw new common_1.BadRequestException('User already exists');
        }
        if (userExists) {
            throw new common_1.HttpException('this email already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        const user = await this.prisma.user.create({
            data: { ...userData, password: hashedPassword },
        });
        return user;
    }
    async login(userData) {
        const user = await this.prisma.user.findUnique({
            where: { email: userData.email },
        });
        if (!user) {
            throw new common_1.HttpException({ message: 'Invalid credentials' }, common_1.HttpStatus.BAD_REQUEST);
        }
        const isPasswordValid = await (0, bcrypt_1.compare)(userData.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException({ message: 'password is incorrect' }, common_1.HttpStatus.BAD_REQUEST);
        }
        const payload = {
            id: user.id,
            name: user.username,
            email: user.email,
        };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: 60,
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map