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
import { SocialReview } from '../../../core/models/user.record';
import { Permission } from '../../../core/models/permission';

// import { Config } from '../../../config/config';

@Component({
    selector: 'social-envoirnmental-review-tab',
    moduleId: module.id,
    templateUrl: 'social.envoirnmental.review.tab.component.html',
    // styleUrls: ['social.envoirnmental.review.tab.component.css'],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})

export class SocialEnvoirnmentalReviewTabComponent implements OnInit {

    @Input() id: number = null;
    @Input() isTabActive: boolean = false;

    userPermissions: Permission[] = [];

    viewPatientRecordPagePermission = false;
    addPatientRecordPagePermission = false;

    socialReviewAnswers: SocialReview[] = [];

    isSubmitted: boolean = false;

    socialReviews: SocialReview[] = [];

    private ngUnsubscribe: Subject<any> = new Subject();

    socialReviewFormGroup: FormGroup;

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

        this.socialReviewFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });

    }

    ngOnInit(): void {

        console.log("this.payLoad in parent on init =-=-==-=-=");

        // this.loadSocialReview();

        this.userPermissions = this._authService.getUserPermissions();

        // this.viewPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'view_patient_record');
        this.viewPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_patient_record');
        // this.viewPatientRecordPagePermission = true;

        // this.addPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'add_patient_record');
        this.addPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'add_patient_record');
        // this.addPatientRecordPagePermission = true;
        if (this.viewPatientRecordPagePermission || this.addPatientRecordPagePermission) {
            // this.loadSocialReview();
        }


    }


    ngOnChanges(changes: SimpleChanges): void {

        console.log("this.payLoad in parent RecoverySuit on change =-=-==-=-=");

        if (changes['isTabActive']) {

            if (this.isTabActive) {
                if (this.socialReviews.length == 0) {
                    // this.loadSocialReview();
                }

                this.loadSocialReviewAnwser();
            }

        }
    }


    initSR() {
        return this._formBuilder.group({
            'isPatientExamined': ["", Validators.compose([])],
            'answer': ["", Validators.compose([])],
        });
    }

    addSubForm(type) {

        // if (type == "sr") {
        // const control = <FormArray>this.socialReviewFormGroup.controls['activeMedicationListForm'];
        const control = <FormArray>this.socialReviewFormGroup.controls['form'];
        control.push(this.initSR());
        // }


    }

    removeSubForm(idx: number, type) {
        console.log("index ", idx);

        // if (type == "sr") {
        // const control = <FormArray>this.socialReviewFormGroup.controls['activeMedicationListForm'];
        const control = <FormArray>this.socialReviewFormGroup.controls['form'];
        control.removeAt(idx);
        // }

    }

    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    addMore(type) {


        // if (type == "sr") {
        let psData = new SocialReview();
        // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
        this.socialReviewAnswers.push(psData);
        this.addSubForm(type);
        // }



    }

    replaceText(text) {
        return this._utilityService.replaceConfigText(text);
    }

    loadSocialReviewAnwser() {

        this.clearFormArray(<FormArray>this.socialReviewFormGroup.controls['form']);
        this.socialReviewAnswers = [];

        this._uiService.showSpinner();

        this._patientRecordService.getSocialReviewAnswers(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var srList = [];
                for (let i = 0; i < array.length; i++) {
                    let sr = this._mappingService.mapSocialReview(array[i]);
                    srList.push(sr);
                    this.socialReviewAnswers.push(sr);
                    this.addSubForm("sr");
                }

                console.log('this.socialReviewAnswers', this.socialReviewAnswers);

                // this.socialReviewAnswers = amList;

                // if (this.socialReviewAnswers.length == 0) {
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


    onAnswerTypeSelect() {

    }

    onAddUpdateSrAnswer(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.questionAnswerFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.addUpdateSocialReviewAnswer(this.socialReviewAnswers[index], this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();

                this.socialReviewAnswers[index].answer.id = res.json().data;

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