import { Injectable, OnModuleDestroy, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { Logger } from '@nestjs/common';


@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private redisClient: Redis;


  constructor() {    
    try {
      console.log("run")
    this.redisClient = new Redis(process.env.REDIS_CONN_URL!);

      this.redisClient.on('connect', () => {
        this.logger.log('Successfully connected to Redis');
      });

      this.redisClient.on('error', (error) => {
        this.logger.error('Redis connection error:', error);
      });

    } catch (error) {
      this.logger.error('Failed to initialize Redis connection:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.redisClient) {
      await this.redisClient.quit();
      this.logger.log('Redis connection closed');
    }
  }

  getClient(): Redis {
    return this.redisClient;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redisClient.setex(key, ttl, value);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async incr(key: string): Promise<number> {
    return await this.redisClient.incr(key);
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.redisClient.expire(key, seconds);
  }

  async clearCustomerListCache() {
    
      const pattern = 'customers_*';
      const keys = await this.redisClient.keys(pattern);
      
      if (keys.length > 0) {
        await this.redisClient.del(...keys);
        console.log(`Cleared ${keys.length} customer cache keys`);
      }
    
  }
  
}
