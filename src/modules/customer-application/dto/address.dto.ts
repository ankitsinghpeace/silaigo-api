import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsString()
  @IsOptional()
  addressLine2: string;

  @IsString()
  @IsOptional()
  impersonateUserId: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  pincode: string;

  @IsBoolean()
  @IsNotEmpty()
  isDefault: boolean;
}
