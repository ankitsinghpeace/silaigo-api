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
exports.BlogReactionDto = exports.BlogQueryDto = exports.BlogResponseDto = exports.UpdateBlogDto = exports.CreateBlogDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const blogReactions_schema_1 = require("../../../../core-db/schemas/blogReactions.schema");
class CreateBlogDto {
}
exports.CreateBlogDto = CreateBlogDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the blog post',
        example: 'Getting Started with NestJS'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Content of the blog post',
        example: 'This is the main content of the blog post...'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category of the blog post',
        example: 'Technology'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the featured image',
        example: 'https://example.com/image.jpg'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "featuredImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the author (User)',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "author", void 0);
class UpdateBlogDto {
}
exports.UpdateBlogDto = UpdateBlogDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Title of the blog post',
        example: 'Getting Started with NestJS'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Content of the blog post',
        example: 'This is the main content of the blog post...'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Category of the blog post',
        example: 'Technology'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL of the featured image',
        example: 'https://example.com/image.jpg'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "featuredImage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of the author (User)',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "author", void 0);
class BlogResponseDto {
}
exports.BlogResponseDto = BlogResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the blog post',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], BlogResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the blog post',
        example: 'Getting Started with NestJS'
    }),
    __metadata("design:type", String)
], BlogResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Content of the blog post',
        example: 'This is the main content of the blog post...'
    }),
    __metadata("design:type", String)
], BlogResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category of the blog post',
        example: 'Technology'
    }),
    __metadata("design:type", String)
], BlogResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the featured image',
        example: 'https://example.com/image.jpg'
    }),
    __metadata("design:type", String)
], BlogResponseDto.prototype, "featuredImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the author (User)',
        example: '507f1f77bcf86cd799439011'
    }),
    __metadata("design:type", String)
], BlogResponseDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of blog reaction IDs',
        example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013']
    }),
    __metadata("design:type", Array)
], BlogResponseDto.prototype, "reactions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation timestamp',
        example: '2023-01-01T00:00:00.000Z'
    }),
    __metadata("design:type", String)
], BlogResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update timestamp',
        example: '2023-01-01T00:00:00.000Z'
    }),
    __metadata("design:type", String)
], BlogResponseDto.prototype, "updatedAt", void 0);
class BlogQueryDto {
}
exports.BlogQueryDto = BlogQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search by title',
        example: 'NestJS'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BlogQueryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by category',
        example: 'Technology'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BlogQueryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by author ID',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BlogQueryDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page number for pagination',
        example: 1
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BlogQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of items per page',
        example: 10
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BlogQueryDto.prototype, "limit", void 0);
class BlogReactionDto {
}
exports.BlogReactionDto = BlogReactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of reaction',
        example: 'like'
    }),
    (0, class_validator_1.IsEnum)(blogReactions_schema_1.BlogReactionType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BlogReactionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Slug of the blog post',
        example: 'getting-started-with-nestjs'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BlogReactionDto.prototype, "slug", void 0);
//# sourceMappingURL=blog.dto.js.map