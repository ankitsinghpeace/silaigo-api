import { RedisService } from 'src/core/redis/redis.service';
export declare class OtpService {
    private readonly redisService;
    constructor(redisService: RedisService);
    private EXPIRY_SECONDS;
    private generateOtpCode;
    generateOtp({ phone, isMasterLogin }: {
        phone: string;
        isMasterLogin: boolean;
    }): Promise<{
        code: string;
        otpKey: string;
    }>;
    canSendOtp(phone: string): Promise<boolean>;
    verifyOtp(otpKey: string, inputCode: string): Promise<boolean>;
}
