import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsMongoId,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DailyHoursDto {
  @ApiProperty({
    description: 'Start time in HH:MM format',
    example: '09:00',
  })
  @IsString()
  startTime: string;

  @ApiProperty({
    description: 'End time in HH:MM format',
    example: '17:00',
  })
  @IsString()
  endTime: string;
}

export class UpdateScheduleDto {
  @ApiProperty({
    description: 'Name of the schedule configuration',
    example: 'Weekday Schedule',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Array of working days',
    example: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsIn(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], { each: true })
  workingDays: string[];

  @ApiProperty({
    description: 'Daily working hours',
    type: DailyHoursDto,
  })
  dailyHours: DailyHoursDto;

  @ApiProperty({
    description: 'Time slot interval in minutes',
    example: 30,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(5)
  @Max(120)
  slotIntervalMinutes?: number;

  @ApiProperty({
    description: 'Maximum appointments per time slot',
    example: 5,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(50)
  maxAppointmentsPerSlot?: number;

  @ApiProperty({
    description: 'Whether the schedule configuration is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}



export class SlotOverrideDto {
  @ApiProperty({
    description: 'Whether the slot is blocked',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isBlocked?: boolean;

  @ApiProperty({
    description: 'Maximum appointments for this slot',
    example: 5,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(20)
  maxAppointments?: number;
}

export class CreateAvailabilityOverrideDto {
  @ApiProperty({
    description: 'Date for the availability override',
    example: '2024-01-15',
  })
  @IsString()
  date: string;

  @ApiProperty({
    description: 'Type of override',
    enum: ['HOLIDAY', 'CUSTOM'],
    example: 'HOLIDAY',
  })
  @IsIn(['HOLIDAY', 'CUSTOM'])
  type: 'HOLIDAY' | 'CUSTOM';

  @ApiProperty({
    description: 'Working hours for custom override',
    type: DailyHoursDto,
    required: false,
  })
  @IsOptional()
  workingHours?: DailyHoursDto;

  @ApiProperty({
    description: 'Slot-specific overrides',
    example: {
      '09:00': { isBlocked: false, maxAppointments: 3 },
      '10:00': { isBlocked: true }
    },
    required: false,
  })
  @IsOptional()
  slots?: Record<string, SlotOverrideDto>;

  @ApiProperty({
    description: 'Reason for the override',
    example: 'Public Holiday',
    required: false,
  })
  @IsString()
  @IsOptional()
  reason?: string;
}