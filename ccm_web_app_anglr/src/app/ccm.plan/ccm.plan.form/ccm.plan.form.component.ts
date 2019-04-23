import { Component, Input, OnInit, Inject, OnChanges, Output, EventEmitter, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, FormArray } from "@angular/forms";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';

// import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';

import { Message, MessageTypes } from '../../core/models/message';
import { User } from '../../core/models/user';

import { UIService } from '../../core/services/ui/ui.service';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { Region } from '../../core/models/region';
import { Country } from '../../core/models/country';
import { CcmPlan, CcmPlanItem, CcmPlanItemGoal, CcmPlanHealthParam, HealthParam } from '../../core/models/user.ccm.plan';

import { SetupService } from '../../core/services/setup/setup.service';
import { LogService } from '../../core/services/log/log.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { FormService } from '../../core/services/form/form.service';
import { CcmPlanService } from '../../core/services/ccm.plan/ccm.plan.service';
import { Config } from '../../config/config';
import { UserService } from '../../core/services/user/user.service';

// import { ReportService } from '../../core/services/report/report.service';


@Component({
    selector: 'ccm-plan-form',
    templateUrl: 'ccm.plan.form.component.html',
    // styleUrls: [],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})
export class CcmPlanFormComponent implements OnInit, OnChanges, OnDestroy {

    user: User = new User;
    // country = new CountryInfo();
    isLogin: boolean;
    private ngUnsubscribe: Subject<any> = new Subject();

    preFileListPermission = false;
    addPermission = false;
    updatePermission = false;

    listFilter: string;

    isSubmitted = false;
    isSpinner = false;

    patientId: number = null;
    patient: User = new User;
    planId: number = null;

    minItem = Config.item.min;
    maxItem = Config.item.max;

    minItemGoal = Config.itemGoal.min;
    maxItemGoal = Config.itemGoal.max;

    minHealthPanael = Config.healthPanael.min;
    maxHealthPanael = Config.healthPanael.max;

    @ViewChild('dateRangePicker') dateRangePicker;

    ccmPlanFormGroup: FormGroup;

    ccmPlan: CcmPlan = new CcmPlan();

    healthParamList: HealthParam[] = [];

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private _utilityService: UtilityService,
        private _mappingService: MappingService,
        private route: ActivatedRoute,
        private _setupService: SetupService,
        private _userService: UserService,
        // private _router: Router,
        private _formService: FormService,
        private _formBuilder: FormBuilder,
        private _ccmPlanService: CcmPlanService,
        private datePipe: DatePipe,
        public dialog: MatDialog,
    ) {

        const paId = this.route.snapshot.params['paId'];

        this.patientId = paId;

        const planId = this.route.snapshot.params['planId'];

        this.planId = planId;

        this.ccmPlanFormGroup = this._formBuilder.group({
            'startDate': ["", Validators.compose([Validators.required])],
            'endDate': ["", Validators.compose([])],
            'itemForm': this._formBuilder.array([]),
            'healthReading': ["", Validators.compose([])],
            'healthParamForm': this._formBuilder.array([]),
        });

        this.addMore("itemForm", null);
        // this.addMore("itemGoalForm", 0);
        this.addMore("healthParam", null);

    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        // check if a user is logged in
        this.isLogin = this._authService.isLoggedIn();
        // if (!this._authService.isLoggedIn()) {
        //     this._router.navigateByUrl('login');
        // }


        if (this.isLogin) {

            if (this.patientId) {
                this.loadUserById();
            }

            if (this.patientId && this.planId) {

                this.loadCcmPlan();
            }

            this.loadHealthParams();

        }

        // this.preFileListPermission = this.utilityService.checkUserPermission(this.user, 'settlement_prefiling_list');
        // if (this.preFileListPermission) {
        //     this.addPermission = this.utilityService.checkUserPermission(this.user, 'settlement_prefiling_add');
        //     this.updatePermission = this.utilityService.checkUserPermission(this.user, 'settlement_prefiling_update');
        //     this.loadPrefileList();
        // }
        // else {
        //     this._router.navigate(['/permission']);
        // }


    }

    ngAfterViewInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    initItem() {
        return this._formBuilder.group({
            'component': ["", Validators.compose([Validators.required])],
            'goalForm': this._formBuilder.array([]),
        });
    }

    initItemGoal() {
        return this._formBuilder.group({
            'goal': ["", Validators.compose([])],
            'intervention': ["", Validators.compose([])],
        });
    }

    initCcmPlanHealthParam() {
        return this._formBuilder.group({
            'attribute': ["", Validators.compose([])],
            'attributeDate': ["", Validators.compose([])],
            'attributeValue': ["", Validators.compose([])],
        });
    }

    addSubForm(type) {
        if (type == "itemForm") {
            const control = <FormArray>this.ccmPlanFormGroup.controls['itemForm'];
            control.push(this.initItem());
        }
        else if (type == "healthParam") {
            const control = <FormArray>this.ccmPlanFormGroup.controls['healthParamForm'];
            control.push(this.initCcmPlanHealthParam());
        }
    }

    addItemGoalForm(ix) {
        const control = (<FormArray>this.ccmPlanFormGroup.controls['itemForm']).at(ix).get('goalForm') as FormArray;
        control.push(this.initItemGoal());
    }

    removeSubForm(idx: number, type: string, idxY: number) {
        console.log("index ", idx);
        console.log("type", type);

        if (type == "itemForm") {
            const control = <FormArray>this.ccmPlanFormGroup.controls['itemForm'];
            control.removeAt(idx);
        }
        if (type == "itemGoalForm") {
            const control = (<FormArray>this.ccmPlanFormGroup.controls['itemForm']).at(idx).get('goalForm') as FormArray;
            control.removeAt(idxY);
        }
        else if (type == "healthParam") {
            const control = <FormArray>this.ccmPlanFormGroup.controls['healthParamForm'];
            control.removeAt(idx);
        }

    }

    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    addMore(type, index, subForm: boolean = true) {

        console.log("type ", type);

        if (type == "itemForm") {
            let cpiData = new CcmPlanItem();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.ccmPlan.items.push(cpiData);

            this.addSubForm(type);

            if (subForm) {
                let subIndex = this.ccmPlan.items.length - 1;
                this.addMore("itemGoalForm", subIndex);
            }

        }
        else if (type == "healthParam") {
            let cphpData = new CcmPlanHealthParam();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            cphpData.readingDate = this.ccmPlan.startDate;
            this.ccmPlan.healthParams.push(cphpData);
            this.addSubForm(type);
        }
        else if (type == "itemGoalForm") {
            let cpigData = new CcmPlanItemGoal();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.ccmPlan.items[index].itemGoals.push(cpigData);
            this.addItemGoalForm(index);
        }

        console.log("this.ccmPlan ", this.ccmPlan);

    }

    remove(index, type, index1) {
        console.log("index ", index);
        console.log("type", type);

        if (type == "itemForm") {
            this.removeSubForm(index, type, index1);
            this.ccmPlan.items.splice(index, 1);
        }
        else if (type == "itemGoalForm") {
            this.removeSubForm(index, type, index1);
            this.ccmPlan.items[index].itemGoals.splice(index1, 1);
        }
        else if (type == "healthParam") {
            this.removeSubForm(index, type, null);
            this.ccmPlan.healthParams.splice(index, 1);
        }
    }

    dateChanged(event, type) {
        console.log('event', event.value);
        console.log('type', type);
        if (type == 'startDate') {
            this.ccmPlan.startDate = this.datePipe.transform(this.ccmPlan.startDate, 'yyyy-MM-dd');
            this.ccmPlan.endDate = null;
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.ccmPlan.startDate);

            this.ccmPlan.healthParams.forEach((element, index) => {
                this.ccmPlan.healthParams[index].readingDate = this.ccmPlan.startDate;
            });
        }
        if (type == 'endDate') {
            this.ccmPlan.endDate = this.datePipe.transform(this.ccmPlan.endDate, 'yyyy-MM-dd');
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.ccmPlan.endDate);
        }

    }

    onIsHealthParamChange() {

        if (this.ccmPlan.isHealthParam) {
            this.clearFormArray(<FormArray>this.ccmPlanFormGroup.controls['healthParamForm']);
            this.ccmPlan.healthParams = [];

            this.addMore("healthParam", null);
        }
        else {
            this.clearFormArray(<FormArray>this.ccmPlanFormGroup.controls['healthParamForm']);
            this.ccmPlan.healthParams = [];
        }

    }

    loadHealthParams() {
        // this._uiService.showSpinner();
        this._setupService.getHealthParamList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get health param', res.json().data);

                let array = res.json().data || [];
                // console.log('res list:', array);
                var hpList = [];
                for (let i = 0; i < array.length; i++) {
                    let u = this._mappingService.mapHealthParam(array[i]);
                    hpList.push(u);
                }
                this.healthParamList = hpList;

                console.log('healthParamList: ' + this.healthParamList);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadUserById() {
        // this._uiService.showSpinner();

        this._userService.getUserById(this.patientId).subscribe(
            (res) => {
                // this._uiService.hideSpinner();

                const user = res.data;
                console.log('u Object', user);
                // this.newUser = user;
                this.patient = this._mappingService.mapUser(user);
                console.log('newUser', this.patient);
                // this.userId = this.user.id;
            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadCcmPlan() {

        this.clearFormArray(<FormArray>this.ccmPlanFormGroup.controls['itemForm']);
        this.clearFormArray(<FormArray>this.ccmPlanFormGroup.controls['healthParamForm']);

        this._uiService.showSpinner();

        this._ccmPlanService.getSingleCcmPlan(this.patientId, this.planId).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data;
                console.log('u Object', array);

                this.ccmPlan = this._mappingService.mapCcmPlan(array);
                // let ccmPlan = this._mappingService.mapCcmPlan(array);

                // this.ccmPlan = this._utilityService.deepCopy(ccmPlan);
                // console.log('ccmPlan', ccmPlan);
                // console.log('this.ccmPlan', this.ccmPlan);

                if (this.ccmPlan.items && this.ccmPlan.items.length > 0) {

                    this.ccmPlan.items.forEach((element, index) => {

                        // this.addMore("itemForm", null, false);
                        this.addSubForm("itemForm");


                        if (element.itemGoals && element.itemGoals.length > 0) {

                            element.itemGoals.forEach(element1 => {
                                // this.addMore("itemGoalForm", index);
                                this.addItemGoalForm(index);
                            });
                        }
                        else {
                            this.addMore("itemGoalForm", index);
                        }


                    });

                }
                if (!(this.ccmPlan.items && this.ccmPlan.items.length > 0)) {
                    this.addMore("itemForm", null);
                    // this.addMore("itemGoalForm", 0);
                }

                if (this.ccmPlan.healthParams && this.ccmPlan.healthParams.length > 0) {

                    this.ccmPlan.healthParams.forEach((element, index) => {

                        // this.addMore("healthParam", null, false);
                        this.addSubForm("healthParam");

                    });

                }
                if (!(this.ccmPlan.healthParams && this.ccmPlan.healthParams.length > 0)) {
                    this.addMore("healthParam", null);
                }

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    addNewParam() {
        const msg = new Message();

        let newParam = (<HTMLInputElement>document.getElementById('new_attribute')).value;


        console.log("newParam ", newParam);

        if (newParam) {

            let healthParam: HealthParam = new HealthParam();

            healthParam.name = newParam;

            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            this._ccmPlanService.addHealthParam(healthParam).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();

                    (<HTMLInputElement>document.getElementById('new_attribute')).value = "";

                    this.loadHealthParams();

                    msg.msg = res.json() ? res.json().message : 'Health Param Added Successfully';
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


        }
        else {
            msg.msg = 'Field is empty';
            // msg.msg = 'You have successfully signed up';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
        }
    }

    onSubmitCcmPlan() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        console.log("ccmPlan ", this.ccmPlan);

        if (this.ccmPlanFormGroup.valid) {


            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            this._ccmPlanService.addUpdateCcmPlan(this.ccmPlan, this.patientId).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    msg.msg = res.json() ? res.json().message : 'Plan Updated Successfully';
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
            this._formService.validateAllFormFields(this.ccmPlanFormGroup);

            msg.msg = 'Validation Failed';
            // msg.msg = 'You have successfully signed up';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
        }

    }


    ngOnDestroy() {
        this.ngUnsubscribe.unsubscribe();
    }

}



