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

    preFileListPermission = false;
    addPermission = false;
    updatePermission = false;

    listFilter: string;

    isSpinner = false;

    patientId: number = null;

    payLoadChangeDetected: boolean;

    isShowCaseNature: boolean = true;
    showFlag: boolean = false;

    @ViewChild('dateRangePicker') dateRangePicker;

    constructor(
        private _uiService: UIService,
        private _router: Router,
        @Inject('IAuthService') private _authService: IAuthService,
        private _setupService: SetupService,
        private utilityService: UtilityService,
        private datePipe: DatePipe,
        private route: ActivatedRoute,
        public dialog: MatDialog,
    ) {

        const id = this.route.snapshot.params['id'];

        this.patientId = id;

    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        // check if a user is logged in
        this.isLogin = this._authService.isLoggedIn();
        // if (!this._authService.isLoggedIn()) {
        //     this._router.navigateByUrl('login');
        // }

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

    ngDoCheck() {

        // if (this.payLoad.tabOptionCode != this.oldPayLoad.tabOptionCode) {
        //     console.log("ngDoCheck tabOptionCode");
        //     this.payLoadChangeDetected = true;
        // }

        // if (this.payLoad.dateFrom !== this.oldPayLoad.dateFrom) {
        //     console.log("ngDoCheck dateFrom");
        //     this.payLoadChangeDetected = true;
        // }

        // if (this.payLoad.showFlag !== this.oldPayLoad.showFlag) {
        //     console.log("ngDoCheck showFlag");
        //     this.payLoadChangeDetected = true;
        // }

        // if (this.payLoad.dateTo !== this.oldPayLoad.dateTo) {
        //     console.log("ngDoCheck dateTo");
        //     this.payLoadChangeDetected = true;
        // }

        // if (this.payLoad.caseLcUserId !== this.oldPayLoad.caseLcUserId) {

        //     console.log("ngDoCheck caseLcUserId");
        //     this.payLoadChangeDetected = true;
        //     // this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
        //     // this.oldHeroName = this.hero.name;
        // }

        // if (this.payLoad.regionId !== this.oldPayLoad.regionId) {
        //     console.log("ngDoCheck regionId");
        //     this.payLoadChangeDetected = true;
        // }

        // if (this.payLoad.departmentId !== this.oldPayLoad.departmentId) {
        //     console.log("ngDoCheck departmentId");
        //     this.payLoadChangeDetected = true;
        // }

        // if (this.payLoad.caseTerritoryId !== this.oldPayLoad.caseTerritoryId) {
        //     console.log("ngDoCheck caseTerritoryId");
        //     this.payLoadChangeDetected = true;
        // }

        // if (this.payLoad.criticalOptionCode != this.oldPayLoad.criticalOptionCode) {
        //     console.log("ngDoCheck criticalOptionCode");
        //     this.payLoadChangeDetected = true;
        // }

        // if (this.payLoad.caseStatusCode != this.oldPayLoad.caseStatusCode) {
        //     console.log("ngDoCheck caseStatusCode");
        //     this.payLoadChangeDetected = true;
        // }

        // if (this.payLoad.caseNatureCode != this.oldPayLoad.caseNatureCode) {
        //     console.log("ngDoCheck caseNatureCode");
        //     this.payLoadChangeDetected = true;
        // }

        // if (this.payLoad.keyword != this.oldPayLoad.keyword) {
        //     console.log("ngDoCheck keyword");
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
        console.log("event", event);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.unsubscribe();
    }

}



