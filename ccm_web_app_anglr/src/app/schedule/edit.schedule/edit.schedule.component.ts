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
import { DoctorScheduleService } from '../../core/services/doctor/doctor.schedule.service';
// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';

declare var libraryVar: any;

@Component({
    selector: 'edit-schedule',
    moduleId: module.id,
    templateUrl: 'edit.schedule.component.html',
    // styleUrls: ['invite.doctor.component.css']
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})
export class EditScheduleComponent implements OnInit {


    hours: any;
    minutes: any;

    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    currentDate = new Date();
    // script = new ScriptService();

    currentYear: number;
    currentMonth: number;

    isUser: User = new User();
    user: User = new User();
    userPermissions: Permission[] = [];
    isLogin: any;

    isMapping = false;
    schedule: Schedule = new Schedule()

    docId: number = null;
    month: number = null;
    year: number = null;


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

    updatePermission = false;

    isSubmitted: boolean = false;

    private ngUnsubscribe: Subject<any> = new Subject();

    formScheduleDetail: FormGroup;

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private _mappingService: MappingService,
        private _utilityService: UtilityService,
        private _scheduleService: ScheduleService,
        private _doctorScheduleService: DoctorScheduleService,
        private _formService: FormService,
        private route: ActivatedRoute, private _router: Router,
        private _formBuilder: FormBuilder,
        private datePipe: DatePipe
    ) {
        this.currentURL = window.location.href;

        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();

        // for (let index = this.minYear; index <= this.maxYear; index++) {
        //     this.years.push(index);
        // }

        // let min = new Date().getFullYear();
        // let max = min + 9;

        // for (let index = min; index <= max; index++) {
        //     this.years.push(index);
        // }


        this.formScheduleDetail = _formBuilder.group({

            'month': [null, Validators.compose([Validators.required])],
            'year': [null, Validators.compose([Validators.required])],
            'startDate': [null, Validators.compose([Validators.required])],
            'endDate': [null, Validators.compose([Validators.required])],
            'scheduleDetail': this._formBuilder.array([]),
        });

        this.formScheduleDetail.controls['month'].disable();
        this.formScheduleDetail.controls['year'].disable();
        this.formScheduleDetail.controls['startDate'].disable();
        this.formScheduleDetail.controls['endDate'].disable();
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.userPermissions = this._authService.getUserPermissions();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // const id = this.route.snapshot.params['id'];
        const month = this.route.snapshot.params['m'];
        const year = this.route.snapshot.params['y'];
        // console.log('this.isLogin', this.isLogin);

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {



            // this.updatePermission = this._utilityService.checkUserPermission(this.user, 'update_doctor_schedule_detail');
            this.updatePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'update_doctor_schedule_detail');
            // this.addSchedulePermission = true;

            if (this.updatePermission) {

                // this.docId = id;
                this.docId = this.user.id;
                this.month = +month;
                this.year = year;
                this.loadScheduleById();

            }
            else {
                this._router.navigateByUrl('permission');
            }
        }

    }

    loadScheduleById() {
        this._uiService.showSpinner();
        const control = <FormArray>this.formScheduleDetail.controls['scheduleDetail'];

        this._doctorScheduleService.getDocSchedule(this.docId, this.user.id, this.month, this.year).subscribe(

            (response) => {
                this._uiService.hideSpinner();
                // console.log("schedule res", response);
                let array = response.json().data;

                this.schedule = this._mappingService.mapSchedule(array);
                console.log("schedule1 ", this.schedule);

                this.isMapping = true;

                this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);

                this.schedule.scheduleDetails.forEach((element, index) => {
                    this.addSD();
                    if (element.isOffDay) {
                        this.schedule.scheduleDetails[index].noOfShift = null;
                        control.at(index).get('shift').disable();
                        this.clearFormArray((<FormArray>this.formScheduleDetail.controls['scheduleDetail']).at(index).get('scheduleShift') as FormArray);
                        this.schedule.scheduleDetails[index].scheduleShifts = [];
                    }
                    else {
                        // element.scheduleShifts.forEach(element1 => {

                        // });

                        if (this.schedule.scheduleDetails[index].noOfShift && this.schedule.scheduleDetails[index].noOfShift >= 0) {
                            // this.clearFormArray(this.scheduleDetailArray);
                            this.clearFormArray((<FormArray>this.formScheduleDetail.controls['scheduleDetail']).at(index).get('scheduleShift') as FormArray);
                            let sLength = this.schedule.scheduleDetails[index].scheduleShifts.length;

                            let max = this.schedule.scheduleDetails[index].noOfShift;


                            for (let i = 0; i < max; i++) {

                                if (i > (sLength - 1)) {
                                    let ssData = new ScheduleShift();
                                    this.schedule.scheduleDetails[index].scheduleShifts.push(ssData);
                                }
                                this.addSS(index);
                            }

                            // let ssData = new ScheduleShift();
                            // this.schedule.scheduleDetails[index].scheduleShifts.push(ssData);
                            // this.addScheduleDetails();
                        }
                    }
                });

                setTimeout(() => {
                    this.isMapping = false;
                }, 1000);


                console.log("schedule2", this.schedule);

            },
            (err) => {
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            }
        );

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

        if (this.schedule.year <= this.currentYear && this.currentMonth > this.schedule.monthId) {

            this.schedule.monthId = null;
            this.schedule.startDate = null;
            this.schedule.endDate = null;

            this.endDate = null;
            // this.clearFormArray(this.scheduleDetailArray);

            this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);

            this.schedule.scheduleDetails = [];
            this.dateArray = new Array();

        }

        if ((this.schedule.monthId || this.schedule.monthId == 0) && this.schedule.year) {

            // let nowdate = new Date(this.schedule.startDate);
            let monthStartDay = new Date(this.schedule.year, this.schedule.monthId, 1);
            let monthEndDay = new Date(this.schedule.year, this.schedule.monthId + 1, 0);

            this.schedule.startDateFull = monthStartDay;
            this.schedule.startDate = this.datePipe.transform(monthStartDay, 'yyyy-MM-dd');
            this.schedule.endDateFull = monthEndDay;
            this.schedule.endDate = this.datePipe.transform(monthEndDay, 'yyyy-MM-dd');

            // console.log("this.schedule.startDateFull", this.schedule.startDateFull)
            // console.log("this.schedule.endDateFull", this.schedule.endDateFull)

            // if (this.startDate && this.endDate) {
            if (this.schedule.startDate && this.schedule.endDate) {


                // if (this._utilityService.dateDifferenceInDays(this.startDate, this.endDate) < 0) {
                if (this._utilityService.dateDifferenceInDays(this.schedule.startDate, this.schedule.endDate) < 0) {

                    this.endDate = null;
                    this.schedule.endDate = null;
                    this.schedule.endDateFull = null;
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

                    // this.dateArray = this.getDates(this.schedule.startDate, this.schedule.endDate);
                    this.dateArray = this.getDates(this.schedule.startDateFull, this.schedule.endDateFull);

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

            this.schedule.endDateFull = monthEndDay;
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

                // this.dateArray = this.getDates(this.schedule.startDate, this.schedule.endDate);
                this.dateArray = this.getDates(this.schedule.startDateFull, this.schedule.endDateFull);

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







        }
        else {

            msg.msg = 'Time is not set';
            // msg.msg = 'You have successfully signed up';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
        }
    }

    onStartTimeFocusOut(index, index2) {
        // console.log("onStartTimeFocusOut index", index);
        // console.log("startTime", this.schedule.scheduleDetails[index].startTime);
        // console.log("startTime", this.schedule.scheduleDetails[index].scheduleShifts[index2].startTime);
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
        console.log("onShiftFocusOut index", index);

        if (!this.isMapping) {


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

    updateSchedule(scheduleDetail, index) {

        console.log("index", index);
        const control = <FormArray>this.formScheduleDetail.controls['scheduleDetail'];
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        console.log("control", control);
        console.log("control", control.controls[0]);
        console.log("control", control.controls[0].valid);

        // control.at(index).get('shift').disable();

        // if (this.formScheduleDetail.invalid) {
        if (!control.controls[index].valid) {
            // if (control.at(index).invalid) {
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
        // else if (control.at(index).valid) {
        else if (control.controls[index].valid) {
            this.isSubmitted = true;

            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._scheduleService.updateScheduleDoctor(scheduleDetail).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    msg.msg = res.json() ? res.json().message : 'Schedule Detail Successfully Updated';
                    // msg.msg = 'You have successfully signed up';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');

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
