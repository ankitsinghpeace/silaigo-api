import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
export declare const getMongoConfig: (configService: ConfigService) => Promise<MongooseModuleOptions>;
export declare const mongoSchemas: import("@nestjs/common").DynamicModule;
