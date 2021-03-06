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
import { Schedule, ScheduleDetail, ScheduleShift } from '../../core/models/schedule.model';
import { ScheduleService } from '../../core/services/schedule/schedule.service';
import { Config } from '../../config/config';
import { Permission } from '../../core/models/permission';
// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';

declare var libraryVar: any;

@Component({
    selector: 'add-schedule',
    moduleId: module.id,
    templateUrl: 'add.schedule.component.html',
    // styleUrls: ['invite.doctor.component.css']
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})
export class AddScheduleComponent implements OnInit {


    hours: any;
    minutes: any;

    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    currentDate = new Date();
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    userPermissions: Permission[] = [];
    isLogin: any;

    currentMonth: number;
    schedule: Schedule = new Schedule()

    newUser: User = new User();
    userId: number = null;


    months = Config.months;

    minYear = Config.year.min;
    maxYear = Config.year.max;
    years = [];

    shifts = Config.noOfShifts;

    noOfShift = null;

    setTimeAllData = [];

    startTime: string = null;
    endTime: string = null;

    startDate: string = null;
    endDate: string = null;
    dateArray = new Array();

    isSpinner = false;

    addSchedulePermission = false;

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

        // for (let index = this.minYear; index <= this.maxYear; index++) {
        //     this.years.push(index);
        // }

        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();

        console.log("this.currentMonth", this.currentMonth);


        let min = new Date().getFullYear();
        let max = min + 9;

        for (let index = min; index <= max; index++) {
            this.years.push(index);
        }

        this.schedule.year = min;


        this.formScheduleDetail = _formBuilder.group({

            'month': [null, Validators.compose([Validators.required])],
            'year': [null, Validators.compose([Validators.required])],
            'startDate': [null, Validators.compose([Validators.required])],
            'endDate': [null, Validators.compose([Validators.required])],
            'scheduleDetail': this._formBuilder.array([]),
        });
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.userPermissions = this._authService.getUserPermissions();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {

            // this.userId = id;
            // this.loadUserById();

            // this.addSchedulePermission = this._utilityService.checkUserPermission(this.user, 'add_doctor_schedule');
            this.addSchedulePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'add_doctor_schedule');
            // this.addSchedulePermission = true;

