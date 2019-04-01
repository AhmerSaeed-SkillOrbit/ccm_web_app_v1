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

import { UIService } from '../../../core/services/ui/ui.service';
import { IAuthService } from '../../../core/services/auth/iauth.service';
// import { ReportService } from '../../../core/services/report/report.service';
import { UtilityService } from '../../../core/services/general/utility.service';
import { PatientRecordService } from '../../../core/services/patient/patient.record.service';
import { MappingService } from '../../../core/services/mapping/mapping.service';

import { Config } from '../../../config/config';
import { FormService } from '../../../core/services/form/form.service';


@Component({
    selector: 'general-info-tab',
    moduleId: module.id,
    templateUrl: 'general.info.tab.component.html',
    // styleUrls: ['general.info.tab.component.css'],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})

export class GeneralInfoTabComponent implements OnInit {

    @Input() id: number = null;
    @Input() isTabActive: boolean = false;

    patient: User = new User();

    genders = Config.gender;

    private ngUnsubscribe: Subject<any> = new Subject();

    generalInfoFormGroup: FormGroup;
    isSubmitted: boolean = false;

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private _utilityService: UtilityService,
        private _mappingService: MappingService,
        // private route: ActivatedRoute,
        // private _setupService: AdminSetupService,
        // private _router: Router,
        private _formService: FormService,
        private _formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private _patientRecordService: PatientRecordService,
        public dialog: MatDialog,
    ) {
        // this.currentURL = window.location.href;

        this.generalInfoFormGroup = this._formBuilder.group({

            'unqiuePatientId': [this.patient.firstName, Validators.compose([Validators.required])],
            'firstName': [this.patient.firstName, Validators.compose([Validators.required])],
            'middleName': [this.patient.firstName, Validators.compose([])],
            'lastName': [this.patient.lastName, Validators.compose([Validators.required])],
            'gender': [this.patient.gender, Validators.compose([])],
            'dateOfBirth': [this.patient.gender, Validators.compose([])],
            'age': [this.patient.age, Validators.compose([])],
            'email': [this.patient.email, Validators.compose([])],
            'telephoneNumber': [this.patient.phoneNumber, Validators.compose([])],

        });
        this.generalInfoFormGroup.get('email').disable();
    }

    ngOnInit(): void {

        console.log("this.payLoad in parent on init =-=-==-=-=");

        if (this.id) {

            this.loadGeneralInfo();

        }

    }


    ngOnChanges(changes: SimpleChanges): void {

        console.log("this.payLoad in parent RecoverySuit on change =-=-==-=-=");

        if (changes['isTabActive']) {

            if (this.isTabActive) {
                // this.loadReport();
            }

        }
    }

    loadGeneralInfo() {
        this._uiService.showSpinner();

        this._patientRecordService.getGeneralInfo(this.id).subscribe(
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

    dateChanged(event, type) {
        console.log('event', event.value);
        console.log('type', type);
        if (type == 'dob') {
            this.patient.dateOfBirth = this.datePipe.transform(this.patient.dateOfBirth, 'yyyy-MM-dd');
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.patient.dateOfBirth);
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

        if (this.generalInfoFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.saveGeneralInfo(this.patient).subscribe(
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
            this._formService.validateAllFormFields(this.generalInfoFormGroup);
        }

    }
}