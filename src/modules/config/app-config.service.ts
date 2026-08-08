// src/config/app-config.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') ?? 'development';
  }

  get seedData(): boolean {
    return this.configService.get<boolean>('SEED_DATA') ?? false;
  }

  get appPort(): number {
    return this.configService.get<number>('APP_PORT') ?? 3001;
  }

  get ddServiceName(): string {
    return this.configService.get<string>('DD_SERVICE_NAME') ?? 'my-service';
  }

  get ddEnv(): string {
    return this.configService.get<string>('DD_ENV') ?? 'production';
  }

  get mongoUser(): string {
    return this.configService.get<string>('MONGO_USER') ?? '';
  }

  get mongoPassword(): string {
    return this.configService.get<string>('MONGO_PASSWORD') ?? '';
  }

  get mongoHost(): string {
    return this.configService.get<string>('MONGO_HOST') ?? '';
  }

  get mongoDb(): string {
    return this.configService.get<string>('MONGO_DB') ?? '';
  }

  get mongoUri(): string {
    const user = encodeURIComponent(this.mongoUser);
    const password = encodeURIComponent(this.mongoPassword);
    const host = this.mongoHost;
    const dbName = this.mongoDb;

    return `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority&appName=${dbName}`;
  }

  get razorpayKeyId(): string {
    return this.configService.get<string>('RAZORPAY_KEY_ID') ?? '';
  }

  get razorpayKeySecret(): string {
    return this.configService.get<string>('RAZORPAY_KEY_SECRET') ?? '';
  }
}
