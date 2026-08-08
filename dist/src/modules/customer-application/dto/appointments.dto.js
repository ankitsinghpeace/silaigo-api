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
exports.CreateAvailabilityOverrideDto = exports.SlotOverrideDto = exports.UpdateScheduleDto = exports.DailyHoursDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class DailyHoursDto {
}
exports.DailyHoursDto = DailyHoursDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start time in HH:MM format',
        example: '09:00',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DailyHoursDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End time in HH:MM format',
        example: '17:00',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DailyHoursDto.prototype, "endTime", void 0);
class UpdateScheduleDto {
}
exports.UpdateScheduleDto = UpdateScheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the schedule configuration',
        example: 'Weekday Schedule',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScheduleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of working days',
        example: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsIn)(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], { each: true }),
    __metadata("design:type", Array)
], UpdateScheduleDto.prototype, "workingDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Daily working hours',
        type: DailyHoursDto,
    }),
    __metadata("design:type", DailyHoursDto)
], UpdateScheduleDto.prototype, "dailyHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Time slot interval in minutes',
        example: 30,
        required: false,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(5),
    (0, class_validator_1.Max)(120),
    __metadata("design:type", Number)
], UpdateScheduleDto.prototype, "slotIntervalMinutes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum appointments per time slot',
        example: 5,
        required: false,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], UpdateScheduleDto.prototype, "maxAppointmentsPerSlot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the schedule configuration is active',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateScheduleDto.prototype, "isActive", void 0);
class SlotOverrideDto {
}
exports.SlotOverrideDto = SlotOverrideDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the slot is blocked',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SlotOverrideDto.prototype, "isBlocked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum appointments for this slot',
        example: 5,
        required: false,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(20),
    __metadata("design:type", Number)
], SlotOverrideDto.prototype, "maxAppointments", void 0);
class CreateAvailabilityOverrideDto {
}
exports.CreateAvailabilityOverrideDto = CreateAvailabilityOverrideDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date for the availability override',
        example: '2024-01-15',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAvailabilityOverrideDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of override',
        enum: ['HOLIDAY', 'CUSTOM'],
        example: 'HOLIDAY',
    }),
    (0, class_validator_1.IsIn)(['HOLIDAY', 'CUSTOM']),
    __metadata("design:type", String)
], CreateAvailabilityOverrideDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Working hours for custom override',
        type: DailyHoursDto,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DailyHoursDto)
], CreateAvailabilityOverrideDto.prototype, "workingHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Slot-specific overrides',
        example: {
            '09:00': { isBlocked: false, maxAppointments: 3 },
            '10:00': { isBlocked: true }
        },
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAvailabilityOverrideDto.prototype, "slots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reason for the override',
        example: 'Public Holiday',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAvailabilityOverrideDto.prototype, "reason", void 0);
//# sourceMappingURL=appointments.dto.js.map