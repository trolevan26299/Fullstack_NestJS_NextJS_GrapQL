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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dataUser) {
        return await this.prisma.user.create({
            data: dataUser,
        });
    }
    async findAll(filter) {
        const search = filter.search || '';
        const itemsPerPage = Number(filter.itemsPerPage) || 10;
        const page = Number(filter.page) || 1;
        const skip = page > 1 ? (page - 1) * itemsPerPage : 0;
        const users = await this.prisma.user.findMany({
            take: itemsPerPage,
            skip,
            where: {
                OR: [
                    {
                        username: {
                            contains: search,
                        }
                    },
                    {
                        email: {
                            contains: search,
                        }
                    }
                ]
            }
        });
        const total = await this.prisma.user.count({
            where: {
                OR: users.map((user) => ({
                    username: { contains: search },
                    email: { contains: search },
                })),
            },
        });
        return {
            data: users,
            total,
            currentPage: page,
            itemsPerPage,
        };
    }
    async findOne(id) {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
    async update(id, dataUpdate) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return await this.prisma.user.update({
            where: { id },
            data: dataUpdate,
        });
    }
    async delete(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        try {
            await this.prisma.user.delete({
                where: { id },
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map