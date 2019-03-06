
export class Schedule {
    id: number;
    scheduleId: number;
    monthId: number;
    month: any;
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
}