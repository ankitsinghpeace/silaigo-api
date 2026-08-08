import { BlogsService } from '../services/blogs.service';
import { CreateBlogDto, BlogQueryDto, BlogReactionDto } from '../dto/blog.dto';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    getBlogs(query: BlogQueryDto): Promise<{
        blogs: (import("mongoose").FlattenMaps<{
            _id?: string | undefined;
            title: string;
            content: string;
            category: string;
            featuredImage: string;
            author: import("mongoose").Types.ObjectId;
            reactions: import("mongoose").Types.ObjectId[];
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
    getBlogsAdmin(query: BlogQueryDto): Promise<{
        blogs: (import("mongoose").FlattenMaps<{
            _id?: string | undefined;
            title: string;
            content: string;
            category: string;
            featuredImage: string;
            author: import("mongoose").Types.ObjectId;
            reactions: import("mongoose").Types.ObjectId[];
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
    getBlogBySlug(slug: string): Promise<{
        reactions: any[];
        _id: string;
        title: string;
        content: string;
        category: string;
        featuredImage: string;
        author: import("mongoose").Types.ObjectId;
        isPublished: boolean;
        __v: number;
    }>;
    createBlog(blogDto: CreateBlogDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IBlog, {}, {}> & import("../../../../core-db/interface").IBlog & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    updateBlog(slug: string, blogDto: CreateBlogDto, req: any): Promise<(import("mongoose").Document<unknown, {}, import("../../../../core-db/interface").IBlog, {}, {}> & import("../../../../core-db/interface").IBlog & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    deleteBlog(slug: string, req: any): Promise<{
        message: string;
    }>;
    addReaction(reactionDto: BlogReactionDto, req: any): Promise<{
        reactions: any[];
    }>;
}
