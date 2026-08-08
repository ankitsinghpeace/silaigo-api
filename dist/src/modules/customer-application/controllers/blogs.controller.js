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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const blogs_service_1 = require("../services/blogs.service");
const blog_dto_1 = require("../dto/blog.dto");
const permissions_enums_1 = require("../../../../core-db/enums/permissions.enums");
const permissions_guard_1 = require("../../../core/guards/permissions.guard");
let BlogsController = class BlogsController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    getBlogs(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogsService.getBlogs(query);
        });
    }
    getBlogsAdmin(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogsService.getBlogsAdmin(query);
        });
    }
    getBlogBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogsService.getBlogBySlug(slug);
        });
    }
    createBlog(blogDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogsService.createBlog(blogDto, req);
        });
    }
    updateBlog(slug, blogDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogsService.updateBlog(slug, blogDto, req);
        });
    }
    deleteBlog(slug, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogsService.deleteBlog(slug, req);
        });
    }
    addReaction(reactionDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blogsService.addReaction(reactionDto, req);
        });
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogQueryDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogs", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${permissions_enums_1.PermissionType.CONTENT}.${permissions_enums_1.PermissionSubType.VIEW}`])),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogQueryDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogsAdmin", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogBySlug", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${permissions_enums_1.PermissionType.CONTENT}.${permissions_enums_1.PermissionSubType.CREATE}`])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.CreateBlogDto, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Put)(':slug'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${permissions_enums_1.PermissionType.CONTENT}.${permissions_enums_1.PermissionSubType.EDIT}`])),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, blog_dto_1.CreateBlogDto, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "updateBlog", null);
__decorate([
    (0, common_1.Delete)(':slug'),
    (0, common_1.UseGuards)((0, permissions_guard_1.PermissionsGuard)([`${permissions_enums_1.PermissionType.CONTENT}.${permissions_enums_1.PermissionSubType.DELETE}`])),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "deleteBlog", null);
__decorate([
    (0, common_1.Post)('reaction'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogReactionDto, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "addReaction", null);
exports.BlogsController = BlogsController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsController);
//# sourceMappingURL=blogs.controller.js.map