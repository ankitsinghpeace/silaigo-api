import { Schema } from 'mongoose';
export declare const ModelMetadata: {
    User: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            email: string;
            passwordHash: string;
            empId: string;
            firstName: string;
            gender: import("core-db/schemas/profile.schema").Gender;
            joiningDate: NativeDate;
            designation: string;
            role: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            createdAt: NativeDate;
            lastName?: string | null | undefined;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            email: string;
            passwordHash: string;
            empId: string;
            firstName: string;
            gender: import("core-db/schemas/profile.schema").Gender;
            joiningDate: NativeDate;
            designation: string;
            role: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            createdAt: NativeDate;
            lastName?: string | null | undefined;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            email: string;
            passwordHash: string;
            empId: string;
            firstName: string;
            gender: import("core-db/schemas/profile.schema").Gender;
            joiningDate: NativeDate;
            designation: string;
            role: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            createdAt: NativeDate;
            lastName?: string | null | undefined;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Profile: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            firstName: string;
            gender: import("core-db/schemas/profile.schema").Gender;
            createdAt: NativeDate;
            phone?: string | null | undefined;
            email?: string | null | undefined;
            lastName?: string | null | undefined;
            birthDate?: NativeDate | null | undefined;
            referralCode?: string | null | undefined;
            referredBy?: string | null | undefined;
            notes?: string | null | undefined;
            colorCode?: string | null | undefined;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            firstName: string;
            gender: import("core-db/schemas/profile.schema").Gender;
            createdAt: NativeDate;
            phone?: string | null | undefined;
            email?: string | null | undefined;
            lastName?: string | null | undefined;
            birthDate?: NativeDate | null | undefined;
            referralCode?: string | null | undefined;
            referredBy?: string | null | undefined;
            notes?: string | null | undefined;
            colorCode?: string | null | undefined;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            firstName: string;
            gender: import("core-db/schemas/profile.schema").Gender;
            createdAt: NativeDate;
            phone?: string | null | undefined;
            email?: string | null | undefined;
            lastName?: string | null | undefined;
            birthDate?: NativeDate | null | undefined;
            referralCode?: string | null | undefined;
            referredBy?: string | null | undefined;
            notes?: string | null | undefined;
            colorCode?: string | null | undefined;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Address: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            isDefault: boolean;
            addressLine1?: string | null | undefined;
            addressLine2?: string | null | undefined;
            city?: string | null | undefined;
            state?: string | null | undefined;
            pincode?: string | null | undefined;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            isDefault: boolean;
            addressLine1?: string | null | undefined;
            addressLine2?: string | null | undefined;
            city?: string | null | undefined;
            state?: string | null | undefined;
            pincode?: string | null | undefined;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            isDefault: boolean;
            addressLine1?: string | null | undefined;
            addressLine2?: string | null | undefined;
            city?: string | null | undefined;
            state?: string | null | undefined;
            pincode?: string | null | undefined;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Appointment: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            date: NativeDate;
            createdAt: NativeDate;
            time: string;
            status: "BOOKED" | "CANCELLED";
            order?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            notes?: string | null | undefined;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            date: NativeDate;
            createdAt: NativeDate;
            time: string;
            status: "BOOKED" | "CANCELLED";
            order?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            notes?: string | null | undefined;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            date: NativeDate;
            createdAt: NativeDate;
            time: string;
            status: "BOOKED" | "CANCELLED";
            order?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            notes?: string | null | undefined;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Availability: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            date: NativeDate;
            type: "HOLIDAY" | "CUSTOM";
            createdAt: NativeDate;
            slots: Map<string, {
                isBlocked: boolean;
                maxAppointments?: number | null | undefined;
            }>;
            workingHours?: {
                startTime?: string | null | undefined;
                endTime?: string | null | undefined;
            } | null | undefined;
            reason?: string | null | undefined;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            date: NativeDate;
            type: "HOLIDAY" | "CUSTOM";
            createdAt: NativeDate;
            slots: Map<string, {
                isBlocked: boolean;
                maxAppointments?: number | null | undefined;
            }>;
            workingHours?: {
                startTime?: string | null | undefined;
                endTime?: string | null | undefined;
            } | null | undefined;
            reason?: string | null | undefined;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            date: NativeDate;
            type: "HOLIDAY" | "CUSTOM";
            createdAt: NativeDate;
            slots: Map<string, {
                isBlocked: boolean;
                maxAppointments?: number | null | undefined;
            }>;
            workingHours?: {
                startTime?: string | null | undefined;
                endTime?: string | null | undefined;
            } | null | undefined;
            reason?: string | null | undefined;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Category: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
        collection: string;
        token: string;
    };
    SubCategory: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
        collection: string;
        token: string;
    };
    Customization: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            type: string;
            options: import("mongoose").Types.DocumentArray<{
                title: string;
                discountedPrice: number;
                price: number;
                complexity: import("./enums").CustomizationComplexity;
                _id?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                imageUrl?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<{
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
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
                complexity: import("./enums").CustomizationComplexity;
                _id?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
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
                complexity: import("./enums").CustomizationComplexity;
                _id?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
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
            options: import("mongoose").Types.DocumentArray<{
                title: string;
                discountedPrice: number;
                price: number;
                complexity: import("./enums").CustomizationComplexity;
                _id?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                imageUrl?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<{
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
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
                complexity: import("./enums").CustomizationComplexity;
                _id?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
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
                complexity: import("./enums").CustomizationComplexity;
                _id?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
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
            options: import("mongoose").Types.DocumentArray<{
                title: string;
                discountedPrice: number;
                price: number;
                complexity: import("./enums").CustomizationComplexity;
                _id?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                imageUrl?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<{
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
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
                complexity: import("./enums").CustomizationComplexity;
                _id?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
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
                complexity: import("./enums").CustomizationComplexity;
                _id?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
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
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    CustomizationOptionMapping: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            categoryId: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            customizationType: string;
            optionIds: string[];
            subCategoryIds: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            }[];
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            categoryId: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            customizationType: string;
            optionIds: string[];
            subCategoryIds: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            }[];
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            categoryId: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            customizationType: string;
            optionIds: string[];
            subCategoryIds: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            }[];
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    MetaMaster: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            type: string;
            label: string;
            isActive: boolean;
            subType: string;
            value?: any;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            type: string;
            label: string;
            isActive: boolean;
            subType: string;
            value?: any;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            type: string;
            label: string;
            isActive: boolean;
            subType: string;
            value?: any;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Metrics: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            actionType: import("./enums").ActionType;
            page: string;
            timestamp: NativeDate;
            profile?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            targetType?: import("./enums").TargetType | null | undefined;
            targetId?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            targetTitle?: string | null | undefined;
            additionalData?: any;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            actionType: import("./enums").ActionType;
            page: string;
            timestamp: NativeDate;
            profile?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            targetType?: import("./enums").TargetType | null | undefined;
            targetId?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            targetTitle?: string | null | undefined;
            additionalData?: any;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            actionType: import("./enums").ActionType;
            page: string;
            timestamp: NativeDate;
            profile?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            targetType?: import("./enums").TargetType | null | undefined;
            targetId?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            targetTitle?: string | null | undefined;
            additionalData?: any;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Order: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            createdAt: NativeDate;
            status: string;
            items: import("mongoose").Types.DocumentArray<{
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }> & {
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }>;
            orderProcessingState: import("./enums").OrderProcessingState;
            imageUrls: string[];
            timeLine: import("mongoose").Types.DocumentArray<{
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }> & {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }>;
            payment?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            notes?: string | null | undefined;
            isPinned?: boolean | null | undefined;
            appointment?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            customPrice?: number | null | undefined;
            addressId?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            measurements?: any;
            pinPosition?: number | null | undefined;
            assignedToStitchingAgentId?: import("mongoose").Types.ObjectId | null | undefined;
            paymentStatus?: "PAID" | "UNPAID" | "PARTIALLY_PAID" | null | undefined;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            createdAt: NativeDate;
            status: string;
            items: import("mongoose").Types.DocumentArray<{
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }> & {
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }>;
            orderProcessingState: import("./enums").OrderProcessingState;
            imageUrls: string[];
            timeLine: import("mongoose").Types.DocumentArray<{
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }> & {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }>;
            payment?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            notes?: string | null | undefined;
            isPinned?: boolean | null | undefined;
            appointment?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            customPrice?: number | null | undefined;
            addressId?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            measurements?: any;
            pinPosition?: number | null | undefined;
            assignedToStitchingAgentId?: import("mongoose").Types.ObjectId | null | undefined;
            paymentStatus?: "PAID" | "UNPAID" | "PARTIALLY_PAID" | null | undefined;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            createdAt: NativeDate;
            status: string;
            items: import("mongoose").Types.DocumentArray<{
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }> & {
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }>;
            orderProcessingState: import("./enums").OrderProcessingState;
            imageUrls: string[];
            timeLine: import("mongoose").Types.DocumentArray<{
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }> & {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }>;
            payment?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            notes?: string | null | undefined;
            isPinned?: boolean | null | undefined;
            appointment?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            customPrice?: number | null | undefined;
            addressId?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            measurements?: any;
            pinPosition?: number | null | undefined;
            assignedToStitchingAgentId?: import("mongoose").Types.ObjectId | null | undefined;
            paymentStatus?: "PAID" | "UNPAID" | "PARTIALLY_PAID" | null | undefined;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    PageSection: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            type: import("./enums").PageSectionType;
            data: any;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            type: import("./enums").PageSectionType;
            data: any;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            type: import("./enums").PageSectionType;
            data: any;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Payment: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            order: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            createdAt: NativeDate;
            status: import("./enums").PaymentStatus;
            amount: number;
            priceBreakup: import("mongoose").Types.DocumentArray<{
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }> & {
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }>;
            method?: import("./enums").PaymentMethodType | null | undefined;
            razorpayPaymentId?: string | null | undefined;
            paymentMethod?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            discountedAmount?: number | null | undefined;
            coupon?: string | null | undefined;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            order: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            createdAt: NativeDate;
            status: import("./enums").PaymentStatus;
            amount: number;
            priceBreakup: import("mongoose").Types.DocumentArray<{
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }> & {
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }>;
            method?: import("./enums").PaymentMethodType | null | undefined;
            razorpayPaymentId?: string | null | undefined;
            paymentMethod?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            discountedAmount?: number | null | undefined;
            coupon?: string | null | undefined;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            order: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            createdAt: NativeDate;
            status: import("./enums").PaymentStatus;
            amount: number;
            priceBreakup: import("mongoose").Types.DocumentArray<{
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }> & {
                options: import("mongoose").Types.DocumentArray<{
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    categoryId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                subCategory: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
                customizations: import("mongoose").Types.DocumentArray<{
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }> & {
                    type?: string | null | undefined;
                    optionId?: {
                        prototype?: import("mongoose").Types.ObjectId | null | undefined;
                        cacheHexString?: unknown;
                        generate?: {} | null | undefined;
                        createFromTime?: {} | null | undefined;
                        createFromHexString?: {} | null | undefined;
                        createFromBase64?: {} | null | undefined;
                        isValid?: {} | null | undefined;
                    } | null | undefined;
                }>;
                notes?: string | null | undefined;
                subCategoryStyleId?: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                } | null | undefined;
                orderId?: string | null | undefined;
            }>;
            method?: import("./enums").PaymentMethodType | null | undefined;
            razorpayPaymentId?: string | null | undefined;
            paymentMethod?: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            } | null | undefined;
            discountedAmount?: number | null | undefined;
            coupon?: string | null | undefined;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    PaymentMethod: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            createdAt: NativeDate;
            methodType: import("./enums").PaymentMethodType;
            token: string;
            cardType?: string | null | undefined;
            last4?: string | null | undefined;
            expiryMonth?: number | null | undefined;
            expiryYear?: number | null | undefined;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            createdAt: NativeDate;
            methodType: import("./enums").PaymentMethodType;
            token: string;
            cardType?: string | null | undefined;
            last4?: string | null | undefined;
            expiryMonth?: number | null | undefined;
            expiryYear?: number | null | undefined;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            createdAt: NativeDate;
            methodType: import("./enums").PaymentMethodType;
            token: string;
            cardType?: string | null | undefined;
            last4?: string | null | undefined;
            expiryMonth?: number | null | undefined;
            expiryYear?: number | null | undefined;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Query: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            id: number;
            createdAt: NativeDate;
            status: import("./enums").QueryStatus;
            user?: import("mongoose").Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            id: number;
            createdAt: NativeDate;
            status: import("./enums").QueryStatus;
            user?: import("mongoose").Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            id: number;
            createdAt: NativeDate;
            status: import("./enums").QueryStatus;
            user?: import("mongoose").Types.ObjectId | null | undefined;
            message?: string | null | undefined;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Role: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            name: string;
            createdAt: NativeDate;
            code: import("./enums").RoleCode;
            permissions: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            }[];
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            name: string;
            createdAt: NativeDate;
            code: import("./enums").RoleCode;
            permissions: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            }[];
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            name: string;
            createdAt: NativeDate;
            code: import("./enums").RoleCode;
            permissions: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            }[];
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Permission: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            type: import("./enums").PermissionType;
            createdAt: NativeDate;
            subType: import("./enums").PermissionSubType;
            description?: string | null | undefined;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            type: import("./enums").PermissionType;
            createdAt: NativeDate;
            subType: import("./enums").PermissionSubType;
            description?: string | null | undefined;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            type: import("./enums").PermissionType;
            createdAt: NativeDate;
            subType: import("./enums").PermissionSubType;
            description?: string | null | undefined;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Schedule: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            name: string;
            createdAt: NativeDate;
            isActive: boolean;
            workingDays: string[];
            slotIntervalMinutes: number;
            maxAppointmentsPerSlot: number;
            dailyHours?: {
                startTime: string;
                endTime: string;
            } | null | undefined;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            name: string;
            createdAt: NativeDate;
            isActive: boolean;
            workingDays: string[];
            slotIntervalMinutes: number;
            maxAppointmentsPerSlot: number;
            dailyHours?: {
                startTime: string;
                endTime: string;
            } | null | undefined;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            name: string;
            createdAt: NativeDate;
            isActive: boolean;
            workingDays: string[];
            slotIntervalMinutes: number;
            maxAppointmentsPerSlot: number;
            dailyHours?: {
                startTime: string;
                endTime: string;
            } | null | undefined;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Blog: {
        schema: any;
        collection: string;
        token: string;
    };
    BlogReaction: {
        schema: any;
        collection: string;
        token: string;
    };
    PhoneCallScheduler: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
            timestamps: true;
        }, {
            category: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            appointmentDate: NativeDate;
            callStatus: import("./enums/phoneCall.scheduler.status").PhoneCallStatus;
            orderInitiationStatus: import("./enums/phoneCall.scheduler.status").OrderInitiationStatus;
            notes?: string | null | undefined;
        } & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            category: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            appointmentDate: NativeDate;
            callStatus: import("./enums/phoneCall.scheduler.status").PhoneCallStatus;
            orderInitiationStatus: import("./enums/phoneCall.scheduler.status").OrderInitiationStatus;
            notes?: string | null | undefined;
        } & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
            timestamps: true;
        }>> & import("mongoose").FlatRecord<{
            category: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            profile: {
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
            appointmentDate: NativeDate;
            callStatus: import("./enums/phoneCall.scheduler.status").PhoneCallStatus;
            orderInitiationStatus: import("./enums/phoneCall.scheduler.status").OrderInitiationStatus;
            notes?: string | null | undefined;
        } & import("mongoose").DefaultTimestampProps> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    IdentityCounters: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            field: string;
            modelName: string;
            count: number;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            field: string;
            modelName: string;
            count: number;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            field: string;
            modelName: string;
            count: number;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    MeasurementCategory: {
        schema: Schema<import("./interface").IMeasurementCategory, import("mongoose").Model<import("./interface").IMeasurementCategory, any, any, any, import("mongoose").Document<unknown, any, import("./interface").IMeasurementCategory, any, {}> & import("./interface").IMeasurementCategory & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, import("./interface").IMeasurementCategory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<import("./interface").IMeasurementCategory>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<import("./interface").IMeasurementCategory> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    MeasurementField: {
        schema: Schema<import("./interface").IMeasurementField, import("mongoose").Model<import("./interface").IMeasurementField, any, any, any, import("mongoose").Document<unknown, any, import("./interface").IMeasurementField, any, {}> & import("./interface").IMeasurementField & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, import("./interface").IMeasurementField, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<import("./interface").IMeasurementField>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<import("./interface").IMeasurementField> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    OrderEventsOptions: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            options: import("mongoose").Types.DocumentArray<{
                label: string;
                inputRequired: boolean;
                repeatable: boolean;
                type?: "checkbox" | "action" | "input" | "dropdown" | null | undefined;
                inputType?: "text" | "select" | "textarea" | null | undefined;
                dataSource?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            options: import("mongoose").Types.DocumentArray<{
                label: string;
                inputRequired: boolean;
                repeatable: boolean;
                type?: "checkbox" | "action" | "input" | "dropdown" | null | undefined;
                inputType?: "text" | "select" | "textarea" | null | undefined;
                dataSource?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            options: import("mongoose").Types.DocumentArray<{
                label: string;
                inputRequired: boolean;
                repeatable: boolean;
                type?: "checkbox" | "action" | "input" | "dropdown" | null | undefined;
                inputType?: "text" | "select" | "textarea" | null | undefined;
                dataSource?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                prototype?: import("mongoose").Types.ObjectId | null | undefined;
                cacheHexString?: unknown;
                generate?: {} | null | undefined;
                createFromTime?: {} | null | undefined;
                createFromHexString?: {} | null | undefined;
                createFromBase64?: {} | null | undefined;
                isValid?: {} | null | undefined;
            };
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    OrderMicroEvents: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            orderId: import("mongoose").Types.ObjectId;
            roleId: import("mongoose").Types.ObjectId;
            events: import("mongoose").Types.DocumentArray<{
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: import("mongoose").Types.ObjectId;
                key: string;
                value?: any;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: import("mongoose").Types.ObjectId;
                key: string;
                value?: any;
            }> & {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: import("mongoose").Types.ObjectId;
                key: string;
                value?: any;
            }>;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            orderId: import("mongoose").Types.ObjectId;
            roleId: import("mongoose").Types.ObjectId;
            events: import("mongoose").Types.DocumentArray<{
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: import("mongoose").Types.ObjectId;
                key: string;
                value?: any;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: import("mongoose").Types.ObjectId;
                key: string;
                value?: any;
            }> & {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: import("mongoose").Types.ObjectId;
                key: string;
                value?: any;
            }>;
        }>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<{
            orderId: import("mongoose").Types.ObjectId;
            roleId: import("mongoose").Types.ObjectId;
            events: import("mongoose").Types.DocumentArray<{
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: import("mongoose").Types.ObjectId;
                key: string;
                value?: any;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: import("mongoose").Types.ObjectId;
                key: string;
                value?: any;
            }> & {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: import("mongoose").Types.ObjectId;
                key: string;
                value?: any;
            }>;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    MaterialPickup: {
        schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
            timestamps: true;
        }, {
            firstName: string;
            options: import("mongoose").Types.DocumentArray<{
                type: string;
                label: string;
                value: boolean;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                type: string;
                label: string;
                value: boolean;
            }> & {
                type: string;
                label: string;
                value: boolean;
            }>;
            timeline: import("mongoose").Types.DocumentArray<{
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }> & {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }>;
            phone?: string | null | undefined;
            lastName?: string | null | undefined;
            addressLine1?: string | null | undefined;
            addressLine2?: string | null | undefined;
            city?: string | null | undefined;
            state?: string | null | undefined;
            pincode?: string | null | undefined;
            pickupFor?: string | null | undefined;
            scheduledPickupDate?: string | null | undefined;
            scheduledPickupTime?: string | null | undefined;
        } & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            firstName: string;
            options: import("mongoose").Types.DocumentArray<{
                type: string;
                label: string;
                value: boolean;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                type: string;
                label: string;
                value: boolean;
            }> & {
                type: string;
                label: string;
                value: boolean;
            }>;
            timeline: import("mongoose").Types.DocumentArray<{
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }> & {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }>;
            phone?: string | null | undefined;
            lastName?: string | null | undefined;
            addressLine1?: string | null | undefined;
            addressLine2?: string | null | undefined;
            city?: string | null | undefined;
            state?: string | null | undefined;
            pincode?: string | null | undefined;
            pickupFor?: string | null | undefined;
            scheduledPickupDate?: string | null | undefined;
            scheduledPickupTime?: string | null | undefined;
        } & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
            timestamps: true;
        }>> & import("mongoose").FlatRecord<{
            firstName: string;
            options: import("mongoose").Types.DocumentArray<{
                type: string;
                label: string;
                value: boolean;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                type: string;
                label: string;
                value: boolean;
            }> & {
                type: string;
                label: string;
                value: boolean;
            }>;
            timeline: import("mongoose").Types.DocumentArray<{
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }> & {
                status: string;
                timeStamp: NativeDate;
                updatedBy: string;
                updatedByUserId: {
                    prototype?: import("mongoose").Types.ObjectId | null | undefined;
                    cacheHexString?: unknown;
                    generate?: {} | null | undefined;
                    createFromTime?: {} | null | undefined;
                    createFromHexString?: {} | null | undefined;
                    createFromBase64?: {} | null | undefined;
                    isValid?: {} | null | undefined;
                };
            }>;
            phone?: string | null | undefined;
            lastName?: string | null | undefined;
            addressLine1?: string | null | undefined;
            addressLine2?: string | null | undefined;
            city?: string | null | undefined;
            state?: string | null | undefined;
            pincode?: string | null | undefined;
            pickupFor?: string | null | undefined;
            scheduledPickupDate?: string | null | undefined;
            scheduledPickupTime?: string | null | undefined;
        } & import("mongoose").DefaultTimestampProps> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    Location: {
        schema: Schema<import("./interface").ILocation, import("mongoose").Model<import("./interface").ILocation, any, any, any, import("mongoose").Document<unknown, any, import("./interface").ILocation, any, {}> & import("./interface").ILocation & Required<{
            _id: string;
        }> & {
            __v: number;
        }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, import("./interface").ILocation, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<import("./interface").ILocation>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<import("./interface").ILocation> & Required<{
            _id: string;
        }> & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    LocationCategory: {
        schema: Schema<import("./interface").ILocationCategory, import("mongoose").Model<import("./interface").ILocationCategory, any, any, any, import("mongoose").Document<unknown, any, import("./interface").ILocationCategory, any, {}> & import("./interface").ILocationCategory & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, import("./interface").ILocationCategory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<import("./interface").ILocationCategory>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<import("./interface").ILocationCategory> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
    CategoryLandingConfig: {
        schema: Schema<import("./interface").ICategoryLandingConfig, import("mongoose").Model<import("./interface").ICategoryLandingConfig, any, any, any, import("mongoose").Document<unknown, any, import("./interface").ICategoryLandingConfig, any, {}> & import("./interface").ICategoryLandingConfig & Required<{
            _id: string;
        }> & {
            __v: number;
        }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, import("./interface").ICategoryLandingConfig, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<import("./interface").ICategoryLandingConfig>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<import("./interface").ICategoryLandingConfig> & Required<{
            _id: string;
        }> & {
            __v: number;
        }>;
        collection: string;
        token: string;
    };
};
