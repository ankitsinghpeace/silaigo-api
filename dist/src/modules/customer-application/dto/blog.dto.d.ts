import { BlogReactionType } from 'core-db/schemas/blogReactions.schema';
export declare class CreateBlogDto {
    title: string;
    content: string;
    category: string;
    featuredImage: string;
    author: string;
}
export declare class UpdateBlogDto {
    title?: string;
    content?: string;
    category?: string;
    featuredImage?: string;
    author?: string;
}
export declare class BlogResponseDto {
    _id: string;
    title: string;
    content: string;
    category: string;
    featuredImage: string;
    author: string;
    reactions: string[];
    createdAt: string;
    updatedAt: string;
}
export declare class BlogQueryDto {
    title?: string;
    category?: string;
    author?: string;
    page?: number;
    limit?: number;
}
export declare class BlogReactionDto {
    type: BlogReactionType;
    slug: string;
}
