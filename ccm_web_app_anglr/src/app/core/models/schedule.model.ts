import { Month } from "./date.model";

export class Schedule {
    id: number;
    scheduleId: number;
    doctorFirstName: string;
    doctorLastName: string;
    monthId: number;
    // month: any;
    month: Month = new Month();
    year: number;
    startDate: string;
    endDate: string;
    scheduleDetails: ScheduleDetail[] = [];
}

export class ScheduleDetail {
    id: number;
    scheduleDetailId: number;
    scheduleDate: string;
    noOfShift: number;
    isOffDay: boolean = false;
    scheduleShifts: ScheduleShift[] = [];
}

export class ScheduleShift {
    id: number;
    scheduleShiftId: number;
    startTime: string;
    endTime: string;
    noOfPatientAllowed: number;
    timeSlots: TimeSlot[] = [];
}

export class TimeSlot {
    id: number;
    timeSlotId: number;
    scheduleShiftId: number;
    timeSlot: string;
    isBooked: boolean;
}
