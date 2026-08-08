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
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const common_2 = require("@nestjs/common");
let RedisService = RedisService_1 = class RedisService {
    constructor() {
        this.logger = new common_2.Logger(RedisService_1.name);
        try {
            console.log("run");
            this.redisClient = new ioredis_1.default(process.env.REDIS_CONN_URL);
            this.redisClient.on('connect', () => {
                this.logger.log('Successfully connected to Redis');
            });
            this.redisClient.on('error', (error) => {
                this.logger.error('Redis connection error:', error);
            });
        }
        catch (error) {
            this.logger.error('Failed to initialize Redis connection:', error);
            throw error;
        }
    }
    onModuleDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.redisClient) {
                yield this.redisClient.quit();
                this.logger.log('Redis connection closed');
            }
        });
    }
    getClient() {
        return this.redisClient;
    }
    set(key, value, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ttl) {
                yield this.redisClient.setex(key, ttl, value);
            }
            else {
                yield this.redisClient.set(key, value);
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.redisClient.get(key);
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redisClient.del(key);
        });
    }
    incr(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.redisClient.incr(key);
        });
    }
    expire(key, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redisClient.expire(key, seconds);
        });
    }
    clearCustomerListCache() {
        return __awaiter(this, void 0, void 0, function* () {
            const pattern = 'customers_*';
            const keys = yield this.redisClient.keys(pattern);
            if (keys.length > 0) {
                yield this.redisClient.del(...keys);
                console.log(`Cleared ${keys.length} customer cache keys`);
            }
        });
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.service.js.map