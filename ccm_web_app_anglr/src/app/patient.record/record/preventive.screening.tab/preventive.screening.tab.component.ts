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
import { UtilityService } from '../../../core/services/general/utility.service';
import { MappingService } from '../../../core/services/mapping/mapping.service';
import { FormService } from '../../../core/services/form/form.service';
import { PatientRecordService } from '../../../core/services/patient/patient.record.service';
import { SetupService } from '../../../core/services/setup/setup.service';
import { PreventiveScreen, DiabeteSupplement } from '../../../core/models/user.record';
import { Permission } from '../../../core/models/permission';

// import { Config } from '../../../config/config';


@Component({
    selector: 'preventive-screening-tab',
    moduleId: module.id,
    templateUrl: 'preventive.screening.tab.component.html',
    // styleUrls: ['preventive.screening.tab.component.css'],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})

export class PreventiveScreeningTabComponent implements OnInit {

    @Input() id: number = null;
    @Input() isTabActive: boolean = false;

    userPermissions: Permission[] = [];

    viewPatientRecordPagePermission = false;
    addPatientRecordPagePermission = false;


    preventiveScreenAnswers: PreventiveScreen[] = [];
    diabeteSupplementAnswers: DiabeteSupplement[] = [];

    isSubmitted: boolean = false;

    preventiveScreens: PreventiveScreen[] = [];
    diabeteSupplements: DiabeteSupplement[] = [];

    private ngUnsubscribe: Subject<any> = new Subject();

    preventiveScreeningFormGroup: FormGroup;
    diabetesSupplementalFormGroup: FormGroup;

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
        private _patientRecordService: PatientRecordService,
        private datePipe: DatePipe,
        public dialog: MatDialog,
    ) {
        // this.currentURL = window.location.href;

        this.preventiveScreeningFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });

        this.diabetesSupplementalFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });
    }

    ngOnInit(): void {

        console.log("this.payLoad in parent on init =-=-==-=-=");

        // this.loadPreventiveScreen();

        this.userPermissions = this._authService.getUserPermissions();

        // this.viewPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'view_patient_record');
        this.viewPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_patient_record');
        // this.viewPatientRecordPagePermission = true;
        
        // this.addPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'add_patient_record');
        this.addPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'add_patient_record');
        // this.addPatientRecordPagePermission = true;
        if (this.viewPatientRecordPagePermission || this.addPatientRecordPagePermission) {
            // this.loadPreventiveScreen();
        }


    }


    ngOnChanges(changes: SimpleChanges): void {

        console.log("this.payLoad in parent RecoverySuit on change =-=-==-=-=");

        if (changes['isTabActive']) {

            if (this.isTabActive) {
                if (this.preventiveScreens.length == 0) {
                    // this.loadPreventiveScreen();
                }
                if (this.preventiveScreens.length == 0) {
                    // this.loadPreventiveScreen();
                }

                this.loadPreventiveScreenAnwser();
                this.loadDiabeteSupplementAnwser();
            }

        }
    }


    initPS() {
        return this._formBuilder.group({
            'isPatientExamined': ["", Validators.compose([])],
            'answer': ["", Validators.compose([])],
        });
    }

    initDS() {
        return this._formBuilder.group({
            'isPatientMeasure': ["", Validators.compose([])],
            'answer': ["", Validators.compose([])],
        });
    }

    addSubForm(type) {

        if (type == "ps") {
            // const control = <FormArray>this.preventiveScreeningFormGroup.controls['activeMedicationListForm'];
            const control = <FormArray>this.preventiveScreeningFormGroup.controls['form'];
            control.push(this.initPS());
        }
        else if (type == "ds") {
            // const control = <FormArray>this.diabetesSupplementalFormGroup.controls['activeMedicationListForm'];
            const control = <FormArray>this.diabetesSupplementalFormGroup.controls['form'];
            control.push(this.initDS());
        }


    }

    removeSubForm(idx: number, type) {
        console.log("index ", idx);

        if (type == "ps") {
            // const control = <FormArray>this.preventiveScreeningFormGroup.controls['activeMedicationListForm'];
            const control = <FormArray>this.preventiveScreeningFormGroup.controls['form'];
            control.removeAt(idx);
        }
        else if (type == "ds") {
            // const control = <FormArray>this.diabetesSupplementalFormGroup.controls['activeMedicationListForm'];
            const control = <FormArray>this.diabetesSupplementalFormGroup.controls['form'];
            control.removeAt(idx);
        }

    }

    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    addMore(type) {


        if (type == "ps") {
            let psData = new PreventiveScreen();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.preventiveScreenAnswers.push(psData);
            this.addSubForm(type);
        }
        else if (type == "ps") {
            let dsData = new DiabeteSupplement();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.diabeteSupplementAnswers.push(dsData);
            this.addSubForm(type);
        }



    }

    replaceText(text) {
        return this._utilityService.replaceConfigText(text);
    }

    loadPreventiveScreenAnwser() {

        this.clearFormArray(<FormArray>this.preventiveScreeningFormGroup.controls['form']);
        this.preventiveScreenAnswers = [];

        this._uiService.showSpinner();

        this._patientRecordService.getPsAnswers(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var psList = [];
                for (let i = 0; i < array.length; i++) {
                    let ps = this._mappingService.mapPreventiveScreen(array[i]);
                    psList.push(ps);
                    this.preventiveScreenAnswers.push(ps);
                    this.addSubForm("ps");
                }

                console.log('this.preventiveScreenAnswers', this.preventiveScreenAnswers);

                // this.preventiveScreenAnswers = amList;

                // if (this.preventiveScreenAnswers.length == 0) {
                //     this.addMore();
                // }

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadDiabeteSupplementAnwser() {

        this.clearFormArray(<FormArray>this.diabetesSupplementalFormGroup.controls['form']);
        this.diabeteSupplementAnswers = [];

        this._uiService.showSpinner();

        this._patientRecordService.getDsAnswers(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var dsList = [];
                for (let i = 0; i < array.length; i++) {
                    let ds = this._mappingService.mapDiabeteSupplement(array[i]);
                    dsList.push(ds);
                    this.diabeteSupplementAnswers.push(ds);
                    this.addSubForm("ds");
                }

                console.log('this.diabeteSupplementAnswers', this.diabeteSupplementAnswers);

                // this.diabeteSupplementAnswers = amList;

                // if (this.diabeteSupplementAnswers.length == 0) {
                //     this.addMore();
                // }

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }



    onAnswerTypeSelect() {

    }

    onAddUpdatePsAnswer(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.questionAnswerFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.addUpdatePsAnswer(this.preventiveScreenAnswers[index], this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();

                this.preventiveScreenAnswers[index].answer.id = res.json().data;

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


        // } else {
        //     // console.log("asd")
        //     this._formService.validateAllFormFields(this.questionAnswerFormGroup);
        // }

    }

    onAddUpdateDsAnswer(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.questionAnswerFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.addUpdateDsAnswer(this.diabeteSupplementAnswers[index], this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();

                this.diabeteSupplementAnswers[index].answer.id = res.json().data;

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


        // } else {
        //     // console.log("asd")
        //     this._formService.validateAllFormFields(this.questionAnswerFormGroup);
        // }

    }


}