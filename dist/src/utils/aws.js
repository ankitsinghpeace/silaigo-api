"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToS3 = exports.generateUploadUrl = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const uuid_1 = require("uuid");
const AWS = require("aws-sdk");
const s3 = new client_s3_1.S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const s = new AWS.S3({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const generateUploadUrl = (fileInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resourceName, resourceId, subResourceName, subResourceId, fileType, } = fileInfo;
        const ext = fileType.split('/')[1];
        if (!ext)
            throw new Error('Invalid fileType');
        const uuid = (0, uuid_1.v4)();
        const baseName = subResourceId
            ? `${resourceId}_${subResourceId}_${uuid}`
            : `${resourceId}_${uuid}`;
        const fileName = `${baseName}.${ext}`;
        const keyPrefix = subResourceName
            ? `${resourceName}/${subResourceName}`
            : `${resourceName}`;
        const key = `${keyPrefix}/${fileName}`;
        console.log(key);
        const command = new client_s3_1.PutObjectCommand({
            Bucket: 'mytest0274',
            Key: key,
            ContentType: fileType,
        });
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 300 });
        return { url, key };
    }
    catch (error) {
        console.error('Error generating signed upload URL:', error);
        throw error;
    }
});
exports.generateUploadUrl = generateUploadUrl;
const uploadFileToS3 = (file, fileInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resourceName, resourceId, subResourceName, subResourceId, fileType, } = JSON.parse(fileInfo);
        const ext = fileType.split('/')[1];
        if (!ext)
            throw new Error('Invalid fileType');
        const uuid = (0, uuid_1.v4)();
        const baseName = subResourceId
            ? `${resourceId}_${subResourceId}_${uuid}`
            : `${resourceId}_${uuid}`;
        const fileName = `${baseName}.${ext}`;
        const keyPrefix = subResourceName
            ? `${resourceName}/${subResourceName}`
            : `${resourceName}`;
        const key = `${keyPrefix}/${fileName}`;
        console.log(key);
        const res = yield s
            .putObject({
            Key: key,
            Body: file.buffer,
            ContentType: fileInfo.fileType,
            Bucket: process.env.BUCKET_NAME,
        })
            .promise();
        return {
            url: `https://${process.env.BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${key}`,
        };
    }
    catch (error) {
        console.error('Error generating signed upload URL:', error);
        throw error;
    }
});
exports.uploadFileToS3 = uploadFileToS3;
//# sourceMappingURL=aws.js.map