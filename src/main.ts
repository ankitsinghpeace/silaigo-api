import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppInterceptor } from './core/Interceptors/app.interceptor';
import { AppConfigService } from './modules/config/app-config.service';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
dotenv.config();

import * as express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { GlobalExceptionFilter } from './core/Interceptors/app.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: AppConfigService = app.get(AppConfigService);

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:8080',
      'http://localhost:3000',
      'https://silaigo.com',
      'http://localhost:4173',
      'https://silaigo-nxt-ui-git-main-silaigoofficial-7673s-projects.vercel.app'
    ],
    credentials: true,
  });

  // Set a global prefix for API routes (only in non-production)
  if (configService.nodeEnv !== 'production') {
    app.setGlobalPrefix('api');
  }

  // Set a JSON body size limit
  app.use(express.json({ limit: '50mb' }));
  app.use(cookieParser());

  // Apply global interceptor
  app.useGlobalInterceptors(new AppInterceptor());

  // Apply global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Apply rate limiting only in production
  if (configService.nodeEnv === 'production') {
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000, // Increased limit for production
        message: 'Too many requests, please try again later.',
        standardHeaders: true,
        legacyHeaders: false,
      }),
    );
  }

  // Security headers
  app.use(helmet());

  // Request logging
  app.use(morgan('combined'));

  const port = configService.appPort || 3001;

  // Swagger setup in non-production
  if (configService.nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('SilaoGo API Service')
      .setDescription('Backend APIs for SilaoGo application')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  // Start the application
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
