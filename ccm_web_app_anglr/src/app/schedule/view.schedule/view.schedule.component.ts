import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { DatePipe } from '@angular/common';

import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Message, MessageTypes } from '../../core/models/message';

import { UserService } from '../../core/services/user/user.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { FormService } from '../../core/services/form/form.service';
import { Schedule, ScheduleDetail } from '../../core/models/schedule.model';
import { ScheduleService } from '../../core/services/schedule/schedule.service';
// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';

declare var libraryVar: any;

@Component({
    selector: 'view-schedule',
    moduleId: module.id,
    templateUrl: 'view.schedule.component.html',
    // styleUrls: ['invite.doctor.component.css']
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})
export class ViewScheduleComponent implements OnInit {


    hours: any;
    minutes: any;

    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    isLogin: any;

    schedule: Schedule = new Schedule()

    newUser: User = new User();
    userId: number = null;

    startDate: string = null;
    endDate: string = null;
    dateArray = new Array();

    isSpinner = false;

    viewSchedulePermission = false;

    isSubmitted: boolean = false;

    private ngUnsubscribe: Subject<any> = new Subject();

    formScheduleDetail: FormGroup;

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private _mappingService: MappingService,
        private _utilityService: UtilityService,
        private _scheduleService: ScheduleService,
        private _formService: FormService,
        private route: ActivatedRoute, private _router: Router,
        private _formBuilder: FormBuilder,
        private datePipe: DatePipe
    ) {
        this.currentURL = window.location.href;

        this.formScheduleDetail = _formBuilder.group({

            'startDate': [null, Validators.compose([Validators.required])],
            'endDate': [null, Validators.compose([Validators.required])],
            'scheduleDetail': this._formBuilder.array([]),
        });
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {

            // this.userId = id;
            // this.loadUserById();

            this.viewSchedulePermission = this._utilityService.checkUserPermission(this.user, 'view_doctor_schedule');
            // this.viewSchedulePermission = true;

            if (this.viewSchedulePermission) {

            }
            else {
                this._router.navigateByUrl('permission');
            }
        }

    }

    timeCheck(AC: AbstractControl) {
        console.log('timeCheck');
        const startTime = AC.get('startTime').value; // to get value in input tag
        const endTime = AC.get('endTime').value; // to get value in input tag
        const isOffDay = AC.get('isOffDay').value;
        if (startTime > endTime) {
            console.log('false');
            AC.get('endTime').setErrors({ minTime: true });
        } else {
            console.log('true');
            AC.get('endTime').setErrors(null);
            return null;
        }
        // }
    }

    timeCheckOld(AC: AbstractControl) {
        console.log('timeCheck');
        const startTime = AC.get('startTime').value; // to get value in input tag
        const endTime = AC.get('endTime').value; // to get value in input tag
        const isOffDay = AC.get('isOffDay').value;

        if (isOffDay) {

            AC.get('startTime').disable();
            AC.get('endTime').disable();

        }
        else {
            AC.get('startTime').enable();
            AC.get('endTime').enable();

            if (startTime > endTime) {
                console.log('false');
                AC.get('endTime').setErrors({ minTime: true });
            } else {
                console.log('true');
                AC.get('endTime').setErrors(null);
                return null;
            }
        }

        // }
    }

    offDayCheck(AC: AbstractControl) {
        console.log('offDayCheck');
        const isOffDay = AC.get('isOffDay').value; // to get value in input tag

        if (isOffDay) {
            console.log('false');
            AC.get('startTime').disable();
            AC.get('endTime').disable();
        } else {
            console.log('true');
            AC.get('startTime').enable();
            AC.get('endTime').enable();
            // return null;
        }
        // }
    }

    get scheduleDetailArray(): FormArray {
        return this.formScheduleDetail.get('scheduleDetail') as FormArray;
    }

    addScheduleDetails() {
        // let fg = this._formBuilder.group(new CollateralMeasurement());
        let fg = this._formBuilder.group({
            'scheduleDate': ["", Validators.compose([Validators.required])],
            'isOffDay': ["", Validators.compose([])],
            'startTime': ["", Validators.compose([Validators.required])],
            'endTime': ["", Validators.compose([Validators.required])],
            'shiftType': ["", Validators.compose([])],
        }
            ,
            {
                // validator: [this.offDayCheck, this.timeCheck], // your validation method
                validator: [this.timeCheck], // your validation method
            }
        );
        this.scheduleDetailArray.push(fg);

    }

    deleteScheduleDetails(idx: number, val = null) {
        // console.log(val, idx);
        this.scheduleDetailArray.removeAt(idx);

    }

    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    dateChanged(event, type) {
        console.log('event', event.value);
        console.log('type', type);
        if (type == 'startDate') {
            // this.schedule.startDate = this.datePipe.transform(this.schedule.startDate, 'yyyy-MM-dd');
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.schedule.startDate);
        }
        else if (type == 'endDate') {
            // this.schedule.endDate = this.datePipe.transform(this.schedule.endDate, 'yyyy-MM-dd');
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.schedule.endDate);
        }
    }

    onStartDateFocusOut() {
        console.log("onStartDateFocusOut");

        // if (this.startDate && this.endDate) {
        if (this.schedule.startDate && this.schedule.endDate) {

            // if (this._utilityService.dateDifferenceInDays(this.startDate, this.endDate) < 0) {
            if (this._utilityService.dateDifferenceInDays(this.schedule.startDate, this.schedule.endDate) < 0) {

                this.endDate = null;
                this.schedule.endDate = null;
                this.clearFormArray(this.scheduleDetailArray);
                this.schedule.scheduleDetails = [];
                this.dateArray = new Array();
            }
            else {
                this.clearFormArray(this.scheduleDetailArray);
                this.schedule.scheduleDetails = [];
                // this.dateArray = this.getDates(this.startDate, this.endDate);
                this.dateArray = this.getDates(this.schedule.startDate, this.schedule.endDate);

                console.log("this.dateArray ", this.dateArray);
                // this.totalTimeSpent = 0;
                // this.length = 0;
                // this.projectActivities = [];
                // this.dataSource = new MatTableDataSource<ProjectActivity>(this.projectActivities);

                // this.loadReportTimeSpent();
                // this.loadReportActivityList();
            }

        }

    }

    onEndDateFocusOut() {
        console.log("onEndDateFocusOut");

        // if (this.startDate && this.endDate) {
        if (this.schedule.startDate && this.schedule.endDate) {

            // if (this._utilityService.dateDifferenceInDays(this.startDate, this.endDate) < 0) {
            if (this._utilityService.dateDifferenceInDays(this.schedule.startDate, this.schedule.endDate) < 0) {

                this.endDate = null;
                this.schedule.endDate = null;

                this.clearFormArray(this.scheduleDetailArray);
                this.schedule.scheduleDetails = [];
                this.dateArray = new Array();
            }
            else {
                this.clearFormArray(this.scheduleDetailArray);
                this.schedule.scheduleDetails = [];

                // this.dateArray = this.getDates(this.startDate, this.endDate);
                this.dateArray = this.getDates(this.schedule.startDate, this.schedule.endDate);

                console.log("this.dateArray ", this.dateArray);
                // this.totalTimeSpent = 0;
                // this.length = 0;
                // this.projectActivities = [];
                // this.dataSource = new MatTableDataSource<ProjectActivity>(this.projectActivities);

                // this.loadReportTimeSpent();
                // this.loadReportActivityList();
            }

        }
    }

    onOffDayCheckFocusOut(index) {

        if (this.schedule.scheduleDetails[index].isOffDay) {

            this.schedule.scheduleDetails[index].startTime = null;
            this.schedule.scheduleDetails[index].endTime = null;
            this.scheduleDetailArray.at(index).get('startTime').disable();
            this.scheduleDetailArray.at(index).get('endTime').disable();
        }
        else {
            this.scheduleDetailArray.at(index).get('startTime').enable();
            this.scheduleDetailArray.at(index).get('endTime').enable();
            this.scheduleDetailArray.at(index).get('endTime').enable();
        }
    }

    onStartTimeFocusOut(index) {
        console.log("onStartTimeFocusOut index", index);
        console.log("this.schedule.scheduleDetails[index].startTime", this.schedule.scheduleDetails[index].startTime);
        // this.schedule.scheduleDetails[index].startTime

    }

    onEndTimeFocusOut(index) {
        console.log("onEndTimeFocusOut index", index);
        console.log("this.schedule.scheduleDetails[index].endtTime", this.schedule.scheduleDetails[index].endTime);
        // console.log("diff time", (this.schedule.scheduleDetails[index].startTime - this.schedule.scheduleDetails[index].endTime));
        if (this.schedule.scheduleDetails[index].endTime < this.schedule.scheduleDetails[index].startTime) {
            // this.scheduleDetailArray.controls[index].endTime.setErrors({ minTime: true });
        }
        else {

        }
        // this.schedule.scheduleDetails[index].endTime

    }

    getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));

            // console.log("currentDate", currentDate);
            // console.log("currentDate", new Date(currentDate));
            let sData = new ScheduleDetail();
            sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.schedule.scheduleDetails.push(sData);
            this.addScheduleDetails();



            var date = new Date(currentDate);
            date.setDate(date.getDate() + 1);

            currentDate = date;
            // currentDate = currentDate.addDays(1);

        }
        return dateArray;
    }

    onSubmit() {
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.formScheduleDetail.invalid) {
            const msg = new Message();
            msg.title = '';
            msg.iconType = '';


            // if (this.formScheduleDetail.controls['firstName'].hasError('required')) {
            //     msg.msg = 'First Name is required.';
            // } else if (this.formRegister.controls['lastName'].hasError('required')) {
            //     msg.msg = 'Last Name is required.';
            // } else {
            //     msg.msg = 'Validation failed.';
            // }
            msg.msg = 'Validation failed.';
            this._uiService.showToast(msg, '');

        }
        else if (this.formScheduleDetail.valid) {
            this.isSubmitted = true;
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._scheduleService.scheduleDoctor(this.user.id, this.schedule).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    // this._authServices.storeUser(this.userForm);

                    msg.msg = res.json() ? res.json().message : 'Schedule Successfully';
                    // msg.msg = 'You have successfully signed up';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');

                },
                (err) => {
                    console.log(err);
                    this.isSubmitted = false;
                    this._authService.errStatusCheckResponse(err);
                }
            );
        } else {
            // console.log("asd")
            this._formService.validateAllFormFields(this.formScheduleDetail);
        }

    }

    private createTime() {
        let hoursIds = Array.from({ length: 24 }, (x, i) => i);
        let minutesIds = Array.from({ length: 60 }, (x, i) => i);

        this.hours = hoursIds.map(h => h.toString().length == 1 ? '0' + h : h)
        this.minutes = minutesIds.map(h => h.toString().length == 1 ? '0' + h : h)
    }

    onlogOut() {

        let redirectUrl = 'login';
        this._authService.logoutUser();

        this.isUser = this._authService.getUser();
        if (this.isUser) {
            return;
        } else {
            this._router.navigate([redirectUrl]);
        }
    }


}
