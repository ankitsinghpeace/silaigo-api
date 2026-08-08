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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPhoneCallSchedulerDto = exports.CreatePhoneCallSchedulerDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const phoneCall_scheduler_status_1 = require("../../../../core-db/enums/phoneCall.scheduler.status");
class CreatePhoneCallSchedulerDto {
}
exports.CreatePhoneCallSchedulerDto = CreatePhoneCallSchedulerDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePhoneCallSchedulerDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePhoneCallSchedulerDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePhoneCallSchedulerDto.prototype, "appointmentDate", void 0);
class GetPhoneCallSchedulerDto {
    constructor() {
        this.sortBy = 'newest';
        this.page = 1;
        this.limit = 20;
    }
}
exports.GetPhoneCallSchedulerDto = GetPhoneCallSchedulerDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPhoneCallSchedulerDto.prototype, "categoryName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPhoneCallSchedulerDto.prototype, "customerPhone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['newest', 'oldest']),
    __metadata("design:type", String)
], GetPhoneCallSchedulerDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetPhoneCallSchedulerDto.prototype, "appointmentDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetPhoneCallSchedulerDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetPhoneCallSchedulerDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(phoneCall_scheduler_status_1.PhoneCallStatus),
    __metadata("design:type", String)
], GetPhoneCallSchedulerDto.prototype, "callStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(phoneCall_scheduler_status_1.OrderInitiationStatus),
    __metadata("design:type", String)
], GetPhoneCallSchedulerDto.prototype, "orderStatus", void 0);
//# sourceMappingURL=phone-call.dto.js.map