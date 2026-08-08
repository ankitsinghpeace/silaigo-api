// src/core-db/mongo.connection.ts

import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ModelMetadata } from './model.metadata';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  const environment = configService.get<string>('NODE_ENV') ?? 'development';

  const user = configService.get<string>('MONGO_USER');
  const password = configService.get<string>('MONGO_PASSWORD');
  const host = configService.get<string>('MONGO_HOST');
  const dbName = configService.get<string>('MONGO_DB');

  if (!user || !password || !host || !dbName) {
    throw new Error('❌ Missing required MongoDB environment variables');
  }

  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(password);

  const mongoUri = `mongodb+srv://${encodedUser}:${encodedPassword}@${host}/${dbName}?retryWrites=true&w=majority&appName=${dbName}`;

  return {
    uri: mongoUri,
    dbName,
    retryAttempts: 5,
    retryDelay: 3000,
    // change it
    // autoIndex: true,
    autoIndex: environment !== 'production',
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  };
};

export const mongoSchemas = MongooseModule.forFeature(
  Object.entries(ModelMetadata).map(([name, meta]) => ({
    name,
    schema: meta.schema,
    collection: meta.collection,
    provide: meta.token,
    useFactory: () => meta.schema,
  })),
);
