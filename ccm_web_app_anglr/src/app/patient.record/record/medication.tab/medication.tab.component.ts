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
import { ActiveMedication, AllergyMedication, AllergyNonMedication, Vaccine } from '../../../core/models/user.record';
import { FormService } from '../../../core/services/form/form.service';


@Component({
    selector: 'medication-tab',
    moduleId: module.id,
    templateUrl: 'medication.tab.component.html',
    // styleUrls: ['medication.tab.component.css'],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})

export class MedicationTabComponent implements OnInit {

    @Input() id: number = null;
    @Input() isTabActive: boolean = false;

    patient: User = new User();

    activeMedications: ActiveMedication[] = [];
    allergyMedications: AllergyMedication[] = [];
    allergyNonMedications: AllergyNonMedication[] = [];
    vaccines: Vaccine[] = [];

    genders = Config.gender;

    private ngUnsubscribe: Subject<any> = new Subject();

    // medicationFormGroup: FormGroup;
    activeMedicationFormGroup: FormGroup;
    medicationAllergiesIntolerancesFormGroup: FormGroup;
    allergiesNonMedicationFormGroup: FormGroup;
    immunizationsFormGroup: FormGroup;
    isSubmitted: boolean = false;

    minActiveMedicine = Config.activeMedicine.min;
    maxActiveMedicine = Config.activeMedicine.max;
    minAllergyMedicine = Config.allergyMedicine.min;
    maxAllergyMedicine = Config.allergyMedicine.max;
    minAllergyNonMedicine = Config.allergyNonMedicine.min;
    maxAllergyNonMedicine = Config.allergyNonMedicine.max;
    minVaccine = Config.vaccine.min;
    maxVaccine = Config.vaccine.max;

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
        private _patientRecordService: PatientRecordService,
        private datePipe: DatePipe,
        public dialog: MatDialog,
    ) {
        // this.currentURL = window.location.href;

        // this.medicationFormGroup = this._formBuilder.group({

        //     'activeMedicationListForm': this._formBuilder.array([]),
        //     'medicationAllergiesIntolerancesForm': this._formBuilder.array([]),
        //     'allergiesNonMedicationForm': this._formBuilder.array([]),
        //     'immunizationsForm': this._formBuilder.array([]),
        // });
        this.activeMedicationFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });

        this.medicationAllergiesIntolerancesFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });

        this.allergiesNonMedicationFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });

        this.immunizationsFormGroup = this._formBuilder.group({
            'form': this._formBuilder.array([]),
        });
    }

    ngOnInit(): void {

        console.log("this.payLoad in parent on init =-=-==-=-=");

        // if (this.id) {
        //     this.loadActiveMedications();
        // }

    }


    ngOnChanges(changes: SimpleChanges): void {

        console.log("this.isTabActive in parent on change =-=-==-=-=");

        if (changes['isTabActive']) {

            if (this.isTabActive) {
                if (this.id) {
                    this.loadActiveMedications();
                    this.loadAllergyMedications();
                    this.loadAllergyNonMedications();
                    this.loadImmunizationVaccines();
                }
            }

        }
    }

    initAML() {
        return this._formBuilder.group({
            'medicineName': ["", Validators.compose([Validators.required])],
            'dose': ["", Validators.compose([])],
            'direction': ["", Validators.compose([])],
            'startDate': ["", Validators.compose([])],
            'startBy': ["", Validators.compose([])],
            'whyComment': ["", Validators.compose([])],
        });
    }

    initMAI() {
        return this._formBuilder.group({
            'medicineName': ["", Validators.compose([Validators.required])],
            'reaction': ["", Validators.compose([])],
            'dateOccured': ["", Validators.compose([])],
            'markAsSevere': ["", Validators.compose([])]
        });
    }

    initANM() {
        return this._formBuilder.group({
            'substanceName': ["", Validators.compose([Validators.required])],
            'reaction': ["", Validators.compose([])],
            'dateOccured': ["", Validators.compose([])],
            'markAsSevere': ["", Validators.compose([])]
        });
    }

    initI() {
        return this._formBuilder.group({
            'vaccineName': ["", Validators.compose([Validators.required])],
            'dateGiven': ["", Validators.compose([])],
        });
    }

    addSubForm(type) {
        if (type == "activeMedicationListForm") {
            // const control = <FormArray>this.medicationFormGroup.controls['activeMedicationListForm'];
            const control = <FormArray>this.activeMedicationFormGroup.controls['form'];
            control.push(this.initAML());
        }
        else if (type == "medicationAllergiesIntolerancesForm") {
            // const control = <FormArray>this.medicationFormGroup.controls['medicationAllergiesIntolerancesForm'];
            const control = <FormArray>this.medicationAllergiesIntolerancesFormGroup.controls['form'];
            control.push(this.initMAI());
        }
        else if (type == "allergiesNonMedicationForm") {
            // const control = <FormArray>this.medicationFormGroup.controls['allergiesNonMedicationForm'];
            const control = <FormArray>this.allergiesNonMedicationFormGroup.controls['form'];
            control.push(this.initANM());
        }
        else if (type == "immunizationsForm") {
            // const control = <FormArray>this.medicationFormGroup.controls['immunizationsForm'];
            const control = <FormArray>this.immunizationsFormGroup.controls['form'];
            control.push(this.initI());
        }
    }

    removeSubForm(idx: number, type) {
        console.log("index ", idx);
        console.log("type", type);

        if (type == "activeMedicationListForm") {
            // const control = <FormArray>this.medicationFormGroup.controls['activeMedicationListForm'];
            const control = <FormArray>this.activeMedicationFormGroup.controls['form'];
            control.removeAt(idx);
        }
        else if (type == "medicationAllergiesIntolerancesForm") {
            // const control = <FormArray>this.medicationFormGroup.controls['medicationAllergiesIntolerancesForm'];
            const control = <FormArray>this.medicationAllergiesIntolerancesFormGroup.controls['form'];
            control.removeAt(idx);
        }
        else if (type == "allergiesNonMedicationForm") {
            // const control = <FormArray>this.medicationFormGroup.controls['allergiesNonMedicationForm'];
            const control = <FormArray>this.allergiesNonMedicationFormGroup.controls['form'];
            control.removeAt(idx);
        }
        else if (type == "immunizationsForm") {
            // const control = <FormArray>this.medicationFormGroup.controls['immunizationsForm'];
            const control = <FormArray>this.immunizationsFormGroup.controls['form'];
            control.removeAt(idx);
        }

    }

    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    addMore(type) {

        if (type == "activeMedicationListForm") {
            let amData = new ActiveMedication();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.activeMedications.push(amData);
            this.addSubForm(type);
        }
        else if (type == "medicationAllergiesIntolerancesForm") {
            let amData = new AllergyMedication();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.allergyMedications.push(amData);
            this.addSubForm(type);
        }
        else if (type == "allergiesNonMedicationForm") {
            let amData = new AllergyNonMedication();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.allergyNonMedications.push(amData);
            this.addSubForm(type);
        }
        else if (type == "immunizationsForm") {
            let amData = new Vaccine();
            // sData.scheduleDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.vaccines.push(amData);
            this.addSubForm(type);
        }

    }

    remove(index, type) {
        console.log("index ", index);
        console.log("type", type);

        if (type == "activeMedicationListForm") {

            if (this.activeMedications[index].id) {
                this.onRemoveActiveMedication(index, type);
            }
            else {
                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.activeMedications.splice(index, 1);
            }

        }
        else if (type == "medicationAllergiesIntolerancesForm") {
            if (this.allergyMedications[index].id) {
                this.onRemoveAllergyMedication(index, type);
            }
            else {
                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.allergyMedications.splice(index, 1);
            }

        }
        else if (type == "allergiesNonMedicationForm") {
            if (this.allergyNonMedications[index].id) {
                this.onRemoveAllergyNonMedication(index, type);
            }
            else {
                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.allergyNonMedications.splice(index, 1);
            }

        }
        else if (type == "immunizationsForm") {
            if (this.vaccines[index].id) {
                this.onRemoveImmunizations(index, type);
            }
            else {
                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.vaccines.splice(index, 1);
            }

        }
    }

    loadActiveMedications() {

        this.clearFormArray(<FormArray>this.activeMedicationFormGroup.controls['form']);
        this.activeMedications = [];

        this._uiService.showSpinner();

        this._patientRecordService.getActiveMedicineAll(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var amList = [];
                for (let i = 0; i < array.length; i++) {
                    let am = this._mappingService.mapActiveMedication(array[i]);
                    amList.push(am);
                    this.activeMedications.push(am);
                    this.addSubForm("activeMedicationListForm");
                }
                // this.activeMedications = amList;

                if (this.activeMedications.length == 0) {
                    this.addMore("activeMedicationListForm");
                }

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadAllergyMedications() {

        this.clearFormArray(<FormArray>this.medicationAllergiesIntolerancesFormGroup.controls['form']);
        this.allergyMedications = [];

        this._uiService.showSpinner();

        this._patientRecordService.getAllergyMedicineAll(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var amList = [];
                for (let i = 0; i < array.length; i++) {
                    let am = this._mappingService.mapAllergyMedication(array[i]);
                    amList.push(am);
                    this.allergyMedications.push(am);
                    this.addSubForm("medicationAllergiesIntolerancesForm");
                }
                // this.activeMedications = amList;

                if (this.allergyMedications.length == 0) {
                    this.addMore("medicationAllergiesIntolerancesForm");
                }

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadAllergyNonMedications() {

        this.clearFormArray(<FormArray>this.allergiesNonMedicationFormGroup.controls['form']);
        this.allergyNonMedications = [];

        this._uiService.showSpinner();

        this._patientRecordService.getAllergyNonMedicineAll(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var amList = [];
                for (let i = 0; i < array.length; i++) {
                    let am = this._mappingService.mapAllergyNonMedication(array[i]);
                    amList.push(am);
                    this.allergyNonMedications.push(am);
                    this.addSubForm("allergiesNonMedicationForm");
                }
                // this.activeMedications = amList;

                if (this.allergyNonMedications.length == 0) {
                    this.addMore("allergiesNonMedicationForm");
                }

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadImmunizationVaccines() {

        this.clearFormArray(<FormArray>this.immunizationsFormGroup.controls['form']);
        this.vaccines = [];

        this._uiService.showSpinner();

        this._patientRecordService.getImmunizationVaccineAll(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data || [];
                console.log('u Object', array);
                // console.log('res list:', array);
                var amList = [];
                for (let i = 0; i < array.length; i++) {
                    let am = this._mappingService.mapVaccine(array[i]);
                    amList.push(am);
                    this.vaccines.push(am);
                    this.addSubForm("immunizationsForm");
                }
                // this.activeMedications = amList;

                if (this.vaccines.length == 0) {
                    this.addMore("immunizationsForm");
                }

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




    onSubmitActiveMedication() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.activeMedicationFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addActiveMedicine(this.activeMedications, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadActiveMedications();

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
            this._formService.validateAllFormFields(this.activeMedicationFormGroup);
        }

    }

    onUpdateActiveMedication(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.activeMedicationFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.updateActiveMedicine(this.activeMedications[index], this.id).subscribe(
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
        //     this._formService.validateAllFormFields(this.activeMedicationFormGroup);
        // }

    }

    onRemoveActiveMedication(index, type) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        let activeMedication = this.activeMedications[index];

        activeMedication.isActive = false;

        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.updateActiveMedicine(activeMedication, this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();
                // this._authServices.storeUser(this.userForm);

                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.activeMedications.splice(index, 1);

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




    onSubmitAllergyMedication() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.medicationAllergiesIntolerancesFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addAllergyMedicine(this.allergyMedications, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadAllergyMedications();

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
            this._formService.validateAllFormFields(this.medicationAllergiesIntolerancesFormGroup);
        }

    }

    onUpdateAllergyMedication(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.medicationAllergiesIntolerancesFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.updateAllergyMedicine(this.allergyMedications[index], this.id).subscribe(
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
        //     this._formService.validateAllFormFields(this.medicationAllergiesIntolerancesFormGroup);
        // }

    }

    onRemoveAllergyMedication(index, type) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        let allergyMedication = this.allergyMedications[index];
        allergyMedication.isActive = false;

        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;

        this._patientRecordService.updateAllergyMedicine(allergyMedication, this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();
                // this._authServices.storeUser(this.userForm);

                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.allergyMedications.splice(index, 1);

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



    onSubmitAllergyNonMedication() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.allergiesNonMedicationFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addAllergyNonMedicine(this.allergyNonMedications, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadAllergyNonMedications();

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
            this._formService.validateAllFormFields(this.allergiesNonMedicationFormGroup);
        }

    }

    onUpdateAllergyNonMedication(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.allergiesNonMedicationFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.updateAllergyNonMedicine(this.allergyNonMedications[index], this.id).subscribe(
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
        //     this._formService.validateAllFormFields(this.allergiesNonMedicationFormGroup);
        // }

    }

    onRemoveAllergyNonMedication(index, type) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        let allergyNonMedication = this.allergyNonMedications[index];
        allergyNonMedication.isActive = false;


        // if (this.allergiesNonMedicationFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.updateAllergyNonMedicine(allergyNonMedication, this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();
                // this._authServices.storeUser(this.userForm);

                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.allergyNonMedications.splice(index, 1);

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
        //     this._formService.validateAllFormFields(this.allergiesNonMedicationFormGroup);
        // }

    }



    onSubmitImmunizations() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.immunizationsFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addImmunizationVaccine(this.vaccines, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadImmunizationVaccines();

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
            this._formService.validateAllFormFields(this.immunizationsFormGroup);
        }

    }

    onUpdateImmunizations(index) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        // if (this.immunizationsFormGroup.valid) {


        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;
        this._patientRecordService.updateImmunizationVaccine(this.vaccines[index], this.id).subscribe(
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
        //     this._formService.validateAllFormFields(this.immunizationsFormGroup);
        // }

    }

    onRemoveImmunizations(index, type) {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        let vaccine = this.vaccines[index];
        vaccine.isActive = false;

        this.isSubmitted = true;
        this._uiService.showSpinner();
        // this.isSubmitStarted = true;

        this._patientRecordService.updateImmunizationVaccine(this.vaccines[index], this.id).subscribe(
            (res) => {
                this.isSubmitted = false;
                this._uiService.hideSpinner();
                // this._authServices.storeUser(this.userForm);

                // this.clearFormArray(<FormArray>this.formScheduleDetail.controls['scheduleDetail']);
                this.removeSubForm(index, type);
                this.vaccines.splice(index, 1);

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