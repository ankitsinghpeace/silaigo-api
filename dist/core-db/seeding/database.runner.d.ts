import { OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseSeederService } from './database.seeder';
export declare class DatabaseSeederRunner implements OnApplicationBootstrap {
    private readonly seeder;
    private readonly configService;
    private readonly logger;
    constructor(seeder: DatabaseSeederService, configService: ConfigService);
    onApplicationBootstrap(): Promise<void>;
}
