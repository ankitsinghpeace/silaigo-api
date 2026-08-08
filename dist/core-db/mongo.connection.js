"use strict";
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
exports.mongoSchemas = exports.getMongoConfig = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const model_metadata_1 = require("./model.metadata");
const getMongoConfig = (configService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const environment = (_a = configService.get('NODE_ENV')) !== null && _a !== void 0 ? _a : 'development';
    const user = configService.get('MONGO_USER');
    const password = configService.get('MONGO_PASSWORD');
    const host = configService.get('MONGO_HOST');
    const dbName = configService.get('MONGO_DB');
    if (!user || !password || !host || !dbName) {
        throw new Error('❌ Missing required MongoDB environment variables');
    }
    const encodedUser = encodeURIComponent(user);
    const encodedPassword = encodeURIComponent(password);
    const mongoUri = `mongodb+srv://${encodedUser}:${encodedPassword}@${host}/${dbName}?retryWrites=true&w=majority&appName=${dbName}`;
    return {
        uri: mongoUri,
        dbName,
        retryAttempts: 5,
        retryDelay: 3000,
        autoIndex: environment !== 'production',
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
    };
});
exports.getMongoConfig = getMongoConfig;
exports.mongoSchemas = mongoose_1.MongooseModule.forFeature(Object.entries(model_metadata_1.ModelMetadata).map(([name, meta]) => ({
    name,
    schema: meta.schema,
    collection: meta.collection,
    provide: meta.token,
    useFactory: () => meta.schema,
})));
//# sourceMappingURL=mongo.connection.js.map