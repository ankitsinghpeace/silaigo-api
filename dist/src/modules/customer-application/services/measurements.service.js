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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const model_metadata_1 = require("../../../../core-db/model.metadata");
let MeasurementsService = class MeasurementsService {
    constructor(measurementModel, measurementFieldModel, orderModel, profileModel) {
        this.measurementModel = measurementModel;
        this.measurementFieldModel = measurementFieldModel;
        this.orderModel = orderModel;
        this.profileModel = profileModel;
    }
    createCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.measurementModel.create(data);
        });
    }
    addMeasureMentField(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.measurementFieldModel.create(data);
        });
    }
    deleteCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.measurementModel.deleteOne({ name: name });
        });
    }
    updateCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield this.measurementModel.findOneAndUpdate({ name: data.name }, { $set: { fields: data.fields } }, { returnDocument: 'after' });
            return updated;
        });
    }
    listCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.measurementModel.find({});
        });
    }
    listMeasurementsFields() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.measurementFieldModel.find({});
        });
    }
    deleteMeasurementField(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.measurementFieldModel.deleteOne({ id: id.trim() });
        });
    }
    getUserMeasurements(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.profileModel.findOne({ phone: phone.trim() });
            if (!user) {
                return { bodyMeasurement: null };
            }
            const order = yield this.orderModel
                .findOne({ profile: user._id })
                .sort({ createdAt: -1 });
            if (order && order.measurements.bodyMeasurement) {
                return { bodyMeasurement: order.measurements.bodyMeasurement };
            }
            return { bodyMeasurement: null };
        });
    }
};
exports.MeasurementsService = MeasurementsService;
exports.MeasurementsService = MeasurementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(model_metadata_1.ModelMetadata.MeasurementCategory.token)),
    __param(1, (0, common_1.Inject)(model_metadata_1.ModelMetadata.MeasurementField.token)),
    __param(2, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Order.token)),
    __param(3, (0, common_1.Inject)(model_metadata_1.ModelMetadata.Profile.token)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], MeasurementsService);
//# sourceMappingURL=measurements.service.js.map