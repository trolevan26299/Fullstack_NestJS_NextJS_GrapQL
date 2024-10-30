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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("./user.service");
const user_model_1 = require("./models/user.model");
const user_dto_1 = require("./dto/user.dto");
const auth_guard_1 = require("../auth/auth.guard");
const common_1 = require("@nestjs/common");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async users(filter) {
        return await this.userService.findAll(filter);
    }
    async user(id) {
        return await this.userService.findOne(Number(id));
    }
    async createUser(userData) {
        return await this.userService.create(userData);
    }
    async updateUser(id, dataUpdate) {
        return await this.userService.update(Number(id), dataUpdate);
    }
    async deleteUser(id) {
        return await this.userService.delete(Number(id));
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Query)(() => user_model_1.UserPaginationResponse),
    __param(0, (0, graphql_1.Args)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserFilter]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, graphql_1.Query)(() => user_model_1.User),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_model_1.User),
    __param(0, (0, graphql_1.Args)('userData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_model_1.User),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('dataUpdate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
exports.UserResolver = UserResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map