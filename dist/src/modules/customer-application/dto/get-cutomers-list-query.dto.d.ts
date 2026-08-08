export declare class GetCustomersQueryListDto {
    next?: string;
    prev?: string;
    limit?: number;
    search?: string;
    email?: string;
    phone?: string;
    gender?: string;
    referredBy?: string;
    hasReferral?: boolean;
    sortBy?: 'newest' | 'oldest';
    startDate?: string;
    endDate?: string;
}
