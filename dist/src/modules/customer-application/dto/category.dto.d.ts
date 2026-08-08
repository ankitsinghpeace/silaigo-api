export declare class UpdateCategoryDto {
    id?: number;
    name?: string;
    isActive?: boolean;
    isVisibleOnHomePage?: boolean;
    imageUrl?: string;
    description?: string;
    label?: {
        type: string;
        title: string;
        color?: string;
    };
}
