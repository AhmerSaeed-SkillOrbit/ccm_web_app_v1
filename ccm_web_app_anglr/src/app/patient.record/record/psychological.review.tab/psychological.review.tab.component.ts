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
import { PsychologicalReview, FunctionalReview } from '../../../core/models/user.record';
import { Permission } from '../../../core/models/permission';

// import { Config } from '../../../config/config';

@Component({
    selector: 'psychological-review-tab',
    moduleId: module.id,
    templateUrl: 'psychological.review.tab.component.html',
    // styleUrls: ['psychological.review.tab.component.css'],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})

export class PsychologicalReviewTabComponent implements OnInit {

    @Input() id: number = null;
    @Input() isTabActive: boolean = false;

    userPermissions: Permission[] = [];

    viewPatientRecordPagePermission = false;
    addPatientRecordPagePermission = false;


    psychologicalReviewAnswers: PsychologicalReview[] = [];
    functionalReviewAnswers: FunctionalReview[] = [];

    isSubmitted: boolean = false;

    psychologicalReviews: PsychologicalReview[] = [];
    functionalReviews: FunctionalReview[] = [];

    private ngUnsubscribe: Subject<any> = new Subject();

    psychologicalReviewFormGroup: FormGroup;
    functionalReviewFormGroup: FormGroup;

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

        this.psychologicalReviewFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });

        this.functionalReviewFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });
    }

    ngOnInit(): void {

        console.log("this.payLoad in parent on init =-=-==-=-=");

        // this.loadPsychologicalReview();

        this.userPermissions = this._authService.getUserPermissions();

        // this.viewPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'view_patient_record');
        this.viewPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_patient_record');
        // this.viewPatientRecordPagePermission = true;
        // this.addPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'add_patient_record');
        this.addPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'add_patient_record');
        // this.addPatientRecordPagePermission = true;
        if (this.viewPatientRecordPagePermission || this.addPatientRecordPagePermission) {
            // this.loadPsychologicalReview();
        }


    }


    ngOnChanges(changes: SimpleChanges): void {

        console.log("this.payLoad in parent RecoverySuit on change =-=-==-=-=");

        if (changes['isTabActive']) {

            if (this.isTabActive) {
                if (this.psychologicalReviews.length == 0) {
                    // this.loadPsychologicalReview();
                }
                if (this.functionalReviews.length == 0) {
                    // this.loadFunctionReview();
                }

                this.loadPsychologicalReviewAnwser();
                this.loadFunctionalReviewAnwser();
            }

        }
    }


    initPR() {
        return this._formBuilder.group({
            'isPatientExamined': ["", Validators.compose([])],
            'answer': ["", Validators.compose([])],
        });
    }

    initFR() {
        return this._formBuilder.group({
            'isOkay': ["", Validators.compose([])],
            'answer': ["", Validators.compose([])],
        });
    }

    addSubForm(type) {

        if (type == "pr") {
            // const control = <FormArray>this.psychologicalReviewFormGroup.controls['activeMedicationListForm'];
            const control = <FormArray>this.psychologicalReviewFormGroup.controls['form'];
            control.push(this.initPR());
        }
        else if (type == "fr") {
            // const control = <FormArray>this.functionalReviewFormGroup.controls['activeMedicationListForm'];
            const control = <FormArray>this.functionalReviewFormGroup.controls['form'];
            control.push(this.initFR());
        }


    }

    removeSubForm(idx: number, type) {
        console.log("index ", idx);

        if (type == "pr") {
            // const control = <FormArray>this.psychologicalReviewFormGroup.controls['activeMedicationListForm'];
            const control = <FormArray>this.psychologicalReviewFormGroup.controls['form'];
            control.removeAt(idx);
        }
        else if (type == "fr") {
            // const control = <FormArray>this.functionalReviewFormGroup.controls['activeMedicationListForm'];
            const control = <FormArray>this.functionalReviewFormGroup.controls['form'];
            control.removeAt(idx);
        }

    }

    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    addMore(type) {


        if (type == "pr") {
            let psData = new PsychologicalReview();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.psychologicalReviewAnswers.push(psData);
            this.addSubForm(type);
        }
        else if (type == "fr") {
            let dsData = new FunctionalReview();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.functionalReviewAnswers.push(dsData);
            this.addSubForm(type);
        }



    }

    replaceText(text) {
        return this._utilityService.replaceConfigText(text);
    }

    loadPsychologicalReviewAnwser() {

        this.clearFormArray(<FormArray>this.psychologicalReviewFormGroup.controls['form']);
        this.psychologicalReviewAnswers = [];

        this._uiService.showSpinner();

        this._patientRecordService.getPsychologicalReviewAnswers(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var psList = [];
                for (let i = 0; i < array.length; i++) {
                    let ps = this._mappingService.mapPsychologicalReview(array[i]);
                    psList.push(ps);
                    this.psychologicalReviewAnswers.push(ps);
                    this.addSubForm("pr");
                }

                console.log('this.psychologicalReviewAnswers', this.psychologicalReviewAnswers);

                // this.psychologicalReviewAnswers = amList;

                // if (this.psychologicalReviewAnswers.length == 0) {
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

    loadFunctionalReviewAnwser() {

        this.clearFormArray(<FormArray>this.functionalReviewFormGroup.controls['form']);
        this.functionalReviewAnswers = [];

        this._uiService.showSpinner();

        this._patientRecordService.getFunctionalReviewAnswers(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var frList = [];
                for (let i = 0; i < array.length; i++) {
                    let fr = this._mappingService.mapFunctionalReview(array[i]);
                    frList.push(fr);
                    this.functionalReviewAnswers.push(fr);
                    this.addSubForm("fr");
                }

                console.log('this.functionalReviewAnswers', this.functionalReviewAnswers);

                // this.functionalReviewAnswers = amList;

                // if (this.functionalReviewAnswers.length == 0) {
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

    onAddUpdatePRAnswer(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.questionAnswerFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.addUpdatePsychologicalReviewAnswer(this.psychologicalReviewAnswers[index], this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();

                this.psychologicalReviewAnswers[index].answer.id = res.json().data;

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

    onAddUpdateFRAnswer(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.questionAnswerFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.addUpdateFunctionalReviewAnswer(this.functionalReviewAnswers[index], this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();

                this.functionalReviewAnswers[index].answer.id = res.json().data;

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