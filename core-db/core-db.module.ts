// src/core-db/core-db.module.ts

import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig, mongoSchemas } from './mongo.connection';
import { DatabaseSeederService } from './seeding/database.seeder';
import { DatabaseSeederRunner } from './seeding/database.runner';

@Global()
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMongoConfig,
      inject: [ConfigService],
    }),
    mongoSchemas,
  ],
  providers: [DatabaseSeederService, DatabaseSeederRunner],
  exports: [MongooseModule],
})
export class CoreDbModule {}
