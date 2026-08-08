declare const subCategories: ({
    SubCategories: {
        name: string;
        image: string;
        description: string;
        keyAttributes: string[];
    }[];
} | {
    SubCategories: {
        name: string;
        image: string;
        description: string;
        keyAttributes: string[];
    }[][];
})[];
export default subCategories;
