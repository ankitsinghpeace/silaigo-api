import { Connection } from 'mongoose';
export declare class DatabaseSeederService {
    private readonly connection;
    private readonly logger;
    constructor(connection: Connection);
    seed(): Promise<void>;
}
