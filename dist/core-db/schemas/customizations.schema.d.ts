import { Schema, Types } from 'mongoose';
import { CustomizationComplexity } from 'core-db/enums';
export declare const CustomizationOptionSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    title: string;
    discountedPrice: number;
    price: number;
    complexity: CustomizationComplexity;
    _id?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    imageUrl?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    title: string;
    discountedPrice: number;
    price: number;
    complexity: CustomizationComplexity;
    _id?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    imageUrl?: string | null | undefined;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    title: string;
    discountedPrice: number;
    price: number;
    complexity: CustomizationComplexity;
    _id?: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null | undefined;
    imageUrl?: string | null | undefined;
}> & Required<{
    _id: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null;
}> & {
    __v: number;
}>;
export declare const CustomizationSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    type: string;
    options: Types.DocumentArray<{
        title: string;
        discountedPrice: number;
        price: number;
        complexity: CustomizationComplexity;
        _id?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        imageUrl?: string | null | undefined;
    }, Types.Subdocument<{
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null, any, {
        title: string;
        discountedPrice: number;
        price: number;
        complexity: CustomizationComplexity;
        _id?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        imageUrl?: string | null | undefined;
    }> & {
        title: string;
        discountedPrice: number;
        price: number;
        complexity: CustomizationComplexity;
        _id?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        imageUrl?: string | null | undefined;
    }>;
    rank?: number | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    type: string;
    options: Types.DocumentArray<{
        title: string;
        discountedPrice: number;
        price: number;
        complexity: CustomizationComplexity;
        _id?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        imageUrl?: string | null | undefined;
    }, Types.Subdocument<{
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null, any, {
        title: string;
        discountedPrice: number;
        price: number;
        complexity: CustomizationComplexity;
        _id?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        imageUrl?: string | null | undefined;
    }> & {
        title: string;
        discountedPrice: number;
        price: number;
        complexity: CustomizationComplexity;
        _id?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        imageUrl?: string | null | undefined;
    }>;
    rank?: number | null | undefined;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    type: string;
    options: Types.DocumentArray<{
        title: string;
        discountedPrice: number;
        price: number;
        complexity: CustomizationComplexity;
        _id?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        imageUrl?: string | null | undefined;
    }, Types.Subdocument<{
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    } | null, any, {
        title: string;
        discountedPrice: number;
        price: number;
        complexity: CustomizationComplexity;
        _id?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        imageUrl?: string | null | undefined;
    }> & {
        title: string;
        discountedPrice: number;
        price: number;
        complexity: CustomizationComplexity;
        _id?: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        } | null | undefined;
        imageUrl?: string | null | undefined;
    }>;
    rank?: number | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
