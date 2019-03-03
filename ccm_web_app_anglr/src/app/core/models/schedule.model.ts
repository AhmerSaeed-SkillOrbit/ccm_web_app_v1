
export class Schedule {
    id: number;
    scheduleId: number;
    startDate: string;
    endDate: string;
    scheduleDetails: ScheduleDetail[] = [];
}

export class ScheduleDetail {
    id: number;
    scheduleDetailId: number;
    scheduleDate: string;
    hour: string;
    min: string;
    startTime: string;
    endTime: string;
    shiftHour: number = 0;
    isOffDay: boolean = false;
}