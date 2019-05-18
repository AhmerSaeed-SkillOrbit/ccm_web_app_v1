import { Component, OnInit, Inject, ViewChild, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';

import { Message, MessageTypes } from '../../../core/models/message';
import { User } from '../../../core/models/user';
import { Permission } from '../../../core/models/permission';
import { Tab } from '../../../core/models/tab';
import { CptOption } from '../../../core/models/cpt.option';

import { UIService } from '../../../core/services/ui/ui.service';
import { IAuthService } from '../../../core/services/auth/iauth.service';
// import { ReportService } from '../../../core/services/report/report.service';
import { UtilityService } from '../../../core/services/general/utility.service';
import { PatientRecordService } from '../../../core/services/patient/patient.record.service';
import { MappingService } from '../../../core/services/mapping/mapping.service';
import { FormService } from '../../../core/services/form/form.service';

import { Config } from '../../../config/config';
import { SetupService } from '../../../core/services/setup/setup.service';


@Component({
    selector: 'cpt-code-tab',
    moduleId: module.id,
    templateUrl: 'cpt.code.tab.component.html',
    // styleUrls: ['cpt.code.tab.component.css'],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})

export class CptCodeTabComponent implements OnInit {

    @Input() id: number = null;
    @Input() isTabActive: boolean = false;
    @Input() tab: Tab = new Tab();

    userPermissions: Permission[] = [];

    viewPatientRecordPagePermission = false;
    addPatientRecordPagePermission = false;

    patient: User = new User();
    // patientCptCodeOptionIds: number[] = [];
    patientCptCodeOptionIds: string[] = [];
    patientCptCodeOptions: CptOption[] = [];

    cptCodeOptions: CptOption[] = [];

    genders = Config.gender;

    private ngUnsubscribe: Subject<any> = new Subject();

    cptCodeFormGroup: FormGroup;
    isSubmitted: boolean = false;

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private _utilityService: UtilityService,
        private _mappingService: MappingService,
        // private route: ActivatedRoute,
        private _setupService: SetupService,
        // private _router: Router,
        private _formService: FormService,
        private _formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private _patientRecordService: PatientRecordService,
        public dialog: MatDialog,
    ) {
        // this.currentURL = window.location.href;

        this.cptCodeFormGroup = this._formBuilder.group({
            // 'cptCode': [this.patient.cptCodeId, Validators.compose([])],
            'cptCode': [null, Validators.compose([])],
        });
    }

    ngOnInit(): void {
        console.log("this.payLoad in parent on init =-=-==-=-=");

        // if (this.id) {
        //     this.loadGeneralInfo();
        // }

        this.userPermissions = this._authService.getUserPermissions();

        // this.viewPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'view_patient_record');
        this.viewPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_patient_record');
        // this.viewPatientRecordPagePermission = true;

        // this.addPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'add_patient_record');
        this.addPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'add_patient_record');
        // this.addPatientRecordPagePermission = true;
        if (this.viewPatientRecordPagePermission || this.addPatientRecordPagePermission) {

        }

    }


    ngOnChanges(changes: SimpleChanges): void {

        console.log("this.payLoad in parent RecoverySuit on change =-=-==-=-=");

        if (changes['isTabActive']) {

            if (this.isTabActive) {
                if (this.id) {

                    this.loadCptOptionList();
                    this.loadPatientCptInfo();
                }
            }

        }
    }

    loadCptOptionList() {
        // this._uiService.showSpinner();
        this._setupService.getCcmCptOptionList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                // console.log('get Patient Type', res.json().data);

                let array = res.json().data || [];
                // console.log('u Object', array);
                // console.log('res list:', array);
                var coList = [];
                for (let i = 0; i < array.length; i++) {

                    let co: CptOption = new CptOption()

                    co = this._mappingService.mapCptOption(array[i]);
                    coList.push(co);
                }
                this.cptCodeOptions = coList;

                // console.log('patientTypes', this.patientTypes);


            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadPatientCptInfo() {
        this._uiService.showSpinner();

        this._patientRecordService.getPatientCcmCptOptionAll(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                // console.log('u Object', array);
                // console.log('res list:', array);
                var coIdList = [];
                var coList = [];
                for (let i = 0; i < array.length; i++) {

                    let co: CptOption = new CptOption();
                    let coId: string = null;

                    co = this._mappingService.mapCptOption(array[i]);
                    coId = this._mappingService.mapCptOption(array[i]).id.toString();
                    coList.push(co);
                    coIdList.push(coId);
                }
                this.patientCptCodeOptions = coList;
                this.patientCptCodeOptionIds = coIdList;

                console.log('patientCptCodeOptionIds:', this.patientCptCodeOptionIds);
            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            }
        );

    }

    onCptCodeSelect() {

        console.log("onCptCodeSelect");

        console.log("test", this.patientCptCodeOptionIds)
        console.log("test", this.patientCptCodeOptions)

        let co = [];
        this.patientCptCodeOptionIds.forEach(element => {
            const cptCodeOption = this.cptCodeOptions.filter(c => c.id == +element);

            if (cptCodeOption.length > 0) {
                co.push(cptCodeOption[0]);
            }
        })
        this.patientCptCodeOptions = co;
    }

    dateChanged(event, type) {
        console.log('event', event.value);
        console.log('type', type);
        if (type == 'dob') {
            this.patient.dateOfBirth = this.datePipe.transform(this.patient.dateOfBirth, 'yyyy-MM-dd');
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.patient.dateOfBirth);

            let currentDate = new Date();

            let age = this._utilityService.dateDifferenceInYears(this.patient.dateOfBirth, currentDate);
            this.patient.age = age;
            console.log('age', age);
        }
        // else if (type == 'endDate') {
        //     // this.schedule.endDate = this.datePipe.transform(this.schedule.endDate, 'yyyy-MM-dd');
        //     // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
        //     console.log('event', this.schedule.endDate);
        // }
    }


    onSubmit() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.cptCodeFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addPatientCcmCptOption(this.patientCptCodeOptions, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    msg.msg = res.json() ? res.json().message : 'Record Updated Successfully';
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
            this._formService.validateAllFormFields(this.cptCodeFormGroup);
        }

    }

    publishUnPublishTab(type) {

        if (type == 'publish') {

            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.publishTab(this.id, this.tab).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);
                    this.tab.isPublish = true;

                    msg.msg = res.json() ? res.json().message : 'Updated Successfully';
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

            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.unPublishTab(this.id, this.tab).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);
                    this.tab.isPublish = false;

                    msg.msg = res.json() ? res.json().message : 'Updated Successfully';
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

    }
}