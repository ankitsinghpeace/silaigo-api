import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  Matches,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'core-db/schemas/profile.schema';
import { Transform } from 'class-transformer';

export class RegisterUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+1234567890',
  })
  @IsString()
  @Matches(/[0-9]+$/, {
    message: 'Phone number must start with + followed by digits',
  })
  phone: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongP@ss123',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
  })
  password: string;

  @ApiProperty({
    description: 'User registration token',
    example: '1234567890',
  })
  @IsString()
  otpId: string;
}

export class InternalLoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongP@ss123',
  })
  password: string;
}

export class ChangePasswordDto {
  @IsString()
  userId: string;

  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}

export class CreateProfileDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'User gender',
    example: 'male',
  })
  @IsOptional()
  @IsEnum(Gender)
  gender: string;

  @ApiProperty({
    description: 'phone number',
    example: '+1234567890',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'registration token',
    example: '1234567890',
  })
  @IsString()
  registrationToken: string;

  @ApiProperty({
    description: 'referral code',
    example: '1234567890',
  })
  @IsOptional()
  @IsString()
  referralCode: string;

  @ApiProperty({
    description: 'referred by',
    example: '1234567890',
  })
  @IsOptional()
  @IsString()
  referredBy: string;
}

export class UpdateProfileDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim() || undefined)
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim() || undefined)
  lastName: string;

  @ApiProperty({
    description: 'gender',
    example: 'male',
  })
  @IsEnum(Gender)
  @IsOptional()
  @Transform(({ value }) => value?.trim() || undefined)
  gender: string;

  @ApiProperty({
    description: 'phone number',
    example: '+1234567890',
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim() || undefined)
  phone: string;

  @ApiProperty({
    description: 'email',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsOptional()
  @Transform(({ value }) => value?.trim() || undefined)
  email: string;

  @ApiProperty({
    description: 'notes',
    example: 'internal notes',
  })
  @IsOptional()
  @IsString()
  notes: string;

  @ApiProperty({
    description: 'color code',
    example: 'red',
  })
  @IsOptional()
  @IsString()
  colorCode: string;
}

export class TeamMemberRegisterDto {
  @ApiProperty({
    description: 'first name',
  })
  firstName: string;

  @ApiProperty({
    description: 'last name',
  })
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongP@ss123',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
  })
  password: string;

  @ApiProperty({
    description: 'roleId',
    example: '665544332211001100aabbcc',
  })
  @IsString()
  role: string;

  @ApiProperty({
    description: 'joining date',
    example: '2025-01-01',
  })
  @IsDateString()
  joiningDate: string;

  @ApiProperty({
    description: 'designation',
    example: 'Software Engineer',
  })
  @IsString()
  designation: string;
}
