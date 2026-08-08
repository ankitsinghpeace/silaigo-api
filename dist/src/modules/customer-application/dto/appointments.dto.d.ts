export declare class DailyHoursDto {
    startTime: string;
    endTime: string;
}
export declare class UpdateScheduleDto {
    name?: string;
    workingDays: string[];
    dailyHours: DailyHoursDto;
    slotIntervalMinutes?: number;
    maxAppointmentsPerSlot?: number;
    isActive?: boolean;
}
export declare class SlotOverrideDto {
    isBlocked?: boolean;
    maxAppointments?: number;
}
export declare class CreateAvailabilityOverrideDto {
    date: string;
    type: 'HOLIDAY' | 'CUSTOM';
    workingHours?: DailyHoursDto;
    slots?: Record<string, SlotOverrideDto>;
    reason?: string;
}
