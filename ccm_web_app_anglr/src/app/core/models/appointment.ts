import { BaseModel } from "./base.model";
import { ScheduleShift, TimeSlot } from "./schedule.model";

export class Appointment extends BaseModel {
    id: number;
    appointmentId: number;
    appointmentNumber: string;
    shiftId: number;
    shift: ScheduleShift = new ScheduleShift();
    timeSlotId: number;
    timeSlot: TimeSlot = new TimeSlot();
    // timeSlot: string;
    // timeSlot: ScheduleShift = new ScheduleShift();
    comment: string;

    patientId: number;
    doctorId: number;

    requestStatus: string;
    requestStatusReason: string;
    appointmentStatus: string;
    appointmentStatusReason: string;

    fee: number;
    currencyId: number;
    currency: any;
    reScheduleId: number;
    patientFirstName: string;
    patientLastName: string;
    doctorFirstName: string;
    doctorLastName: string;
    scheduleDate: string;
    
}