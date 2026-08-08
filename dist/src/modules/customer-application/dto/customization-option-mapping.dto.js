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
exports.GetCustomizationOptionsMappingDto = exports.CustomizationOptionMappingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CustomizationOptionMappingDto {
}
exports.CustomizationOptionMappingDto = CustomizationOptionMappingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the customization option mapping',
        example: '683546829f23565360e58530',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomizationOptionMappingDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The type of customization',
        example: '6815ac6816da640fdc87bc03',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomizationOptionMappingDto.prototype, "customizationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of option IDs',
        example: [
            '6815ac6816da640fdc87bc04',
            '6815ac6816da640fdc87bc05',
            '6815ac6816da640fdc87bc06',
            '6815ac6816da640fdc87bc07',
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CustomizationOptionMappingDto.prototype, "optionsId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of subcategory IDs',
        example: [1, 2, 3, 4],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], CustomizationOptionMappingDto.prototype, "subCategoryIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The category ID',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CustomizationOptionMappingDto.prototype, "categoryId", void 0);
class GetCustomizationOptionsMappingDto {
}
exports.GetCustomizationOptionsMappingDto = GetCustomizationOptionsMappingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The type of customization',
        example: 'eg. Neck,Sleeves',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetCustomizationOptionsMappingDto.prototype, "customizationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The category ID',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], GetCustomizationOptionsMappingDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The subcategory ID',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], GetCustomizationOptionsMappingDto.prototype, "subCategoryId", void 0);
//# sourceMappingURL=customization-option-mapping.dto.js.map