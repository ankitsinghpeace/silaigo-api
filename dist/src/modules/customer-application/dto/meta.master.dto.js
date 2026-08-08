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
exports.GetMetaMasterListDto = exports.MetaMasterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class MetaMasterDto {
}
exports.MetaMasterDto = MetaMasterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'banner' }),
    __metadata("design:type", String)
], MetaMasterDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'festival-offer' }),
    __metadata("design:type", String)
], MetaMasterDto.prototype, "subType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Big Diwali Sale' }),
    __metadata("design:type", String)
], MetaMasterDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Flexible JSON object' }),
    __metadata("design:type", Object)
], MetaMasterDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    __metadata("design:type", Boolean)
], MetaMasterDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MetaMasterDto.prototype, "color", void 0);
class GetMetaMasterListDto {
    constructor() {
        this.page = 1;
        this.limit = 50;
        this.sortBy = 'newest';
    }
}
exports.GetMetaMasterListDto = GetMetaMasterListDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetMetaMasterListDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetMetaMasterListDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetMetaMasterListDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['newest', 'oldest']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetMetaMasterListDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetMetaMasterListDto.prototype, "type", void 0);
//# sourceMappingURL=meta.master.dto.js.map