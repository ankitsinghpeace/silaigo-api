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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppConfigService = class AppConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get nodeEnv() {
        var _a;
        return (_a = this.configService.get('NODE_ENV')) !== null && _a !== void 0 ? _a : 'development';
    }
    get seedData() {
        var _a;
        return (_a = this.configService.get('SEED_DATA')) !== null && _a !== void 0 ? _a : false;
    }
    get appPort() {
        var _a;
        return (_a = this.configService.get('APP_PORT')) !== null && _a !== void 0 ? _a : 3001;
    }
    get ddServiceName() {
        var _a;
        return (_a = this.configService.get('DD_SERVICE_NAME')) !== null && _a !== void 0 ? _a : 'my-service';
    }
    get ddEnv() {
        var _a;
        return (_a = this.configService.get('DD_ENV')) !== null && _a !== void 0 ? _a : 'production';
    }
    get mongoUser() {
        var _a;
        return (_a = this.configService.get('MONGO_USER')) !== null && _a !== void 0 ? _a : '';
    }
    get mongoPassword() {
        var _a;
        return (_a = this.configService.get('MONGO_PASSWORD')) !== null && _a !== void 0 ? _a : '';
    }
    get mongoHost() {
        var _a;
        return (_a = this.configService.get('MONGO_HOST')) !== null && _a !== void 0 ? _a : '';
    }
    get mongoDb() {
        var _a;
        return (_a = this.configService.get('MONGO_DB')) !== null && _a !== void 0 ? _a : '';
    }
    get mongoUri() {
        const user = encodeURIComponent(this.mongoUser);
        const password = encodeURIComponent(this.mongoPassword);
        const host = this.mongoHost;
        const dbName = this.mongoDb;
        return `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority&appName=${dbName}`;
    }
    get razorpayKeyId() {
        var _a;
        return (_a = this.configService.get('RAZORPAY_KEY_ID')) !== null && _a !== void 0 ? _a : '';
    }
    get razorpayKeySecret() {
        var _a;
        return (_a = this.configService.get('RAZORPAY_KEY_SECRET')) !== null && _a !== void 0 ? _a : '';
    }
};
exports.AppConfigService = AppConfigService;
exports.AppConfigService = AppConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppConfigService);
//# sourceMappingURL=app-config.service.js.map