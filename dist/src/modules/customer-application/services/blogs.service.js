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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const model_metadata_1 = require("../../../../core-db/model.metadata");
const enums_1 = require("../../../../core-db/enums");
let BlogsService = class BlogsService {
    constructor(blogModel, blogReactionModel) {
        this.blogModel = blogModel;
        this.blogReactionModel = blogReactionModel;
    }
    getReactionCounts(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.blogReactionModel.aggregate([
                { $match: { blog: new mongoose_1.default.Types.ObjectId(blogId) } },
                { $group: { _id: '$type', count: { $sum: 1 } } },
                { $project: { _id: 0, type: '$_id', count: 1 } }
            ]);
        });
    }
    getBlogs(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, category, page = 1, limit = 10 } = query;
            const pageLimit = Math.min(Number(limit) || 50);
            const currentPage = Math.max(1, Number(page) || 1);
            const skip = (currentPage - 1) * pageLimit;
            let mongoQuery = {};
            if (title) {
                const searchRegex = { $regex: title, $options: 'i' };
                mongoQuery.$or = [
                    { title: searchRegex },
                    { content: searchRegex }
                ];
            }
            if (category) {
                mongoQuery.category = category;
            }
            mongoQuery.isPublished = true;
            const total = yield this.blogModel.countDocuments(mongoQuery);
            const blogs = yield this.blogModel
                .find(mongoQuery)
                .populate('author', 'firstName lastName')
                .populate('reactions')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(pageLimit)
                .lean();
            const totalPages = Math.ceil(total / pageLimit);
            const hasNextPage = currentPage < totalPages;
            const hasPrevPage = currentPage > 1;
            return {
                blogs,
                pagination: {
                    currentPage,
                    totalPages,
                    hasNextPage,
                    hasPrevPage,
                    total,
                    count: blogs.length,
                    limit: pageLimit,
                    nextPage: hasNextPage ? currentPage + 1 : null,
                    prevPage: hasPrevPage ? currentPage - 1 : null
                },
                filters: {
                    title,
                    category
                }
            };
        });
    }
    createBlog(blogDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let slug = `${blogDto.title.toLowerCase().replace(/ /g, '-')}-${Date.now()}`;
            const existingBlog = yield this.blogModel.findOne({ slug });
            if (existingBlog) {
                slug = `${blogDto.title.toLowerCase().replace(/ /g, '-')}-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
            }
            const blog = new this.blogModel(Object.assign(Object.assign({}, blogDto), { author: req.user._id, slug }));
            return blog.save();
        });
    }
    getBlogBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogModel.findOne({ slug, isPublished: true }).populate('author', 'firstName lastName').lean();
            if (!blog) {
                throw new common_1.NotFoundException('Blog not found');
            }
            const blogReactionCount = yield this.getReactionCounts(blog._id.toString());
            return Object.assign(Object.assign({}, blog), { reactions: blogReactionCount });
        });
    }
    updateBlog(slug, blogDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogModel.findOne({ slug });
            if (!blog) {
                throw new common_1.NotFoundException('Blog not found');
            }
            if (blog.author.toString() !== req.user._id.toString() && req.user.role !== enums_1.RoleCode.ADMIN) {
                throw new common_1.ForbiddenException('You are not authorized to update this blog');
            }
            const updatedBlog = yield this.blogModel.findByIdAndUpdate(blog._id, blogDto, { new: true });
            return updatedBlog;
        });
    }
    addReaction(reactionDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogModel.findOne({ slug: reactionDto.slug });
            if (!blog) {
                throw new common_1.NotFoundException('Blog not found');
            }
            const existingReaction = yield this.blogReactionModel.findOne({
                blog: blog._id,
                user: req.user._id,
            });
            if (existingReaction && existingReaction.type === reactionDto.type) {
                yield this.blogReactionModel.findByIdAndDelete(existingReaction._id);
                yield this.blogModel.findByIdAndUpdate(blog._id, { $pull: { reactions: existingReaction._id } }, { new: true });
            }
            else {
                const updatedReaction = yield this.blogReactionModel.findOneAndUpdate({ blog: blog._id, user: req.user._id }, { type: reactionDto.type }, { upsert: true, new: true, setDefaultsOnInsert: true });
                const isAlreadyInBlog = blog.reactions.some((r) => r.toString() === updatedReaction._id.toString());
                if (!isAlreadyInBlog) {
                    blog.reactions.push(new mongoose_1.default.Types.ObjectId(updatedReaction._id));
                    yield blog.save();
                }
            }
            const blogReactionCount = yield this.getReactionCounts(blog._id.toString());
            return { reactions: blogReactionCount };
        });
    }
    deleteBlog(slug, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogModel.findOne({ slug });
            if (!blog) {
                throw new common_1.NotFoundException('Blog not found');
            }
            if (blog.author.toString() !== req.user._id.toString() && req.user.role !== enums_1.RoleCode.ADMIN) {
                throw new common_1.ForbiddenException('You are not authorized to delete this blog');
            }
            yield this.blogModel.findByIdAndDelete(blog._id);
            return { message: 'Blog deleted successfully' };
        });
    }
    getBlogsAdmin(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, category, page = 1, limit = 10 } = query;
            const pageLimit = Math.min(Number(limit) || 50);
            const currentPage = Math.max(1, Number(page) || 1);
            const skip = (currentPage - 1) * pageLimit;
            let mongoQuery = {};
            if (title) {
                const searchRegex = { $regex: title, $options: 'i' };
                mongoQuery.$or = [
                    { title: searchRegex },
                    { content: searchRegex }
                ];
            }
            if (category) {
                mongoQuery.category = category;
            }
            const total = yield this.blogModel.countDocuments(mongoQuery);
            const blogs = yield this.blogModel
                .find(mongoQuery)
                .populate('author', 'firstName lastName')
                .populate('reactions')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(pageLimit)
                .lean();
            const totalPages = Math.ceil(total / pageLimit);
            const hasNextPage = currentPage < totalPages;
            const hasPrevPage = currentPage > 1;
            return {
                blogs,
                pagination: {
                    currentPage,
                    totalPages,
                    hasNextPage,
                    hasPrevPage,
                    total,
                    count: blogs.length,
                    limit: pageLimit,
                    nextPage: hasNextPage ? currentPage + 1 : null,
                    prevPage: hasPrevPage ? currentPage - 1 : null
                },
                filters: {
                    title,
                    category
                }
            };
        });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Blog.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.BlogReaction.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map