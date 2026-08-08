import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { ModelMetadata } from 'core-db/model.metadata';
import { IBlog, IBlogReaction } from 'core-db/interface';
import { CreateBlogDto, BlogQueryDto, BlogReactionDto } from '../dto/blog.dto';
import { RoleCode } from 'core-db/enums';

@Injectable()
export class BlogsService {

    constructor(
        @Inject(ModelMetadata.Blog.token) private readonly blogModel: Model<IBlog>,
        @Inject(ModelMetadata.BlogReaction.token) private readonly blogReactionModel: Model<IBlogReaction>,
    ) { }


    async getReactionCounts(blogId: string) {
        return await this.blogReactionModel.aggregate([
          { $match: { blog: new mongoose.Types.ObjectId(blogId) } },
          { $group: { _id: '$type', count: { $sum: 1 } } },
          { $project: { _id: 0, type: '$_id', count: 1 } }
        ]);
      }

    async getBlogs(query: BlogQueryDto) {
        const {
            title,
            category,
            page = 1,
            limit = 10
        } = query;

        const pageLimit = Math.min(Number(limit) || 50);
        const currentPage = Math.max(1, Number(page) || 1);
        const skip = (currentPage - 1) * pageLimit;

        let mongoQuery: any = {};

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
        const total = await this.blogModel.countDocuments(mongoQuery);
        const blogs = await this.blogModel
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
    }

    async createBlog(blogDto: CreateBlogDto, req: any) {
        let slug = `${blogDto.title.toLowerCase().replace(/ /g, '-')}-${Date.now()}`;

        const existingBlog = await this.blogModel.findOne({slug});
        if(existingBlog){
            slug = `${blogDto.title.toLowerCase().replace(/ /g, '-')}-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        }
        const blog = new this.blogModel({ ...blogDto, author: req.user._id, slug });
        return blog.save();
    }

    async getBlogBySlug(slug: string) {
        const blog = await this.blogModel.findOne({slug,isPublished:true}).populate('author', 'firstName lastName').lean();
        if(!blog){
            throw new NotFoundException('Blog not found');
        }
        const blogReactionCount = await this.getReactionCounts(blog._id.toString());
        return {
            ...blog,
            reactions:blogReactionCount
        };
    }

    async updateBlog(slug:string, blogDto: CreateBlogDto,req:any) {
        const blog = await this.blogModel.findOne({slug});
        if(!blog){
            throw new NotFoundException('Blog not found');
        }
        if(blog.author.toString() !== req.user._id.toString() && req.user.role !== RoleCode.ADMIN){
            throw new ForbiddenException('You are not authorized to update this blog');
        }
        const updatedBlog = await this.blogModel.findByIdAndUpdate(blog._id,blogDto,{new:true});
        return updatedBlog;
    }

    async addReaction(reactionDto: BlogReactionDto, req: any) {
        const blog = await this.blogModel.findOne({ slug: reactionDto.slug });
        if (!blog) {
            throw new NotFoundException('Blog not found');
        }
    
        const existingReaction = await this.blogReactionModel.findOne({
            blog: blog._id,
            user: req.user._id,
        });
    
        if (existingReaction && existingReaction.type === reactionDto.type) {
            await this.blogReactionModel.findByIdAndDelete(existingReaction._id);
            await this.blogModel.findByIdAndUpdate(
                blog._id,
                { $pull: { reactions: existingReaction._id } },
                { new: true }
            );
        } else {
            const updatedReaction = await this.blogReactionModel.findOneAndUpdate(
                { blog: blog._id, user: req.user._id },
                { type: reactionDto.type },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
    
            const isAlreadyInBlog = blog.reactions.some((r: any) => r.toString() === updatedReaction._id.toString());
            if (!isAlreadyInBlog) {
                blog.reactions.push(new mongoose.Types.ObjectId(updatedReaction._id));
                await blog.save();
            }
        }
    
        const blogReactionCount = await this.getReactionCounts(blog._id.toString());
        return { reactions: blogReactionCount };
    }
    
    async deleteBlog(slug:string,req:any){
        const blog = await this.blogModel.findOne({slug});
        if(!blog){
            throw new NotFoundException('Blog not found');
        }
        if(blog.author.toString() !== req.user._id.toString() && req.user.role !== RoleCode.ADMIN){
            throw new ForbiddenException('You are not authorized to delete this blog');
        }
        await this.blogModel.findByIdAndDelete(blog._id);
        return {message:'Blog deleted successfully'};
    }

    async getBlogsAdmin(query: BlogQueryDto) {
            const {
                title,
                category,
                page = 1,
                limit = 10
            } = query;
    
            const pageLimit = Math.min(Number(limit) || 50);
            const currentPage = Math.max(1, Number(page) || 1);
            const skip = (currentPage - 1) * pageLimit;
    
            let mongoQuery: any = {};
    
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
    
            const total = await this.blogModel.countDocuments(mongoQuery);
            const blogs = await this.blogModel
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
        }
    
    
}