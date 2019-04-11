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
import { QuestionAnswer, AnswerType } from '../../../core/models/user.record';

import { UIService } from '../../../core/services/ui/ui.service';
import { IAuthService } from '../../../core/services/auth/iauth.service';
// import { ReportService } from '../../../core/services/report/report.service';
import { UtilityService } from '../../../core/services/general/utility.service';
import { MappingService } from '../../../core/services/mapping/mapping.service';
import { FormService } from '../../../core/services/form/form.service';
import { PatientRecordService } from '../../../core/services/patient/patient.record.service';
import { SetupService } from '../../../core/services/setup/setup.service';


// import { Config } from '../../../config/config';


@Component({
    selector: 'general-questions-tab',
    moduleId: module.id,
    templateUrl: 'general.questions.tab.component.html',
    // styleUrls: ['general.questions.tab.component.css'],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})

export class GeneralQuestionsTabComponent implements OnInit {

    @Input() id: number = null;
    @Input() isTabActive: boolean = false;

    questionAnswers: QuestionAnswer[] = [];
    isSubmitted: boolean = false;

    answerTypes: AnswerType[] = [];

    private ngUnsubscribe: Subject<any> = new Subject();

    questionAnswerFormGroup: FormGroup;

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

        this.questionAnswerFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });
    }

    ngOnInit(): void {

        console.log("this.payLoad in parent on init =-=-==-=-=");

        this.loadAnswerType();

    }


    ngOnChanges(changes: SimpleChanges): void {

        console.log("this.payLoad in parent RecoverySuit on change =-=-==-=-=");

        if (changes['isTabActive']) {

            if (this.isTabActive) {

                if (this.answerTypes.length == 0) {
                    this.loadAnswerType();
                }

                // this.loadQuestions();
                this.loadQuestionAnwser();
            }

        }
    }

    initQA() {
        return this._formBuilder.group({
            'isAnswered': ["", Validators.compose([])],
            'answer': ["", Validators.compose([])],
        });
    }

    addSubForm() {
        // const control = <FormArray>this.questionAnswerFormGroup.controls['activeMedicationListForm'];
        const control = <FormArray>this.questionAnswerFormGroup.controls['form'];
        control.push(this.initQA());

    }

    removeSubForm(idx: number) {
        console.log("index ", idx);

        // const control = <FormArray>this.questionAnswerFormGroup.controls['activeMedicationListForm'];
        const control = <FormArray>this.questionAnswerFormGroup.controls['form'];
        control.removeAt(idx);
    }

    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    addMore(type) {

        let qaData = new QuestionAnswer();
        // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
        this.questionAnswers.push(qaData);
        this.addSubForm();


    }

    replaceText(text) {
        return this._utilityService.replaceConfigText(text);
    }

    loadAnswerType() {
        // this._uiService.showSpinner();
        this._setupService.getAnswerTypeList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get AnswerTypeList', res.json().data);

                let array = res.json().data || null;
                var atList = [];
                if (array) {
                    for (let key in array) {
                        let at: AnswerType = new AnswerType();
                        at.name = array[key];
                        at.code = key;
                        atList.push(at);
                        // console.log('key: ' + key + ',  value: ' + array[key]);
                    }
                }

                this.answerTypes = atList;

                console.log('answerTypes: ' + this.answerTypes);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadQuestions() {

        // this.clearFormArray(<FormArray>this.questionAnswerFormGroup.controls['form']);
        // this.activeMedications = [];

        this._uiService.showSpinner();

        this._setupService.getQuestionList().subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var qList = [];
                for (let i = 0; i < array.length; i++) {
                    // let q = this._mappingService.mapActiveMedication(array[i]);
                    // qList.push(q);
                    // this.activeMedications.push(q);
                    // this.addSubForm("activeMedicationListForm");
                }

                // if (this.activeMedications.length == 0) {
                //     this.addMore("activeMedicationListForm");
                // }

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadQuestionAnwser() {

        this.clearFormArray(<FormArray>this.questionAnswerFormGroup.controls['form']);
        this.questionAnswers = [];

        this._uiService.showSpinner();

        this._patientRecordService.getQuestionAnswers(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var amList = [];
                for (let i = 0; i < array.length; i++) {
                    let qa = this._mappingService.mapQuestionAnswer(array[i]);
                    amList.push(qa);
                    this.questionAnswers.push(qa);
                    this.addSubForm();
                }

                console.log('this.questionAnswers', this.questionAnswers);

                // this.questionAnswers = amList;

                // if (this.questionAnswers.length == 0) {
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

    onAddAnswer(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.questionAnswerFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.addAnswer(this.questionAnswers[index], this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();

                // this.questionAnswers[index].answer.id = res.json().data;

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

    onUpdateAnswer(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.questionAnswerFormGroup.valid) {

        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.updateAnswer(this.questionAnswers[index], this.id).subscribe(
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

        // } else {
        //     // console.log("asd")
        //     this._formService.validateAllFormFields(this.questionAnswerFormGroup);
        // }

    }

}