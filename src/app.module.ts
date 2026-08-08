import { Module } from '@nestjs/common';
import { CoreDbModule } from 'core-db';
import { AppConfigModule } from './modules/config/app-config.module';
import { CustomerApplication } from './modules/customer-application';
import { RedisModule } from './core/redis/redis.module';

@Module({
  imports: [
    AppConfigModule,
    CoreDbModule,
    CustomerApplication, // Register here
    RedisModule,
  ],
})
export class AppModule {}
