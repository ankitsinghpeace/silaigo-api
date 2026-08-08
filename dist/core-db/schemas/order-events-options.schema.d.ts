import { Schema, Types } from 'mongoose';
export declare const OrdersEventsOptionsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    options: Types.DocumentArray<{
        label: string;
        inputRequired: boolean;
        repeatable: boolean;
        type?: "checkbox" | "action" | "input" | "dropdown" | null | undefined;
        inputType?: "text" | "select" | "textarea" | null | undefined;
        dataSource?: string | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        label: string;
        inputRequired: boolean;
        repeatable: boolean;
        type?: "checkbox" | "action" | "input" | "dropdown" | null | undefined;
        inputType?: "text" | "select" | "textarea" | null | undefined;
        dataSource?: string | null | undefined;
    }> & {
        label: string;
        inputRequired: boolean;
        repeatable: boolean;
        type?: "checkbox" | "action" | "input" | "dropdown" | null | undefined;
        inputType?: "text" | "select" | "textarea" | null | undefined;
        dataSource?: string | null | undefined;
    }>;
    roleId: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    options: Types.DocumentArray<{
        label: string;
        inputRequired: boolean;
        repeatable: boolean;
        type?: "checkbox" | "action" | "input" | "dropdown" | null | undefined;
        inputType?: "text" | "select" | "textarea" | null | undefined;
        dataSource?: string | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        label: string;
        inputRequired: boolean;
        repeatable: boolean;
        type?: "checkbox" | "action" | "input" | "dropdown" | null | undefined;
        inputType?: "text" | "select" | "textarea" | null | undefined;
        dataSource?: string | null | undefined;
    }> & {
        label: string;
        inputRequired: boolean;
        repeatable: boolean;
        type?: "checkbox" | "action" | "input" | "dropdown" | null | undefined;
        inputType?: "text" | "select" | "textarea" | null | undefined;
        dataSource?: string | null | undefined;
    }>;
    roleId: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
}>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
    options: Types.DocumentArray<{
        label: string;
        inputRequired: boolean;
        repeatable: boolean;
        type?: "checkbox" | "action" | "input" | "dropdown" | null | undefined;
        inputType?: "text" | "select" | "textarea" | null | undefined;
        dataSource?: string | null | undefined;
    }, Types.Subdocument<import("bson").ObjectId, any, {
        label: string;
        inputRequired: boolean;
        repeatable: boolean;
        type?: "checkbox" | "action" | "input" | "dropdown" | null | undefined;
        inputType?: "text" | "select" | "textarea" | null | undefined;
        dataSource?: string | null | undefined;
    }> & {
        label: string;
        inputRequired: boolean;
        repeatable: boolean;
        type?: "checkbox" | "action" | "input" | "dropdown" | null | undefined;
        inputType?: "text" | "select" | "textarea" | null | undefined;
        dataSource?: string | null | undefined;
    }>;
    roleId: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
