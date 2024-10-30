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
exports.UserPaginationResponse = exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
let User = class User {
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
exports.User = User = __decorate([
    (0, graphql_1.ObjectType)()
], User);
let UserPaginationResponse = class UserPaginationResponse {
};
exports.UserPaginationResponse = UserPaginationResponse;
__decorate([
    (0, graphql_1.Field)(() => [User]),
    __metadata("design:type", Array)
], UserPaginationResponse.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UserPaginationResponse.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UserPaginationResponse.prototype, "currentPage", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UserPaginationResponse.prototype, "itemsPerPage", void 0);
exports.UserPaginationResponse = UserPaginationResponse = __decorate([
    (0, graphql_1.ObjectType)()
], UserPaginationResponse);
//# sourceMappingURL=user.model.js.map