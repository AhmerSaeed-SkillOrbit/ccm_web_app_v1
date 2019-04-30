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

import { Config } from '../../../config/config';
import { PatientRecordService } from '../../../core/services/patient/patient.record.service';
import { MappingService } from '../../../core/services/mapping/mapping.service';
import { HealthCareHistory, HospitalizationHistory, SurgeryHistory, PatientOrganizationAssistance, AssistanceType } from '../../../core/models/user.record';
import { FormService } from '../../../core/services/form/form.service';
import { SetupService } from '../../../core/services/setup/setup.service';
import { Permission } from '../../../core/models/permission';


@Component({
    selector: 'historical-information-tab',
    moduleId: module.id,
    templateUrl: 'historical.information.tab.component.html',
    // styleUrls: ['historical.information.tab.component.css'],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})

// export class HistoricalInformationTabComponent implements OnInit {
export class HistoricalInformationTabComponent implements OnInit {

    @Input() id: number = null;
    @Input() isTabActive: boolean = false;

    userPermissions: Permission[] = [];

    viewPatientRecordPagePermission = false;
    addPatientRecordPagePermission = false;

    patient: User = new User();

    healthCareHistories: HealthCareHistory[] = [];
    hospitalizationHistories: HospitalizationHistory[] = [];
    surgeryHistories: SurgeryHistory[] = [];
    patientOrganizationAssistances: PatientOrganizationAssistance[] = [];

    assistanceTypes: AssistanceType[] = [];

    genders = Config.gender;

    private ngUnsubscribe: Subject<any> = new Subject();

    // medicationFormGroup: FormGroup;
    healthCareHistoryFormGroup: FormGroup;
    hospitalizationHistoryFormGroup: FormGroup;
    surgeryHistoryFormGroup: FormGroup;
    patientOrganizationAssistanceFormGroup: FormGroup;
    isSubmitted: boolean = false;

    minHealthCareHistory = Config.healthCareHistory.min;
    maxHealthCareHistory = Config.healthCareHistory.max;
    minHospitalizationHistory = Config.hospitalizationHistory.min;
    maxHospitalizationHistory = Config.hospitalizationHistory.max;
    minSurgeryHistory = Config.surgeryHistory.min;
    maxSurgeryHistory = Config.surgeryHistory.max;
    minVaccine = Config.vaccine.min;
    maxVaccine = Config.vaccine.max;

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

        // this.medicationFormGroup = this._formBuilder.group({

        //     'healthCareHistoryListForm': this._formBuilder.array([]),
        //     'hospitalizationHistoryListForm': this._formBuilder.array([]),
        //     'surgeryHistoryListForm': this._formBuilder.array([]),
        //     'immunizationsForm': this._formBuilder.array([]),
        // });
        this.healthCareHistoryFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });

        this.hospitalizationHistoryFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });

        this.surgeryHistoryFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });

        this.patientOrganizationAssistanceFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });
    }

    ngOnInit(): void {

        console.log("this.payLoad in parent on init =-=-==-=-=");

        // this.loadAssistanceOrganization();

        this.userPermissions = this._authService.getUserPermissions();

        // this.viewPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'view_patient_record');
        this.viewPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_patient_record');
        // this.viewPatientRecordPagePermission = true;
        // this.addPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'add_patient_record');
        this.addPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'add_patient_record');
        // this.addPatientRecordPagePermission = true;
        if (this.viewPatientRecordPagePermission || this.addPatientRecordPagePermission) {
            // this.loadAssistanceOrganization();
        }

    }


    ngOnChanges(changes: SimpleChanges): void {

        console.log("this.isTabActive in parent on change =-=-==-=-=");

        if (changes['isTabActive']) {

            if (this.isTabActive) {
                if (this.id) {
                    this.loadHealthCareHistories();
                    this.loadHospitalizationHistories();
                    this.loadSurgeryHistories();
                    // this.loadPatientOrganizationAssistances();
                    this.loadAssistanceOrganization();
                }
            }

        }
    }

    initHCH() {
        return this._formBuilder.group({
            'provider': ["", Validators.compose([Validators.required])],
            'lastVisitDate': ["", Validators.compose([])],
            'visitReason': ["", Validators.compose([])],
        });
    }

    initHH() {
        return this._formBuilder.group({
            'hospitalName': ["", Validators.compose([Validators.required])],
            'hospitalizedDate': ["", Validators.compose([])],
            'isHospitalized': ["", Validators.compose([])],
            'patientComments': ["", Validators.compose([])]
        });
    }

    initSH() {
        return this._formBuilder.group({
            'diagnoseDescription': ["", Validators.compose([Validators.required])],
            'diagnoseDate': ["", Validators.compose([])],
            'needAttention': ["", Validators.compose([])],
            'currentProblem': ["", Validators.compose([])]
        });
    }

    initPAO() {
        return this._formBuilder.group({
            // 'assistanceType': ["", Validators.compose([Validators.required])],
            'organizationAssistance': ["", Validators.compose([])],
            'organization': ["", Validators.compose([])],
            'telephoneNumber': ["", Validators.compose([])],
            'isPatientRefused': ["", Validators.compose([])],
        });
    }

    addSubForm(type) {
        if (type == "healthCareHistoryListForm") {
            const control = <FormArray>this.healthCareHistoryFormGroup.controls['form'];
            control.push(this.initHCH());
        }
        else if (type == "hospitalizationHistoryListForm") {
            const control = <FormArray>this.hospitalizationHistoryFormGroup.controls['form'];
            control.push(this.initHH());
        }
        else if (type == "surgeryHistoryListForm") {
            const control = <FormArray>this.surgeryHistoryFormGroup.controls['form'];
            control.push(this.initSH());
        }
        else if (type == "patientOrganizationAssistanceListForm") {
            const control = <FormArray>this.patientOrganizationAssistanceFormGroup.controls['form'];
            control.push(this.initPAO());
        }
    }

    removeSubForm(idx: number, type) {
        console.log("index ", idx);
        console.log("type", type);

        if (type == "healthCareHistoryListForm") {
            const control = <FormArray>this.healthCareHistoryFormGroup.controls['form'];
            control.removeAt(idx);
        }
        else if (type == "hospitalizationHistoryListForm") {
            const control = <FormArray>this.hospitalizationHistoryFormGroup.controls['form'];
            control.removeAt(idx);
        }
        else if (type == "surgeryHistoryListForm") {
            const control = <FormArray>this.surgeryHistoryFormGroup.controls['form'];
            control.removeAt(idx);
        }
        else if (type == "immunizationsForm") {
            const control = <FormArray>this.patientOrganizationAssistanceFormGroup.controls['form'];
            control.removeAt(idx);
        }

    }

    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    addMore(type) {

        if (type == "healthCareHistoryListForm") {
            let hcData = new HealthCareHistory();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.healthCareHistories.push(hcData);
            this.addSubForm(type);
        }
        else if (type == "hospitalizationHistoryListForm") {
            let hhData = new HospitalizationHistory();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.hospitalizationHistories.push(hhData);
            this.addSubForm(type);
        }
        else if (type == "surgeryHistoryListForm") {
            let shData = new SurgeryHistory();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.surgeryHistories.push(shData);
            this.addSubForm(type);
        }
        else if (type == "patientOrganizationAssistanceListForm") {
            let poaData = new PatientOrganizationAssistance();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.patientOrganizationAssistances.push(poaData);
            this.addSubForm(type);
        }

    }

    remove(index, type) {
        console.log("index ", index);
        console.log("type", type);

        if (type == "healthCareHistoryListForm") {

            if (this.healthCareHistories[index].id) {
                this.onRemoveHealthCareHistory(index, type);
            }
            else {
                this.removeSubForm(index, type);
                this.healthCareHistories.splice(index, 1);
            }

        }
        else if (type == "hospitalizationHistoryListForm") {
            if (this.hospitalizationHistories[index].id) {
                this.onRemoveHospitalizationHistory(index, type);
            }
            else {
                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.hospitalizationHistories.splice(index, 1);
            }

        }
        else if (type == "surgeryHistoryListForm") {
            if (this.surgeryHistories[index].id) {
                this.onRemoveSurgeryHistory(index, type);
            }
            else {
                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.surgeryHistories.splice(index, 1);
            }

        }
        else if (type == "patientOrganizationAssistanceListForm") {
            if (this.patientOrganizationAssistances[index].id) {
                this.onRemovePatientOrganizationAssistance(index, type);
            }
            else {
                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.patientOrganizationAssistances.splice(index, 1);
            }

        }
    }

    replaceText(text) {
        return this._utilityService.replaceConfigText(text);
    }

    loadAssistanceOrganization() {
        // this._uiService.showSpinner();
        this._setupService.getAssistanceTypeList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get Assistance Organization', res.json().data);

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var aoList = [];
                for (let i = 0; i < array.length; i++) {

                    let pao: PatientOrganizationAssistance = new PatientOrganizationAssistance()

                    pao.assistanceTypeSingle = this._mappingService.mapAssistanceType(array[i]);
                    aoList.push(pao);
                    this.patientOrganizationAssistances.push(pao);
                    this.addSubForm("patientOrganizationAssistanceListForm");
                }

                console.log('patientOrganizationAssistances', this.patientOrganizationAssistances);
                // this.patientOrganizationAssistances = poaList;

                // if (this.patientOrganizationAssistances.length == 0) {
                //     this.addMore("patientOrganizationAssistanceListForm");
                // }

                // console.log('insuranceTypes: ' + this.insuranceTypes);

                this.loadPatientOrganizationAssistances();

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadHealthCareHistories() {

        this.clearFormArray(<FormArray>this.healthCareHistoryFormGroup.controls['form']);
        this.healthCareHistories = [];

        this._uiService.showSpinner();

        this._patientRecordService.getHealthCareHistoryAll(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var hchList = [];
                for (let i = 0; i < array.length; i++) {
                    let hch = this._mappingService.mapHealthCareHistory(array[i]);
                    hchList.push(hch);
                    this.healthCareHistories.push(hch);
                    this.addSubForm("healthCareHistoryListForm");
                }
                // this.healthCareHistories = hchList;

                if (this.healthCareHistories.length == 0) {
                    this.addMore("healthCareHistoryListForm");
                }

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadHospitalizationHistories() {

        this.clearFormArray(<FormArray>this.hospitalizationHistoryFormGroup.controls['form']);
        this.hospitalizationHistories = [];

        this._uiService.showSpinner();

        this._patientRecordService.getHospitalizationHistoryAll(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var hhList = [];
                for (let i = 0; i < array.length; i++) {
                    let hh = this._mappingService.mapHospitalizationHistory(array[i]);
                    hhList.push(hh);
                    this.hospitalizationHistories.push(hh);
                    this.addSubForm("hospitalizationHistoryListForm");
                }
                // this.hospitalizationHistories = amList;

                if (this.hospitalizationHistories.length == 0) {
                    this.addMore("hospitalizationHistoryListForm");
                }

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadSurgeryHistories() {

        this.clearFormArray(<FormArray>this.surgeryHistoryFormGroup.controls['form']);
        this.surgeryHistories = [];

        this._uiService.showSpinner();

        this._patientRecordService.getSurgeryHistoryAll(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var shList = [];
                for (let i = 0; i < array.length; i++) {
                    let sh = this._mappingService.mapSurgeryHistory(array[i]);
                    shList.push(sh);
                    this.surgeryHistories.push(sh);
                    this.addSubForm("surgeryHistoryListForm");
                }
                // this.surgeryHistories = amList;

                if (this.surgeryHistories.length == 0) {
                    this.addMore("surgeryHistoryListForm");
                }

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadPatientOrganizationAssistances() {

        // this.clearFormArray(<FormArray>this.patientOrganizationAssistanceFormGroup.controls['form']);
        // this.patientOrganizationAssistances = [];

        this._uiService.showSpinner();

        this._patientRecordService.getPatientOrganizationAssistanceAll(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var poaList = [];
                for (let i = 0; i < array.length; i++) {
                    let poa = this._mappingService.mapPatientOrganizationAssistance(array[i]);
                    poaList.push(poa);

                    this.patientOrganizationAssistances.forEach((element, index) => {

                        if (element.assistanceTypeSingle.id == poa.assistanceTypeId) {

                            poa.assistanceTypeSingle = element.assistanceTypeSingle;

                            this.patientOrganizationAssistances[index] = poa;
                        }

                    });

                    // this.patientOrganizationAssistances.push(poa);
                    // this.addSubForm("patientOrganizationAssistanceListForm");
                }
                console.log('patientOrganizationAssistances', this.patientOrganizationAssistances);
                // this.patientOrganizationAssistances = poaList;

                // if (this.patientOrganizationAssistances.length == 0) {
                //     this.addMore("patientOrganizationAssistanceListForm");
                // }

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    dateChanged(event, index, type) {
        console.log('event', event.value);
        console.log('type', type);
        if (type == 'dob') {
            // this.patient.dateOfBirth = this.datePipe.transform(this.patient.dateOfBirth, 'yyyy-MM-dd');
            // // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            // console.log('event', this.patient.dateOfBirth);
        }
        // else if (type == 'endDate') {
        //     // this.schedule.endDate = this.datePipe.transform(this.schedule.endDate, 'yyyy-MM-dd');
        //     // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
        //     console.log('event', this.schedule.endDate);
        // }
    }


    onAssistanceOrganizationSelect(index) {

    }


    onSubmitHealthCareHistory() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.healthCareHistoryFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addHealthCareHistory(this.healthCareHistories, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadHealthCareHistories();

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
            console.log("add validation failed");
            this._formService.validateAllFormFields(this.healthCareHistoryFormGroup);
        }

    }

    onUpdateHealthCareHistory(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.healthCareHistoryFormGroup.valid) {

        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;

        this._patientRecordService.updateHealthCareHistory(this.healthCareHistories[index], this.id).subscribe(
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
        //     console.log("update validation failed");
        //     this._formService.validateAllFormFields(this.healthCareHistoryFormGroup);
        // }

    }

    onRemoveHealthCareHistory(index, type) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        let healthCareHistory = this.healthCareHistories[index];

        healthCareHistory.isActive = false;

        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.updateHealthCareHistory(healthCareHistory, this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();
                // this._authServices.storeUser(this.userForm);

                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.healthCareHistories.splice(index, 1);

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

    }




    onSubmitHospitalizationHistory() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.hospitalizationHistoryFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addHospitalizationHistory(this.hospitalizationHistories, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadHospitalizationHistories();

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
            this._formService.validateAllFormFields(this.hospitalizationHistoryFormGroup);
        }

    }

    onUpdateHospitalizationHistory(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.hospitalizationHistoryFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.updateHospitalizationHistory(this.hospitalizationHistories[index], this.id).subscribe(
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
        //     this._formService.validateAllFormFields(this.hospitalizationHistoryFormGroup);
        // }

    }

    onRemoveHospitalizationHistory(index, type) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        let hospitalizationHistory = this.hospitalizationHistories[index];
        hospitalizationHistory.isActive = false;

        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;

        this._patientRecordService.updateHospitalizationHistory(hospitalizationHistory, this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();
                // this._authServices.storeUser(this.userForm);

                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.hospitalizationHistories.splice(index, 1);

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

    }



    onSubmitSurgeryHistory() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.surgeryHistoryFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addSurgeryHistory(this.surgeryHistories, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadSurgeryHistories();

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
            this._formService.validateAllFormFields(this.surgeryHistoryFormGroup);
        }

    }

    onUpdateSurgeryHistory(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.surgeryHistoryFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.updateSurgeryHistory(this.surgeryHistories[index], this.id).subscribe(
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
        //     this._formService.validateAllFormFields(this.surgeryHistoryFormGroup);
        // }

    }

    onRemoveSurgeryHistory(index, type) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        let surgeryHistory = this.surgeryHistories[index];
        surgeryHistory.isActive = false;


        if (this.surgeryHistoryFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.updateSurgeryHistory(surgeryHistory, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                    this.removeSubForm(index, type);
                    this.surgeryHistories.splice(index, 1);

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
            this._formService.validateAllFormFields(this.surgeryHistoryFormGroup);
        }

    }



    onSubmitPatientOrganizationAssistance() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.patientOrganizationAssistanceFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addPatientOrganizationAssistance(this.patientOrganizationAssistances, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadPatientOrganizationAssistances();

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
            this._formService.validateAllFormFields(this.patientOrganizationAssistanceFormGroup);
        }

    }

    onUpdatePatientOrganizationAssistance(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.patientOrganizationAssistanceFormGroup.valid) {

        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.updatePatientOrganizationAssistance(this.patientOrganizationAssistances[index], this.id).subscribe(
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
        //     this._formService.validateAllFormFields(this.patientOrganizationAssistanceFormGroup);
        // }

    }

    onRemovePatientOrganizationAssistance(index, type) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        let vaccine = this.patientOrganizationAssistances[index];
        vaccine.isActive = false;

        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;

        this._patientRecordService.updatePatientOrganizationAssistance(this.patientOrganizationAssistances[index], this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();
                // this._authServices.storeUser(this.userForm);

                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.patientOrganizationAssistances.splice(index, 1);

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

    }

}