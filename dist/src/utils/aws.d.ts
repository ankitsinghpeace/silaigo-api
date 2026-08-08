export declare const generateUploadUrl: (fileInfo: any) => Promise<{
    url: string;
    key: string;
}>;
export declare const uploadFileToS3: (file: any, fileInfo: any) => Promise<{
    url: string;
}>;
