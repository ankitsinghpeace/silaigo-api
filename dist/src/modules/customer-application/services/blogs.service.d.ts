import mongoose, { Model } from 'mongoose';
import { IBlog, IBlogReaction } from 'core-db/interface';
import { CreateBlogDto, BlogQueryDto, BlogReactionDto } from '../dto/blog.dto';
export declare class BlogsService {
    private readonly blogModel;
    private readonly blogReactionModel;
    constructor(blogModel: Model<IBlog>, blogReactionModel: Model<IBlogReaction>);
    getReactionCounts(blogId: string): Promise<any[]>;
    getBlogs(query: BlogQueryDto): Promise<{
        blogs: (mongoose.FlattenMaps<{
            _id?: string | undefined;
            title: string;
            content: string;
            category: string;
            featuredImage: string;
            author: mongoose.Types.ObjectId;
            reactions: mongoose.Types.ObjectId[];
            isPublished: boolean;
        }> & Required<{
            _id: string;
        }> & {
            __v: number;
        })[];
        pagination: {
            currentPage: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
            total: number;
            count: number;
            limit: number;
            nextPage: number | null;
            prevPage: number | null;
        };
        filters: {
            title: string | undefined;
            category: string | undefined;
        };
    }>;
    createBlog(blogDto: CreateBlogDto, req: any): Promise<mongoose.Document<unknown, {}, IBlog, {}, {}> & IBlog & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    getBlogBySlug(slug: string): Promise<{
        reactions: any[];
        _id: string;
        title: string;
        content: string;
        category: string;
        featuredImage: string;
        author: mongoose.Types.ObjectId;
        isPublished: boolean;
        __v: number;
    }>;
    updateBlog(slug: string, blogDto: CreateBlogDto, req: any): Promise<(mongoose.Document<unknown, {}, IBlog, {}, {}> & IBlog & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    addReaction(reactionDto: BlogReactionDto, req: any): Promise<{
        reactions: any[];
    }>;
    deleteBlog(slug: string, req: any): Promise<{
        message: string;
    }>;
    getBlogsAdmin(query: BlogQueryDto): Promise<{
        blogs: (mongoose.FlattenMaps<{
            _id?: string | undefined;
            title: string;
            content: string;
            category: string;
            featuredImage: string;
            author: mongoose.Types.ObjectId;
            reactions: mongoose.Types.ObjectId[];
            isPublished: boolean;
        }> & Required<{
            _id: string;
        }> & {
            __v: number;
        })[];
        pagination: {
            currentPage: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
            total: number;
            count: number;
            limit: number;
            nextPage: number | null;
            prevPage: number | null;
        };
        filters: {
            title: string | undefined;
            category: string | undefined;
        };
    }>;
}
