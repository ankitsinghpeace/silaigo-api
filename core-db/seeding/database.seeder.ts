import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ModelMetadata } from 'core-db/model.metadata'; // ✅ replaced

import { pageSections } from 'core-db/seeding/data/page.section.data';
import { categories } from 'core-db/seeding/data/categories.data';
import { customizations } from 'core-db/seeding/data/customization.data';
import { permissions } from './data/permissions.data';
import { users } from './data/user.data';
import { roles } from 'core-db/seeding/data/roles.data';

@Injectable()
export class DatabaseSeederService {
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}
  async seed() {
    const SeedDataMap: Partial<Record<string, any[]>> = {
      Category: categories,
      Customization: customizations,
      PageSection: pageSections,
      Role: roles,
      Permissions: permissions,
      User: users,
    };

    for (const [modelName, data] of Object.entries(SeedDataMap)) {
      if (!data || data.length === 0) {
        this.logger.warn(`⚠️ Skipping ${modelName}: No data provided.`);
        continue;
      }

      const schemaMeta = ModelMetadata[modelName as keyof typeof ModelMetadata];
      if (!schemaMeta) {
        this.logger.warn(`⚠️ Skipping ${modelName}: No schema found.`);
        continue;
      }

      const { schema, collection } = schemaMeta;
      const Model = this.connection.model(modelName, schema, collection);

      try {
        this.logger.log(`🔄 Seeding ${modelName}...`);

        await Model.deleteMany({});
        for (const item of data) {
          try {
            const doc = new Model(item);
            await doc.validate(); // Validate before save
            await doc.save();
          } catch (validationError) {
            this.logger.error(
              `❌ Validation failed for ${modelName} item:\n${JSON.stringify(item, null, 2)}`,
              validationError,
            );
          }
        }

        this.logger.log(`✅ Seeded ${modelName} (${data.length} records)`);
      } catch (err) {
        this.logger.error(`🔥 Error while seeding ${modelName}:`, err);
      }
    }
  }
}
