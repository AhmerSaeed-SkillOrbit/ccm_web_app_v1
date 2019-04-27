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
import { PatientRecordService } from '../../core/services/patient/patient.record.service';

// import { ReportService } from '../../core/services/report/report.service';


@Component({
    selector: 'ccm-plan-summary',
    templateUrl: 'ccm.plan.summary.component.html',
    styleUrls: ["../ccm.plan.component.css"],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})
export class CcmPlanSummaryComponent implements OnInit, OnChanges, OnDestroy {

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

    ccmPlan: CcmPlan = new CcmPlan();

    healthParamList: HealthParam[] = [];

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private _utilityService: UtilityService,
        private _mappingService: MappingService,
        private route: ActivatedRoute,
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
                // this.loadGeneralInfo();
                this.loadCcmPlan();
                // this.loadReviewList();
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

    sentTo() {
        this._uiService.showSpinner();

        this._ccmPlanService.sendCcmPlanSummaryEmail(this.planId).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data;
                console.log('u Object', array);

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
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
                // let ccmPlan = this._mappingService.mapCcmPlan(array);

                // this.ccmPlan = this._utilityService.deepCopy(ccmPlan);
                // console.log('ccmPlan', ccmPlan);
                // console.log('this.ccmPlan', this.ccmPlan);


                this.loadReviewList();

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadReviewList() {
        const msg = new Message();
        let length = 0;
        // this.dataSource = new MatTableDataSource<User>(this.userList);
        // if (this.listPagePermission) {


        this._uiService.showSpinner();

        this._ccmPlanService.getReviewListCount(this.planId, null, null, null).subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                length = res.json().data;

                this._ccmPlanService.getReviewListPagination(this.planId, 0, length, null, null, null).subscribe(
                    (res) => {
                        // this.userList = res.json();
                        this._uiService.hideSpinner();
                        let array = res.json().data || [];
                        // console.log('res list:', array);
                        var uList: CcmPlanReview[] = [];
                        for (let i = 0; i < array.length; i++) {
                            let u = this._mappingService.mapCcmPlanReview(array[i]);
                            uList.push(u);
                        }
                        // this.ccmPlanReviewList = uList;


                        uList.forEach(element => {
                            this.ccmPlan.items.forEach((element1, index1) => {
                                if (element.ccmPlanItemName == element1.name) {
                                    this.ccmPlan.items[index1].ccmPlanReviews.push(element);
                                }

                                element1.itemGoals.forEach((element2, index2) => {

                                    if (element.ccmPlanItemGoalId == element2.id) {
                                        this.ccmPlan.items[index1].itemGoals[index2].ccmPlanReviews.push(element);
                                    }
                                });

                            });
                        });

                        // this.ccmPlan.ccmPlanReviews

                        console.log("map reviews ", this.ccmPlan);

                    },
                    (err) => {
                        console.log(err);
                        this._uiService.hideSpinner();
                        // this.dataSource = new MatTableDataSource<User>(this.userList);
                        // this._authService.errStatusCheck(err);
                    }
                );

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

        // }
        // else {
        //     this.isSpinner = false;
        //     let msg = this._utilityService.permissionMsg();
        //     this._uiService.showToast(msg, '');
        // }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.unsubscribe();
    }

}



