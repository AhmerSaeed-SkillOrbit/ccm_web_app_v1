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
import { CcmPlan, CcmPlanItem, CcmPlanItemGoal, CcmPlanHealthParam, HealthParam, CcmPlanReview } from '../../core/models/user.ccm.plan';

import { SetupService } from '../../core/services/setup/setup.service';
import { LogService } from '../../core/services/log/log.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { FormService } from '../../core/services/form/form.service';
import { CcmPlanService } from '../../core/services/ccm.plan/ccm.plan.service';
import { Config } from '../../config/config';
import { UserService } from '../../core/services/user/user.service';

// import { ReportService } from '../../core/services/report/report.service';


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

    preFileListPermission = false;
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
        // check if a user is logged in
        this.isLogin = this._authService.isLoggedIn();
        // if (!this._authService.isLoggedIn()) {
        //     this._router.navigateByUrl('login');
        // }


        if (this.isLogin) {

            if (this.patientId && this.planId) {
                this.loadUserById();
                this.loadCcmPlan();
            }
            if (this.reviewId) {
                this.loadCcmPlanReview();
            }


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

    }

    onGoalChange() {

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

    onSubmitCcmPlan() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        console.log("ccmPlan ", this.ccmPlan);

        if (this.ccmPlanReviewFormGroup.valid) {


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



