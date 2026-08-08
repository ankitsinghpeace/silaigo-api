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
exports.TeamMemberRegisterDto = exports.UpdateProfileDto = exports.CreateProfileDto = exports.ChangePasswordDto = exports.InternalLoginDto = exports.RegisterUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const profile_schema_1 = require("../../../../core-db/schemas/profile.schema");
const class_transformer_1 = require("class-transformer");
class RegisterUserDto {
}
exports.RegisterUserDto = RegisterUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email address',
        example: 'user@example.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User phone number',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[0-9]+$/, {
        message: 'Phone number must start with + followed by digits',
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        example: 'StrongP@ss123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User registration token',
        example: '1234567890',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "otpId", void 0);
class InternalLoginDto {
}
exports.InternalLoginDto = InternalLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email address',
        example: 'user@example.com',
    }),
    __metadata("design:type", String)
], InternalLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        example: 'StrongP@ss123',
    }),
    __metadata("design:type", String)
], InternalLoginDto.prototype, "password", void 0);
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
class CreateProfileDto {
}
exports.CreateProfileDto = CreateProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User first name',
        example: 'John',
    }),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User last name',
        example: 'Doe',
    }),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User gender',
        example: 'male',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(profile_schema_1.Gender),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'phone number',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'registration token',
        example: '1234567890',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "registrationToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'referral code',
        example: '1234567890',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "referralCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'referred by',
        example: '1234567890',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProfileDto.prototype, "referredBy", void 0);
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User first name',
        example: 'John',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === null || value === void 0 ? void 0 : value.trim()) || undefined),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User last name',
        example: 'Doe',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === null || value === void 0 ? void 0 : value.trim()) || undefined),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'gender',
        example: 'male',
    }),
    (0, class_validator_1.IsEnum)(profile_schema_1.Gender),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === null || value === void 0 ? void 0 : value.trim()) || undefined),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'phone number',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === null || value === void 0 ? void 0 : value.trim()) || undefined),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'email',
        example: 'user@example.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === null || value === void 0 ? void 0 : value.trim()) || undefined),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'notes',
        example: 'internal notes',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'color code',
        example: 'red',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "colorCode", void 0);
class TeamMemberRegisterDto {
}
exports.TeamMemberRegisterDto = TeamMemberRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'first name',
    }),
    __metadata("design:type", String)
], TeamMemberRegisterDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'last name',
    }),
    __metadata("design:type", String)
], TeamMemberRegisterDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email address',
        example: 'user@example.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    __metadata("design:type", String)
], TeamMemberRegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        example: 'StrongP@ss123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
    }),
    __metadata("design:type", String)
], TeamMemberRegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'roleId',
        example: '665544332211001100aabbcc',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeamMemberRegisterDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'joining date',
        example: '2025-01-01',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TeamMemberRegisterDto.prototype, "joiningDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'designation',
        example: 'Software Engineer',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeamMemberRegisterDto.prototype, "designation", void 0);
//# sourceMappingURL=auth.dto.js.map