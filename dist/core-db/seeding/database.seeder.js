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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var DatabaseSeederService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeederService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_metadata_1 = require("../model.metadata");
const page_section_data_1 = require("./data/page.section.data");
const categories_data_1 = require("./data/categories.data");
const customization_data_1 = require("./data/customization.data");
const permissions_data_1 = require("./data/permissions.data");
const user_data_1 = require("./data/user.data");
const roles_data_1 = require("./data/roles.data");
let DatabaseSeederService = DatabaseSeederService_1 = class DatabaseSeederService {
    constructor(connection) {
        this.connection = connection;
        this.logger = new common_1.Logger(DatabaseSeederService_1.name);
    }
    seed() {
        return __awaiter(this, void 0, void 0, function* () {
            const SeedDataMap = {
                Category: categories_data_1.categories,
                Customization: customization_data_1.customizations,
                PageSection: page_section_data_1.pageSections,
                Role: roles_data_1.roles,
                Permissions: permissions_data_1.permissions,
                User: user_data_1.users,
            };
            for (const [modelName, data] of Object.entries(SeedDataMap)) {
                if (!data || data.length === 0) {
                    this.logger.warn(`⚠️ Skipping ${modelName}: No data provided.`);
                    continue;
                }
                const schemaMeta = model_metadata_1.ModelMetadata[modelName];
                if (!schemaMeta) {
                    this.logger.warn(`⚠️ Skipping ${modelName}: No schema found.`);
                    continue;
                }
                const { schema, collection } = schemaMeta;
                const Model = this.connection.model(modelName, schema, collection);
                try {
                    this.logger.log(`🔄 Seeding ${modelName}...`);
                    yield Model.deleteMany({});
                    for (const item of data) {
                        try {
                            const doc = new Model(item);
                            yield doc.validate();
                            yield doc.save();
                        }
                        catch (validationError) {
                            this.logger.error(`❌ Validation failed for ${modelName} item:\n${JSON.stringify(item, null, 2)}`, validationError);
                        }
                    }
                    this.logger.log(`✅ Seeded ${modelName} (${data.length} records)`);
                }
                catch (err) {
                    this.logger.error(`🔥 Error while seeding ${modelName}:`, err);
                }
            }
        });
    }
};
exports.DatabaseSeederService = DatabaseSeederService;
exports.DatabaseSeederService = DatabaseSeederService = DatabaseSeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection])
], DatabaseSeederService);
//# sourceMappingURL=database.seeder.js.map