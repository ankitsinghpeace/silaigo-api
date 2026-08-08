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
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const app_interceptor_1 = require("./core/Interceptors/app.interceptor");
const app_config_service_1 = require("./modules/config/app-config.service");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const express = require("express");
const express_rate_limit_1 = require("express-rate-limit");
const helmet_1 = require("helmet");
const morgan = require("morgan");
const app_exception_1 = require("./core/Interceptors/app.exception");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const configService = app.get(app_config_service_1.AppConfigService);
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
        if (configService.nodeEnv !== 'production') {
            app.setGlobalPrefix('api');
        }
        app.use(express.json({ limit: '50mb' }));
        app.use(cookieParser());
        app.useGlobalInterceptors(new app_interceptor_1.AppInterceptor());
        app.useGlobalFilters(new app_exception_1.GlobalExceptionFilter());
        if (configService.nodeEnv === 'production') {
            app.use((0, express_rate_limit_1.default)({
                windowMs: 15 * 60 * 1000,
                max: 1000,
                message: 'Too many requests, please try again later.',
                standardHeaders: true,
                legacyHeaders: false,
            }));
        }
        app.use((0, helmet_1.default)());
        app.use(morgan('combined'));
        const port = configService.appPort || 3001;
        if (configService.nodeEnv !== 'production') {
            const config = new swagger_1.DocumentBuilder()
                .setTitle('SilaoGo API Service')
                .setDescription('Backend APIs for SilaoGo application')
                .setVersion('1.0')
                .addBearerAuth()
                .build();
            const document = swagger_1.SwaggerModule.createDocument(app, config);
            swagger_1.SwaggerModule.setup('api/docs', app, document);
        }
        yield app.listen(port);
        console.log(`🚀 Application is running on: http://localhost:${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map