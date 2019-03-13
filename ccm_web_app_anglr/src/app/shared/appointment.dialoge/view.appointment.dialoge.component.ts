import { Component, Input, OnInit, Inject, OnChanges, Output, EventEmitter, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Message, MessageTypes } from '../../core/models/message';
import { User } from '../../core/models/user';
import { Region } from '../../core/models/region';
import { Country } from '../../core/models/country';

import { UIService } from '../../core/services/ui/ui.service';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { FormService } from '../../core/services/form/form.service';
import { UserService } from '../../core/services/user/user.service';
import { MappingService } from '../../core/services/mapping/mapping.service';

import { Config } from '../../config/config';
import { Schedule, ScheduleDetail, ScheduleShift, TimeSlot } from '../../core/models/schedule.model';
import { Appointment } from '../../core/models/appointment';
import { DoctorScheduleService } from '../../core/services/doctor/doctor.schedule.service';
import { AppointmentService } from '../../core/services/schedule/appointment.service';


@Component({
    selector: 'view-appointment-dialoge',
    templateUrl: 'view.appointment.dialog.component.html',
})

export class ViewAppointmentDialogeComponent {

    user: User = new User();

    schedule: Schedule = new Schedule();
    scheduleDetail: ScheduleDetail = new ScheduleDetail();
    scheduleShift: ScheduleShift = new ScheduleShift();

    docId: number = null;
    appointmentId: number = null;
    appointment: Appointment = new Appointment();

    isSubmitted = false;

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialogRef: MatDialogRef<ViewAppointmentDialogeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _uiService: UIService,
        private utilityService: UtilityService,
        private _userService: UserService,
        private _appointmentService: AppointmentService,
        private _doctorScheduleService: DoctorScheduleService,
        private _mappingService: MappingService,
        private _formService: FormService,
        private fb: FormBuilder,
    ) {

        // this._uiService.showSpinner();

        this.user = this._authService.getUser();
        console.log("data", data);
        if (data && data.appointment) {
            // this.docId = data.docId || null;
            // this.schedule = data.schedule || new Schedule();
            // this.scheduleDetail = data.scheduleDetail || new ScheduleDetail();
            this.appointmentId = data.appointment.id || null;
            this.appointment = data.appointment || new Appointment();

            this.loadAppointment();
        }


    }

    loadAppointment() {

        const msg = new Message();

        this.isSubmitted = true;
        // this._uiService.showSpinner();

        this._appointmentService.getSingleAppointment(this.appointmentId).subscribe(
            (res) => {

                console.log("res ", res);
                this.isSubmitted = false;
                // this._uiService.hideSpinner();
                // this.length = res.json().data;
                let data = res.json().data;

                this.appointment = this._mappingService.mapAppointment(data);


                console.log("appointment ", this.appointment);

            },
            (err) => {
                console.log(err);
                this.isSubmitted = false;
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    // onCancel
    onNoClick(): void {
        this.dialogRef.close(false);
    }
}
