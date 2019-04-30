import { Component, Input, OnInit, Inject, OnChanges, Output, EventEmitter, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
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

import { SetupService } from '../../core/services/setup/setup.service';
import { LogService } from '../../core/services/log/log.service';
import { Permission } from '../../core/models/permission';
// import { ReportService } from '../../core/services/report/report.service';


@Component({
    selector: 'patient-record',
    templateUrl: 'patient.record.component.html',
    // styleUrls: [],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})
export class PatientRecordComponent implements OnInit, OnChanges, OnDestroy {

    user: User;
    // country = new CountryInfo();
    isLogin: boolean;
    private ngUnsubscribe: Subject<any> = new Subject();

    userPermissions: Permission[] = [];

    viewPatientRecordPagePermission = false;
    addPatientRecordPagePermission = false;

    listFilter: string;

    isSpinner = false;

    patientId: number = null;

    payLoadChangeDetected: boolean;

    tab = {
        generalInfo: false,
        preliminaryAssessment: false,
        medication: false,
        psychologicalReview: false,
        socialEnvoirnmentalReview: false,
        preventiveScreening: false,
        historicalInformation: false,
        generalQuestions: false,

    }

    @ViewChild('dateRangePicker') dateRangePicker;

    constructor(
        private _uiService: UIService,
        private _router: Router,
        @Inject('IAuthService') private _authService: IAuthService,
        private _setupService: SetupService,
        private _utilityService: UtilityService,
        // private _logService: LogService,
        private datePipe: DatePipe,
        private route: ActivatedRoute,
        public dialog: MatDialog,
    ) {

        const id = this.route.snapshot.params['id'];

        this.patientId = id;

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

            // this.viewPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'view_patient_record');
            this.viewPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_patient_record');
            // this.viewPatientRecordPagePermission = true;
            // this.addPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'add_patient_record');
            this.addPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'add_patient_record');
            // this.addPatientRecordPagePermission = true;
            if (this.viewPatientRecordPagePermission || this.addPatientRecordPagePermission) {

            }
            else {
                this._router.navigate(['/permission']);
            }

            this.tab.generalInfo = true;

        }
    }

    ngAfterViewInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    ngDoCheck() {

        // if (this.payLoad.tabOptionCode != this.oldPayLoad.tabOptionCode) {
        //     console.log("ngDoCheck tabOptionCode");
        //     this.payLoadChangeDetected = true;
        // }


        // if (this.payLoadChangeDetected) {

        //     let object = this.utilityService.deepCopy(this.payLoad);
        //     let object1 = this.utilityService.deepCopy(this.payLoad);
        //     this.payLoad = object;
        //     this.oldPayLoad = object1;
        // }



        this.payLoadChangeDetected = false;
    }

    focusChange(event) {
        console.log("focusChange event", event);

    }

    selectedIndexChange(event) {
        console.log("selectedIndexChange event", event);

        // this.tabs.forEach((element, index) => {
        //     if (index == event) {
        //         this.tabs[index].isDefaultTab = true;

        //         this.payLoad.tabOptionCode = this.tabs[index].tabCode;

        //         if (this.tabs[index].tabCode == "recovery_suit" || this.tabs[index].tabCode == "recovery_execution") {
        //             this.isShowCaseNature = false;
        //         }
        //         else {
        //             this.isShowCaseNature = true;
        //         }
        //     }
        //     else {
        //         this.tabs[index].isDefaultTab = false;
        //     }

        // });
    }


    selectedTabChange(event) {
        console.log("selectedTabChange");
        console.log("event ", event);
        // this._logService.logMessage('selectedTabChange event');
        // this._logService.logMessage(event);

        if (event && event.tab) {

            if (event.tab.textLabel == "General Information") {

                this.tab.generalInfo = true;
                this.tab.preliminaryAssessment = false;
                this.tab.medication = false;
                this.tab.psychologicalReview = false;
                this.tab.socialEnvoirnmentalReview = false;
                this.tab.preventiveScreening = false;
                this.tab.historicalInformation = false;
                this.tab.generalQuestions = false;
            }
            else if (event.tab.textLabel == "Preliminary Assessment") {

                this.tab.generalInfo = false;
                this.tab.preliminaryAssessment = true;
                this.tab.medication = false;
                this.tab.psychologicalReview = false;
                this.tab.socialEnvoirnmentalReview = false;
                this.tab.preventiveScreening = false;
                this.tab.historicalInformation = false;
                this.tab.generalQuestions = false;
            }
            else if (event.tab.textLabel == "Medication") {
                this.tab.generalInfo = false;
                this.tab.preliminaryAssessment = false;
                this.tab.medication = true;
                this.tab.psychologicalReview = false;
                this.tab.socialEnvoirnmentalReview = false;
                this.tab.preventiveScreening = false;
                this.tab.historicalInformation = false;
                this.tab.generalQuestions = false;
            }
            else if (event.tab.textLabel == "Psychological Review") {
                this.tab.generalInfo = false;
                this.tab.preliminaryAssessment = false;
                this.tab.medication = false;
                this.tab.psychologicalReview = true;
                this.tab.socialEnvoirnmentalReview = false;
                this.tab.preventiveScreening = false;
                this.tab.historicalInformation = false;
                this.tab.generalQuestions = false;
            }
            else if (event.tab.textLabel == "Social / Envoirnmental Review") {
                this.tab.generalInfo = false;
                this.tab.preliminaryAssessment = false;
                this.tab.medication = false;
                this.tab.psychologicalReview = false;
                this.tab.socialEnvoirnmentalReview = true;
                this.tab.preventiveScreening = false;
                this.tab.historicalInformation = false;
                this.tab.generalQuestions = false;
            }
            else if (event.tab.textLabel == "Preventive Screening") {
                this.tab.generalInfo = false;
                this.tab.preliminaryAssessment = false;
                this.tab.medication = false;
                this.tab.psychologicalReview = false;
                this.tab.socialEnvoirnmentalReview = false;
                this.tab.preventiveScreening = true;
                this.tab.historicalInformation = false;
                this.tab.generalQuestions = false;
            }
            else if (event.tab.textLabel == "Historical Information") {
                this.tab.generalInfo = false;
                this.tab.preliminaryAssessment = false;
                this.tab.medication = false;
                this.tab.psychologicalReview = false;
                this.tab.socialEnvoirnmentalReview = false;
                this.tab.preventiveScreening = false;
                this.tab.historicalInformation = true;
                this.tab.generalQuestions = false;
            }
            else if (event.tab.textLabel == "General Questions") {
                this.tab.generalInfo = false;
                this.tab.preliminaryAssessment = false;
                this.tab.medication = false;
                this.tab.psychologicalReview = false;
                this.tab.socialEnvoirnmentalReview = false;
                this.tab.preventiveScreening = false;
                this.tab.historicalInformation = false;
                this.tab.generalQuestions = true;
            }
            else {
                this.tab.generalInfo = false;
                this.tab.preliminaryAssessment = false;
                this.tab.medication = false;
                this.tab.psychologicalReview = false;
                this.tab.socialEnvoirnmentalReview = false;
                this.tab.preventiveScreening = false;
                this.tab.historicalInformation = false;
                this.tab.generalQuestions = false;
            }

        }
        else {
            this.tab.generalInfo = false;
            this.tab.preliminaryAssessment = false;
            this.tab.medication = false;
            this.tab.psychologicalReview = false;
            this.tab.socialEnvoirnmentalReview = false;
            this.tab.preventiveScreening = false;
            this.tab.historicalInformation = false;
            this.tab.generalQuestions = false;
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.unsubscribe();
    }

}



