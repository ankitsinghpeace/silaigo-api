import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseSeederService } from './database.seeder';

@Injectable()
export class DatabaseSeederRunner implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeederRunner.name);

  constructor(
    private readonly seeder: DatabaseSeederService,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('onApplicationBootstrap called');

    const nodeEnv = this.configService.get<string>('NODE_ENV') ?? 'development';
    const seedData: boolean =
      this.configService.get<boolean>('SEED_DATA') ?? false;
    if (nodeEnv !== 'development' || !Boolean(seedData)) {
      this.logger.log('Seeding skipped: Not in development environment');
      return;
    }

    try {
      await this.seeder.seed();
      this.logger.log('Database seeding completed successfully');
    } catch (error) {
      this.logger.error('Error during database seeding', error);
    }
  }
}
