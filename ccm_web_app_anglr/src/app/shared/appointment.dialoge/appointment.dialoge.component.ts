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
    selector: 'appointment-dialoge',
    templateUrl: 'appointment.dialog.component.html',
})

export class AppointmentDialogeComponent {

    tooltipSapId = Config.pattern.sapId.tooltip;
    patternSapId = Config.pattern.sapId.regex;

    tooltipCNIC = Config.pattern.cnic.tooltip;
    patternCNIC = Config.pattern.cnic.regex;   // 42101-1234567-1

    form: FormGroup;

    isSubmited = false;
    regions: Region[] = [];
    countries: Country[] = [];

    user: User = new User();

    schedule: Schedule = new Schedule();
    scheduleDetail: ScheduleDetail = new ScheduleDetail();
    scheduleShift: ScheduleShift = new ScheduleShift();

    docId: number = null;
    appointment: Appointment = new Appointment();

    isSubmitted = false;
    addPermission = false;
    buttonTooltip = "";

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialogRef: MatDialogRef<AppointmentDialogeComponent>,
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
        if (data && data.schedule) {
            this.docId = data.docId || null;
            this.schedule = data.schedule || new Schedule();
            this.scheduleDetail = data.scheduleDetail || new ScheduleDetail();
        }


        // this.addPermission = this.utilityService.checkUserPermission(this.user, 'add_admin');
        this.addPermission = true;
        this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");

        this.form = fb.group({

            'doctorName': [null, Validators.compose([])],
            'date': [null, Validators.compose([])],
            'shift': [null, Validators.compose([Validators.required])],
            'time': [null, Validators.compose([Validators.required])],
            'comment': [null, Validators.compose([])],
        });

        // this.loadCountries();
    }

    onShiftFocusOut() {

        console.log("onShiftFocusOut");
        const shift = this.scheduleDetail.scheduleShifts.filter(ss => ss.id === +this.appointment.shiftId);

        if (shift.length === 0) {
            this.appointment.shiftId = null;
            this.appointment.shift = new ScheduleShift();
            return;
        }
        else {
            this.appointment.shiftId = shift[0].id;
            this.appointment.shift = shift[0];

            this.loadTimeSlot(this.appointment.shiftId);

        }

    }

    onTimeSlotFocusOut() {
        console.log("onTimeSlotFocusOut");
        const timeSlot = this.scheduleShift.timeSlots.filter(ts => ts.id === +this.appointment.timeSlotId);

        if (timeSlot.length === 0) {
            this.appointment.timeSlotId = null;
            this.appointment.timeSlot = new TimeSlot();
            return;
        }
        else {
            this.appointment.timeSlotId = timeSlot[0].id;
            this.appointment.timeSlot = timeSlot[0];
        }
    }

    loadTimeSlot(shiftId) {
        const msg = new Message();

        // this._uiService.showSpinner();

        this._doctorScheduleService.getDoctorShiftViaId(shiftId).subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                // this.length = res.json().data;
                let data = res.json().data;

                this.scheduleShift = this._mappingService.mapScheduleShift(data);


            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    onSubmit() {
        const msg = new Message;
        // this._uiService.showSpinner();

        if (this.addPermission) {
            if (this.form.valid) {

                this.isSubmitted = true;
                this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");

                this._appointmentService.addAppointment(this.user.id, this.docId, this.appointment).subscribe(
                    (res) => {
                        console.log(res);
                        // this._uiService.hideSpinner();
                        this.isSubmitted = false;
                        this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");
                        msg.msg = res.json().message ? res.json().message : 'User added successfully.';
                        msg.msgType = MessageTypes.Information;
                        msg.autoCloseAfter = 400;
                        this._uiService.showToast(msg, 'info');
                        this.dialogRef.close(true);
                    },
                    (err) => {
                        console.log(err);
                        this.isSubmitted = false;
                        this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");
                        // this._uiService.hideSpinner();
                        this._authService.errStatusCheckResponse(err);
                    }
                );
            }
            else {
                // console.log("asd")
                this._formService.validateAllFormFields(this.form);
            }
        }
        else {
            let msg = this.utilityService.permissionMsg();
            this._uiService.showToast(msg, '');
        }
    }

    // onCancel
    onNoClick(): void {
        this.dialogRef.close(false);
    }
}
