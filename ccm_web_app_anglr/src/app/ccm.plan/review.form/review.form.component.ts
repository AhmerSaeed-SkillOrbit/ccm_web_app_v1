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
import { Permission } from '../../core/models/permission';
import { Region } from '../../core/models/region';
import { Country } from '../../core/models/country';
import { CcmPlan, CcmPlanItem, CcmPlanItemGoal, CcmPlanHealthParam, HealthParam, CcmPlanReview } from '../../core/models/user.ccm.plan';

import { UIService } from '../../core/services/ui/ui.service';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { SetupService } from '../../core/services/setup/setup.service';
import { LogService } from '../../core/services/log/log.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { FormService } from '../../core/services/form/form.service';
import { CcmPlanService } from '../../core/services/ccm.plan/ccm.plan.service';
import { UserService } from '../../core/services/user/user.service';
import { PatientRecordService } from '../../core/services/patient/patient.record.service';

import { Config } from '../../config/config';


@Component({
    selector: 'review-form',
    templateUrl: 'review.form.component.html',
    // styleUrls: [],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})
export class ReviewFormComponent implements OnInit, OnChanges, OnDestroy {

    user: User = new User;
    // country = new CountryInfo();
    isLogin: boolean;
    private ngUnsubscribe: Subject<any> = new Subject();

    userPermissions: Permission[] = [];

    addPermission = false;
    updatePermission = false;

    listFilter: string;

    isSubmitted = false;
    isSpinner = false;

    patientId: number = null;
    patient: User = new User;


    minItem = Config.item.min;
    maxItem = Config.item.max;

    minItemGoal = Config.itemGoal.min;
    maxItemGoal = Config.itemGoal.max;

    minHealthPanael = Config.healthPanael.min;
    maxHealthPanael = Config.healthPanael.max;

    @ViewChild('dateRangePicker') dateRangePicker;

    ccmPlanReviewFormGroup: FormGroup;

    planId: number = null;
    ccmPlan: CcmPlan = new CcmPlan();

    reviewId: number = null;
    ccmPlanReview: CcmPlanReview = new CcmPlanReview();

    selectedComponent: string = null;
    componentList: CcmPlanItem[] = [];

    selectedGoal: string = null;
    goalList: CcmPlanItemGoal[] = [];

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private _utilityService: UtilityService,
        private _mappingService: MappingService,
        private route: ActivatedRoute, private _router: Router,
        private _setupService: SetupService,
        private _patientRecordService: PatientRecordService,
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

        const rId = this.route.snapshot.params['rId'];

        this.reviewId = rId;

        this.ccmPlanReviewFormGroup = this._formBuilder.group({
            'reviewDate': ["", Validators.compose([Validators.required])],
            'component': ["", Validators.compose([])],
            'goal': ["", Validators.compose([])],
            'goalAcheive': ["", Validators.compose([])],
            'barrier': ["", Validators.compose([])],
            'comment': ["", Validators.compose([])],
        });


    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.userPermissions = this._authService.getUserPermissions();
        // check if a user is logged in
        this.isLogin = this._authService.isLoggedIn();
        // if (!this._authService.isLoggedIn()) {
        //     this._router.navigateByUrl('login');
        // }


        if (this.isLogin) {


            // this.addPermission = this._utilityService.checkUserPermission(this.user, 'take_ccm_plan_review');
            this.addPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'take_ccm_plan_review');
            // this.addPermission = true;
            // this.updatePermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
            this.updatePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'update_ccm_plan_review');
            // this.updatePermission = true;

            if ((this.addPermission && !this.reviewId) || (this.updatePermission && this.reviewId)) {

                if (this.patientId && this.planId) {
                    // this.loadUserById();
                    this.loadGeneralInfo();
                    this.loadCcmPlan();
                }
                if (this.reviewId) {
                    this.loadCcmPlanReview();
                }

            }
            else {
                this._router.navigate(['/permission']);
            }

        }

    }

    ngAfterViewInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    dateChanged(event, type) {
        console.log('event', event.value);
        console.log('type', type);
        if (type == 'reviewDate') {
            this.ccmPlanReview.reviewDate = this.datePipe.transform(this.ccmPlanReview.reviewDate, 'yyyy-MM-dd');
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.ccmPlanReview.reviewDate);

        }

    }

    onComponentChange() {
        this.ccmPlanReview.ccmPlanItemGoalId = null;
        this.ccmPlanReview.ccmPlanItemGoal = new CcmPlanItemGoal();

        const item = this.ccmPlan.items.filter(i => i.name === this.ccmPlanReview.ccmPlanItemName);

        if (item.length > 0) {
            this.goalList = item[0].itemGoals;
        }
        else {

            this.goalList = [];
        }

    }

    onGoalChange() {

        const goal = this.goalList.filter(g => g.id === this.ccmPlanReview.ccmPlanItemGoalId);

        if (goal.length > 0) {
            this.ccmPlanReview.ccmPlanItemGoal = goal[0];
        }
        else {

            this.ccmPlanReview.ccmPlanItemGoal = new CcmPlanItemGoal();
        }

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

    loadGeneralInfo() {
        this._uiService.showSpinner();

        this._patientRecordService.getGeneralInfo(this.patientId).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                const user = res.json().data;
                // console.log('u Object', user);
                // this.newUser = user;
                this.patient = this._mappingService.mapUser(user);
                console.log('patient general info', this.patient);
                // this.userId = this.user.id;
            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadCcmPlan() {

        this._uiService.showSpinner();

        this._ccmPlanService.getSingleCcmPlan(this.patientId, this.planId).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data;
                console.log('u Object', array);

                this.ccmPlan = this._mappingService.mapCcmPlan(array);


                this.componentList = this.ccmPlan.items;

                if (this.ccmPlanReview.ccmPlanItemName) {

                    const item = this.ccmPlan.items.filter(i => i.name === this.ccmPlanReview.ccmPlanItemName);

                    if (item.length > 0) {
                        this.goalList = item[0].itemGoals;
                    }
                    else {
                        this.goalList = [];
                    }


                }

                // let ccmPlan = this._mappingService.mapCcmPlan(array);

                // this.ccmPlan = this._utilityService.deepCopy(ccmPlan);
                // console.log('ccmPlan', ccmPlan);
                // console.log('this.ccmPlan', this.ccmPlan);

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadCcmPlanReview() {

        this._uiService.showSpinner();

        this._ccmPlanService.getSingleReview(this.reviewId).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data;
                console.log('u Object', array);

                this.ccmPlanReview = this._mappingService.mapCcmPlanReview(array);


                if (this.ccmPlanReview.ccmPlanItemName) {

                    const item = this.ccmPlan.items.filter(i => i.name === this.ccmPlanReview.ccmPlanItemName);

                    if (item.length > 0) {
                        this.goalList = item[0].itemGoals;
                    }
                    else {
                        this.goalList = [];
                    }


                }


                // let ccmPlan = this._mappingService.mapCcmPlan(array);

                // this.ccmPlan = this._utilityService.deepCopy(ccmPlan);
                // console.log('ccmPlan', ccmPlan);
                // console.log('this.ccmPlan', this.ccmPlan);

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    onSubmitCcmPlanReview() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        console.log("ccmPlan ", this.ccmPlan);

        if (this.ccmPlanReviewFormGroup.valid) {


            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            this._ccmPlanService.addUpdateCcmPlanReview(this.ccmPlanReview, this.ccmPlan, this.patientId).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    msg.msg = res.json() ? res.json().message : 'Review Updated Successfully';
                    // msg.msg = 'You have successfully signed up';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');

                    this._router.navigate(["/ccm/plan/review/list", this.patientId, this.planId]);

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
            this._formService.validateAllFormFields(this.ccmPlanReviewFormGroup);

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



