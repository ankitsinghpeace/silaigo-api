"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../../core/redis/redis.service");
const sendSms_1 = require("../../../utils/sendSms");
const bcrypt = require("bcryptjs");
let OtpService = class OtpService {
    constructor(redisService) {
        this.redisService = redisService;
        this.EXPIRY_SECONDS = 300;
    }
    generateOtpCode() {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        return otp;
    }
    generateOtp(_a) {
        return __awaiter(this, arguments, void 0, function* ({ phone, isMasterLogin = false }) {
            let code = this.generateOtpCode();
            const otpKey = `otp:${phone}`;
            if (!isMasterLogin) {
                try {
                    yield (0, sendSms_1.sendWhatsAppMessage)(code, [`91${phone}`]);
                }
                catch (error) {
                    throw new common_1.BadGatewayException('Failed to send OTP');
                }
            }
            else {
                code = process.env.MASTER_OTP;
            }
            yield this.redisService.set(otpKey, code, this.EXPIRY_SECONDS);
            yield this.redisService.set(`otp:sent:${phone}`, '1', 60);
            console.log(code, otpKey);
            return { code, otpKey };
        });
    }
    canSendOtp(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const throttleKey = `otp:sent:${phone}`;
            const exists = yield this.redisService.get(throttleKey);
            return !exists;
        });
    }
    verifyOtp(otpKey, inputCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedCode = yield this.redisService.get(otpKey);
            if (storedCode && storedCode.length > 4) {
                const otp = `master_${inputCode}`;
                return yield bcrypt.compare(otp, storedCode);
            }
            if (storedCode && storedCode === inputCode) {
                yield this.redisService.del(otpKey);
                return true;
            }
            return false;
        });
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], OtpService);
//# sourceMappingURL=otp.service.js.map