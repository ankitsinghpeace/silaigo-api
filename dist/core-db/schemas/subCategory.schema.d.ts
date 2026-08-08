import { Schema } from 'mongoose';
export declare const SubCategoryItemSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    minimize: true;
}, {
    name: string;
    image: string;
    keyAttributes: string[];
    description?: string | null | undefined;
    discountedPrice?: number | null | undefined;
    price?: number | null | undefined;
    label?: any;
    rank?: number | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    image: string;
    keyAttributes: string[];
    description?: string | null | undefined;
    discountedPrice?: number | null | undefined;
    price?: number | null | undefined;
    label?: any;
    rank?: number | null | undefined;
}>, {}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    minimize: true;
}>> & import("mongoose").FlatRecord<{
    name: string;
    image: string;
    keyAttributes: string[];
    description?: string | null | undefined;
    discountedPrice?: number | null | undefined;
    price?: number | null | undefined;
    label?: any;
    rank?: number | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const SubCategorySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    categoryId: number;
    SubCategories: import("mongoose").Types.DocumentArray<{
        name: string;
        image: string;
        keyAttributes: string[];
        description?: string | null | undefined;
        discountedPrice?: number | null | undefined;
        price?: number | null | undefined;
        label?: any;
        rank?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        name: string;
        image: string;
        keyAttributes: string[];
        description?: string | null | undefined;
        discountedPrice?: number | null | undefined;
        price?: number | null | undefined;
        label?: any;
        rank?: number | null | undefined;
    }> & {
        name: string;
        image: string;
        keyAttributes: string[];
        description?: string | null | undefined;
        discountedPrice?: number | null | undefined;
        price?: number | null | undefined;
        label?: any;
        rank?: number | null | undefined;
    }>;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    categoryId: number;
    SubCategories: import("mongoose").Types.DocumentArray<{
        name: string;
        image: string;
        keyAttributes: string[];
        description?: string | null | undefined;
        discountedPrice?: number | null | undefined;
        price?: number | null | undefined;
        label?: any;
        rank?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        name: string;
        image: string;
        keyAttributes: string[];
        description?: string | null | undefined;
        discountedPrice?: number | null | undefined;
        price?: number | null | undefined;
        label?: any;
        rank?: number | null | undefined;
    }> & {
        name: string;
        image: string;
        keyAttributes: string[];
        description?: string | null | undefined;
        discountedPrice?: number | null | undefined;
        price?: number | null | undefined;
        label?: any;
        rank?: number | null | undefined;
    }>;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    categoryId: number;
    SubCategories: import("mongoose").Types.DocumentArray<{
        name: string;
        image: string;
        keyAttributes: string[];
        description?: string | null | undefined;
        discountedPrice?: number | null | undefined;
        price?: number | null | undefined;
        label?: any;
        rank?: number | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        name: string;
        image: string;
        keyAttributes: string[];
        description?: string | null | undefined;
        discountedPrice?: number | null | undefined;
        price?: number | null | undefined;
        label?: any;
        rank?: number | null | undefined;
    }> & {
        name: string;
        image: string;
        keyAttributes: string[];
        description?: string | null | undefined;
        discountedPrice?: number | null | undefined;
        price?: number | null | undefined;
        label?: any;
        rank?: number | null | undefined;
    }>;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
