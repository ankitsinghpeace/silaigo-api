export declare const pageSections: ({
    type: string;
    data: {
        achievements: {
            icon: string;
            value: string;
            label: string;
            isActive: boolean;
        }[];
    };
} | {
    type: string;
    data: {
        fnq: {
            isActive: boolean;
            question: string;
            answer: string;
        }[];
    };
} | {
    type: string;
    data: {
        hero: {
            isActive: boolean;
            lgImage: string;
            mdImage: string;
            smImage: string;
            title: string;
            subtitle: string;
        }[];
    };
} | {
    type: string;
    data: {
        title: string;
        subtitle: string;
        steps: {
            isActive: boolean;
            title: string;
            imageUrl: string;
            description: string;
        }[];
    };
} | {
    page: string;
    type: string;
    data: {
        name: string;
        logo: string;
        items: {
            name: string;
            href: string;
        }[];
    };
} | {
    type: string;
    data: {
        partners: {
            isActive: boolean;
            name: string;
            logo: string;
        }[];
    };
} | {
    type: string;
    data: {
        testimonials: {
            isActive: boolean;
            name: string;
            role: string;
            avatar: string;
            quote: string;
            rating: number;
        }[];
    };
} | {
    type: string;
    data: {
        videos: {
            isActive: boolean;
            title: string;
            thumbnail: string;
            videoUrl: string;
            description: string;
        }[];
    };
})[];
