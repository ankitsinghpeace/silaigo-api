export declare class MetaMasterDto {
    type: string;
    subType: string;
    label: string;
    value?: any;
    isActive?: boolean;
    color: string;
}
export declare class GetMetaMasterListDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: 'newest' | 'oldest';
    type?: string;
}
