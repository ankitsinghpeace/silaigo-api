import { Schema } from 'mongoose';
export declare const labelSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: false;
}, {
    name: string;
    title: string;
    color?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    title: string;
    color?: string | null | undefined;
}>, {}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    _id: false;
}>> & import("mongoose").FlatRecord<{
    name: string;
    title: string;
    color?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const OptionsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: true;
}, {
    title: string;
    discountedPrice: string;
    price: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    title: string;
    discountedPrice: string;
    price: string;
}>, {}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    _id: true;
}>> & import("mongoose").FlatRecord<{
    title: string;
    discountedPrice: string;
    price: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const CategorySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    options: import("mongoose").Types.DocumentArray<{
        title: string;
        discountedPrice: string;
        price: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title: string;
        discountedPrice: string;
        price: string;
    }> & {
        title: string;
        discountedPrice: string;
        price: string;
    }>;
    isActive: boolean;
    isVisibleOnHomePage: boolean;
    imageUrl: string;
    id?: number | null | undefined;
    description?: string | null | undefined;
    label?: {
        name: string;
        title: string;
        color?: string | null | undefined;
    } | null | undefined;
    rank?: number | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    options: import("mongoose").Types.DocumentArray<{
        title: string;
        discountedPrice: string;
        price: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title: string;
        discountedPrice: string;
        price: string;
    }> & {
        title: string;
        discountedPrice: string;
        price: string;
    }>;
    isActive: boolean;
    isVisibleOnHomePage: boolean;
    imageUrl: string;
    id?: number | null | undefined;
    description?: string | null | undefined;
    label?: {
        name: string;
        title: string;
        color?: string | null | undefined;
    } | null | undefined;
    rank?: number | null | undefined;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    name: string;
    options: import("mongoose").Types.DocumentArray<{
        title: string;
        discountedPrice: string;
        price: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title: string;
        discountedPrice: string;
        price: string;
    }> & {
        title: string;
        discountedPrice: string;
        price: string;
    }>;
    isActive: boolean;
    isVisibleOnHomePage: boolean;
    imageUrl: string;
    id?: number | null | undefined;
    description?: string | null | undefined;
    label?: {
        name: string;
        title: string;
        color?: string | null | undefined;
    } | null | undefined;
    rank?: number | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const CategoryModel: import("mongoose").Model<{
    name: string;
    options: import("mongoose").Types.DocumentArray<{
        title: string;
        discountedPrice: string;
        price: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title: string;
        discountedPrice: string;
        price: string;
    }> & {
        title: string;
        discountedPrice: string;
        price: string;
    }>;
    isActive: boolean;
    isVisibleOnHomePage: boolean;
    imageUrl: string;
    id?: number | null | undefined;
    description?: string | null | undefined;
    label?: {
        name: string;
        title: string;
        color?: string | null | undefined;
    } | null | undefined;
    rank?: number | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    name: string;
    options: import("mongoose").Types.DocumentArray<{
        title: string;
        discountedPrice: string;
        price: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title: string;
        discountedPrice: string;
        price: string;
    }> & {
        title: string;
        discountedPrice: string;
        price: string;
    }>;
    isActive: boolean;
    isVisibleOnHomePage: boolean;
    imageUrl: string;
    id?: number | null | undefined;
    description?: string | null | undefined;
    label?: {
        name: string;
        title: string;
        color?: string | null | undefined;
    } | null | undefined;
    rank?: number | null | undefined;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    name: string;
    options: import("mongoose").Types.DocumentArray<{
        title: string;
        discountedPrice: string;
        price: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title: string;
        discountedPrice: string;
        price: string;
    }> & {
        title: string;
        discountedPrice: string;
        price: string;
    }>;
    isActive: boolean;
    isVisibleOnHomePage: boolean;
    imageUrl: string;
    id?: number | null | undefined;
    description?: string | null | undefined;
    label?: {
        name: string;
        title: string;
        color?: string | null | undefined;
    } | null | undefined;
    rank?: number | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    options: import("mongoose").Types.DocumentArray<{
        title: string;
        discountedPrice: string;
        price: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title: string;
        discountedPrice: string;
        price: string;
    }> & {
        title: string;
        discountedPrice: string;
        price: string;
    }>;
    isActive: boolean;
    isVisibleOnHomePage: boolean;
    imageUrl: string;
    id?: number | null | undefined;
    description?: string | null | undefined;
    label?: {
        name: string;
        title: string;
        color?: string | null | undefined;
    } | null | undefined;
    rank?: number | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    options: import("mongoose").Types.DocumentArray<{
        title: string;
        discountedPrice: string;
        price: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title: string;
        discountedPrice: string;
        price: string;
    }> & {
        title: string;
        discountedPrice: string;
        price: string;
    }>;
    isActive: boolean;
    isVisibleOnHomePage: boolean;
    imageUrl: string;
    id?: number | null | undefined;
    description?: string | null | undefined;
    label?: {
        name: string;
        title: string;
        color?: string | null | undefined;
    } | null | undefined;
    rank?: number | null | undefined;
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    name: string;
    options: import("mongoose").Types.DocumentArray<{
        title: string;
        discountedPrice: string;
        price: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title: string;
        discountedPrice: string;
        price: string;
    }> & {
        title: string;
        discountedPrice: string;
        price: string;
    }>;
    isActive: boolean;
    isVisibleOnHomePage: boolean;
    imageUrl: string;
    id?: number | null | undefined;
    description?: string | null | undefined;
    label?: {
        name: string;
        title: string;
        color?: string | null | undefined;
    } | null | undefined;
    rank?: number | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
