import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';

const s3 = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const s = new AWS.S3({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const generateUploadUrl = async (fileInfo) => {
  try {
    const {
      resourceName,
      resourceId,
      subResourceName,
      subResourceId,
      fileType,
    } = fileInfo;

    const ext = fileType.split('/')[1];
    if (!ext) throw new Error('Invalid fileType');

    const uuid = uuidv4();

    const baseName = subResourceId
      ? `${resourceId}_${subResourceId}_${uuid}`
      : `${resourceId}_${uuid}`;
    const fileName = `${baseName}.${ext}`;

    const keyPrefix = subResourceName
      ? `${resourceName}/${subResourceName}`
      : `${resourceName}`;

    const key = `${keyPrefix}/${fileName}`;
    console.log(key);

    const command = new PutObjectCommand({
      Bucket: 'mytest0274',
      Key: key,
      ContentType: fileType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 300 });

    return { url, key };
  } catch (error) {
    console.error('Error generating signed upload URL:', error);
    throw error;
  }
};

export const uploadFileToS3 = async (file, fileInfo) => {
  try {
    const {
      resourceName,
      resourceId,
      subResourceName,
      subResourceId,
      fileType,
    } = JSON.parse(fileInfo);

    const ext = fileType.split('/')[1];
    if (!ext) throw new Error('Invalid fileType');

    const uuid = uuidv4();

    const baseName = subResourceId
      ? `${resourceId}_${subResourceId}_${uuid}`
      : `${resourceId}_${uuid}`;
    const fileName = `${baseName}.${ext}`;

    const keyPrefix = subResourceName
      ? `${resourceName}/${subResourceName}`
      : `${resourceName}`;

    const key = `${keyPrefix}/${fileName}`;
    console.log(key);

    const res = await s
      .putObject({
        Key: key,
        // ACL: 'public-read',
        Body: file.buffer,
        ContentType: fileInfo.fileType,
        Bucket: process.env.BUCKET_NAME!,
      })
      .promise();

    return {
      url: `https://${process.env.BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${key}`,
    };
  } catch (error) {
    console.error('Error generating signed upload URL:', error);
    throw error;
  }
};