            if (this.addSchedulePermission) {

            }
            else {
                this._router.navigateByUrl('permission');
            }
        }

    }

    checkAndSetPermission() {
        this.userPermissions = this._authService.getUserPermissions();


        // <-- Appointment Management Permissions -->

        // this.pendingRequestListPagePermission = this._utilityService.checkUserPermission(this.user, 'support_staff_list_page');
        // this.pendingRequestListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'support_staff_list_page');
        // this.pendingRequestListPagePermission = true;
        // this.acceptedRequestListPagePermission = this._utilityService.checkUserPermission(this.user, 'support_staff_list_page');
        // this.acceptedRequestListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'support_staff_list_page');
        // this.acceptedRequestListPagePermission = true;
        // this.rejectedRequestListPagePermission = this._utilityService.checkUserPermission(this.user, 'support_staff_list_page');
        // this.rejectedRequestListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'support_staff_list_page');
        // this.rejectedRequestListPagePermission = true;

        // <-- /Appointment Management Permissions -->

    }

    timeCheck(AC: AbstractControl) {
        // console.log('timeCheck');
        const startTime = AC.get('startTime').value; // to get value in input tag
        const endTime = AC.get('endTime').value; // to get value in input tag
        // const isOffDay = AC.get('isOffDay').value;
        if (startTime > endTime) {
            // console.log('false');
            AC.get('endTime').setErrors({ minTime: true });
        } else {
            // console.log('true');
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

    initSD() {
        return this._formBuilder.group({
            //  ---------------------forms fields on x level ------------------------
            // 'X': ['X', [Validators.required, Validators.pattern('[0-9]{4}')]],
            'scheduleDate': ["", Validators.compose([Validators.required])],
            'isOffDay': ["", Validators.compose([])],
            'shift': ["", Validators.compose([])],
            'scheduleShift': this._formBuilder.array([]),
            // ---------------------------------------------------------------------
            // 'Ys': this._formBuilder.array([
            //     // this.initY()
            // ])
        });
    }

    initSS() {
        return this._formBuilder.group({
            //  ---------------------forms fields on y level ------------------------
            'startTime': ["", Validators.compose([])],
            'endTime': ["", Validators.compose([])],
            'patientAllowed': ["", Validators.compose([])],
            // ---------------------------------------------------------------------
        },
            {
                validator: [this.timeCheck]
            }
        )
    }

    addSD() {
        const control = <FormArray>this.formScheduleDetail.controls['scheduleDetail'];
        control.push(this.initSD());
    }


    addSS(index) {
        const control = (<FormArray>this.formScheduleDetail.controls['scheduleDetail']).at(index).get('scheduleShift') as FormArray;
        control.push(this.initSS());
    }

    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    onMonthYearFocusOut() {

        console.log("this.schedule.monthId", this.schedule.monthId)

        if ((this.schedule.monthId || this.schedule.monthId == 0) && this.schedule.year) {

            // let nowdate = new Date(this.schedule.startDate);
            let monthStartDay = new Date(this.schedule.year, this.schedule.monthId, 1);
            let monthEndDay = new Date(this.schedule.year, this.schedule.monthId + 1, 0);

            this.schedule.startDate = this.datePipe.transform(monthStartDay, 'yyyy-MM-dd');
            this.schedule.endDate = this.datePipe.transform(monthEndDay, 'yyyy-MM-dd');

            // if (this.startDate && this.endDate) {
            if (this.schedule.startDate && this.schedule.endDate) {


                // if (this._utilityService.dateDifferenceInDays(this.startDate, this.endDate) < 0) {
                if (this._utilityService.dateDifferenceInDays(this.schedule.startDate, this.schedule.endDate) < 0) {

                    this.endDate = null;
                    this.schedule.endDate = null;
                    // this.clearFormArray(this.scheduleDetailArray);

                    this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);

                    this.schedule.scheduleDetails = [];
                    this.dateArray = new Array();
                }
                else {

                    // this.clearFormArray(this.scheduleDetailArray);
                    this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);

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

        if (this.schedule.startDate) {
            var nowdate = new Date(this.schedule.startDate);
            var monthEndDay = new Date(nowdate.getFullYear(), nowdate.getMonth() + 1, 0);

            console.log("monthEndDay", monthEndDay);
            // this.schedule.endDate = monthEndDay.toDateString();

            this.schedule.endDate = this.datePipe.transform(monthEndDay, 'yyyy-MM-dd');


        }

        // if (this.startDate && this.endDate) {
        if (this.schedule.startDate && this.schedule.endDate) {


            // if (this._utilityService.dateDifferenceInDays(this.startDate, this.endDate) < 0) {
            if (this._utilityService.dateDifferenceInDays(this.schedule.startDate, this.schedule.endDate) < 0) {

                this.endDate = null;
                this.schedule.endDate = null;
                // this.clearFormArray(this.scheduleDetailArray);
                this.schedule.scheduleDetails = [];
                this.dateArray = new Array();
            }
            else {

                // this.clearFormArray(this.scheduleDetailArray);
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

                // this.clearFormArray(this.scheduleDetailArray);
                this.schedule.scheduleDetails = [];
                this.dateArray = new Array();
            }
            else {
                // this.clearFormArray(this.scheduleDetailArray);
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
        const control = <FormArray>this.formScheduleDetail.controls['scheduleDetail'];

        if (this.schedule.scheduleDetails[index].isOffDay) {

            // this.schedule.scheduleDetails[index].startTime = null;
            // this.schedule.scheduleDetails[index].endTime = null;
            // this.scheduleDetailArray.at(index).get('startTime').disable();
            // this.scheduleDetailArray.at(index).get('endTime').disable();

            this.schedule.scheduleDetails[index].noOfShift = null;

            control.at(index).get('shift').disable();

            this.clearFormArray((<FormArray>this.formScheduleDetail.controls['scheduleDetail']).at(index).get('scheduleShift') as FormArray);
            this.schedule.scheduleDetails[index].scheduleShifts = [];
        }
        else {
            // this.scheduleDetailArray.at(index).get('startTime').enable();
            // this.scheduleDetailArray.at(index).get('endTime').enable();

            control.at(index).get('shift').enable();
        }
    }


    onShiftAllFocusOut() {

        this.setTimeAllData = [];

        this.noOfShift = this.noOfShift ? this.noOfShift : 0;

        for (let index = 0; index < this.noOfShift; index++) {
            // const element = array[index];
            let ssd = new ScheduleShift();
            this.setTimeAllData.push(ssd);

        }

    }

    onStartTimeAllFocusOut() {

    }

    onEndTimeAllFocusOut() {

    }

    async setTimeForAll() {
        const msg = new Message();

        if (this.noOfShift) {

            await this.schedule.scheduleDetails.forEach((element, index) => {
                if (element.isOffDay) {
                    this.schedule.scheduleDetails[index].noOfShift = null;
                    this.schedule.scheduleDetails[index].scheduleShifts = [];
                    // this.schedule.scheduleDetails[index].startTime = null;
                    // this.schedule.scheduleDetails[index].endTime = null;
                }
                else {
                    // this.schedule.scheduleDetails[index].noOfShift = this.noOfShift;
                    // this.schedule.scheduleDetails[index].scheduleShifts = this.setTimeAllData;

                    this.schedule.scheduleDetails[index].noOfShift = this._utilityService.deepCopy(this.noOfShift);
                    this.schedule.scheduleDetails[index].scheduleShifts = this._utilityService.deepCopy(this.setTimeAllData);

                    // this.schedule.scheduleDetails[index].startTime = this.startTime;
                    // this.schedule.scheduleDetails[index].endTime = this.endTime;
                }

            });

            setTimeout(() => {

                this.schedule.scheduleDetails.forEach((element, index) => {
                    if (element.isOffDay) {
                        this.schedule.scheduleDetails[index].scheduleShifts = [];
                    }
                    else {
                        // this.schedule.scheduleDetails[index].scheduleShifts = this.setTimeAllData;
                        this.schedule.scheduleDetails[index].scheduleShifts = this._utilityService.deepCopy(this.setTimeAllData);
                    }

                });

            }, 500);

            // this._utilityService.deepCopy()





        }
        else {

            msg.msg = 'Time is not set';
            // msg.msg = 'You have successfully signed up';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
        }
    }

    onStartTimeFocusOut(index) {
        console.log("onStartTimeFocusOut index", index);
        // console.log("this.schedule.scheduleDetails[index].startTime", this.schedule.scheduleDetails[index].startTime);
        // this.schedule.scheduleDetails[index].startTime

    }

    onEndTimeFocusOut(index) {
        console.log("onEndTimeFocusOut index", index);
        // console.log("this.schedule.scheduleDetails[index].endtTime", this.schedule.scheduleDetails[index].endTime);
        // console.log("diff time", (this.schedule.scheduleDetails[index].startTime - this.schedule.scheduleDetails[index].endTime));
        // if (this.schedule.scheduleDetails[index].endTime < this.schedule.scheduleDetails[index].startTime) {
        //     // this.scheduleDetailArray.controls[index].endTime.setErrors({ minTime: true });
        // }
        // else {

        // }
        // this.schedule.scheduleDetails[index].endTime

    }

    onShiftFocusOut(index) {

        this.schedule.scheduleDetails[index].noOfShift;

        if (this.schedule.scheduleDetails[index].noOfShift && this.schedule.scheduleDetails[index].noOfShift >= 0) {
            // this.clearFormArray(this.scheduleDetailArray);
            this.clearFormArray((<FormArray>this.formScheduleDetail.controls['scheduleDetail']).at(index).get('scheduleShift') as FormArray);
            this.schedule.scheduleDetails[index].scheduleShifts = [];

            let max = this.schedule.scheduleDetails[index].noOfShift;


            for (let i = 0; i < max; i++) {

                let ssData = new ScheduleShift();

                this.schedule.scheduleDetails[index].scheduleShifts.push(ssData);
                this.addSS(index);

            }

            // let ssData = new ScheduleShift();
            // this.schedule.scheduleDetails[index].scheduleShifts.push(ssData);
            // this.addScheduleDetails();
        }
        else {

        }


    }

    getDates(startDate, stopDate) {

        startDate = new Date(startDate);
        stopDate = new Date(stopDate);

        var dateArray = new Array();
        var currentDate = startDate;

        console.log("startDate ", startDate);
        console.log("stopDate ", stopDate);
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));

            // console.log("currentDate", currentDate);
            // console.log("currentDate", new Date(currentDate));
            let sData = new ScheduleDetail();
            sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.schedule.scheduleDetails.push(sData);
            // this.addScheduleDetails();
            this.addSD();

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
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._scheduleService.scheduleDoctor(this.user.id, this.schedule).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    msg.msg = res.json() ? res.json().message : 'Schedule Successfully';
                    // msg.msg = 'You have successfully signed up';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');

                    // schedule/list
                    this._router.navigate(["/schedule/list"]);
                },
                (err) => {
                    console.log(err);
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
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
