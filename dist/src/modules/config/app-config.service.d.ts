import { ConfigService } from '@nestjs/config';
export declare class AppConfigService {
    private readonly configService;
    constructor(configService: ConfigService);
    get nodeEnv(): string;
    get seedData(): boolean;
    get appPort(): number;
    get ddServiceName(): string;
    get ddEnv(): string;
    get mongoUser(): string;
    get mongoPassword(): string;
    get mongoHost(): string;
    get mongoDb(): string;
    get mongoUri(): string;
    get razorpayKeyId(): string;
    get razorpayKeySecret(): string;
}
