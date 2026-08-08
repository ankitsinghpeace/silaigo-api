import { OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
export declare class RedisService implements OnModuleDestroy {
    private readonly logger;
    private redisClient;
    constructor();
    onModuleDestroy(): Promise<void>;
    getClient(): Redis;
    set(key: string, value: string, ttl?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<void>;
    incr(key: string): Promise<number>;
    expire(key: string, seconds: number): Promise<void>;
    clearCustomerListCache(): Promise<void>;
}
