import { ICategoryLandingConfig } from 'core-db/interface';
import { Schema, Types } from 'mongoose';
interface ICustomizationOption {
    enabled: boolean;
    optionIds?: Types.ObjectId[];
}
interface ICustomizationOptions {
    neck: ICustomizationOption;
    sleeve: ICustomizationOption;
    backNeck: {
        enabled: boolean;
    };
    addOns: {
        enabled: boolean;
    };
    accessories: {
        enabled: boolean;
    };
    options: {
        enabled: boolean;
    };
}
export declare const CustomizationOptionsSchema: Schema<ICustomizationOptions, import("mongoose").Model<ICustomizationOptions, any, any, any, import("mongoose").Document<unknown, any, ICustomizationOptions, any, {}> & ICustomizationOptions & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ICustomizationOptions, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ICustomizationOptions>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ICustomizationOptions> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const CategoryLandingConfigSchema: Schema<ICategoryLandingConfig, import("mongoose").Model<ICategoryLandingConfig, any, any, any, import("mongoose").Document<unknown, any, ICategoryLandingConfig, any, {}> & ICategoryLandingConfig & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ICategoryLandingConfig, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ICategoryLandingConfig>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ICategoryLandingConfig> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const CategoryLandingConfigModel: import("mongoose").Model<ICategoryLandingConfig, {}, {}, {}, import("mongoose").Document<unknown, {}, ICategoryLandingConfig, {}, {}> & ICategoryLandingConfig & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export {};
