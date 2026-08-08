import { BadGatewayException, Injectable } from '@nestjs/common';
import { RedisService } from 'src/core/redis/redis.service';
import { sendWhatsAppMessage } from 'src/utils/sendSms';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class OtpService {
  constructor(private readonly redisService: RedisService) {}
  private EXPIRY_SECONDS = 300; // 5 mins

  private generateOtpCode() {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    return otp;
  }

  async generateOtp({phone,isMasterLogin=false}:{phone:string,isMasterLogin:boolean}) {
    let code = this.generateOtpCode();
    const otpKey = `otp:${phone}`;
    if(!isMasterLogin){
      try {
        await sendWhatsAppMessage(code, [`91${phone}`]);
      } catch (error) {
        throw new BadGatewayException('Failed to send OTP');
      }
    }else{
      code = process.env.MASTER_OTP!;
    }
    await this.redisService.set(otpKey, code, this.EXPIRY_SECONDS);
    await this.redisService.set(`otp:sent:${phone}`, '1', 60); // throttle
    console.log(code,otpKey);
    return { code, otpKey };
  }

  async canSendOtp(phone: string) {
    const throttleKey = `otp:sent:${phone}`;
    const exists = await this.redisService.get(throttleKey);
    return !exists;
  }

  async verifyOtp(otpKey: string, inputCode: string) {
    const storedCode = await this.redisService.get(otpKey);
    
    if(storedCode && storedCode.length > 4){
      const otp = `master_${inputCode}`;
      return await bcrypt.compare(otp, storedCode)
    }

    if (storedCode && storedCode === inputCode) {
      await this.redisService.del(otpKey);
      return true;
    }
    return false;
  }
}
