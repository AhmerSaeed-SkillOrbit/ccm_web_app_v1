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
import { MappingService } from '../../../core/services/mapping/mapping.service';
import { FormService } from '../../../core/services/form/form.service';
import { PatientRecordService } from '../../../core/services/patient/patient.record.service';
import { Config } from '../../../config/config';
import { PersonalContactInfo, AlternateContactInfo, InsuranceType, InsuranceCoverageType, InsuranceInfo, SelfAssessmentInfo, LiveType, ChallengeType, PrimaryLanguage, LearnBestBy, ThingImpactHealth, AssistanceAvailable, AbilityConcernInfo, ResourceInfo } from '../../../core/models/user.record';
import { SetupService } from '../../../core/services/setup/setup.service';
import { Permission } from '../../../core/models/permission';

// import { Config } from '../../../config/config';


@Component({
    selector: 'preliminary-assessment-tab',
    moduleId: module.id,
    templateUrl: 'preliminary.assessment.tab.component.html',
    // styleUrls: ['preliminary.assessment.tab.component.css'],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})

export class PreliminaryAssessmentTabComponent implements OnInit {

    @Input() id: number = null;
    @Input() isTabActive: boolean = false;


    userPermissions: Permission[] = [];

    viewPatientRecordPagePermission = false;
    addPatientRecordPagePermission = false;


    patient: User = new User();

    insuranceTypes: InsuranceType[] = [];
    insuranceCoverageTypes: InsuranceCoverageType[] = [];

    liveTypes: LiveType[] = [];
    challengeTypes: ChallengeType[] = [];
    primaryLanguages: PrimaryLanguage[] = [];
    learnBestBys: LearnBestBy[] = [];
    thingImpactHealths: ThingImpactHealth[] = [];
    assistanceAvailables: AssistanceAvailable[] = [];

    personalContactInfo: PersonalContactInfo = new PersonalContactInfo();
    alternateContactInfo: AlternateContactInfo = new AlternateContactInfo();
    insuranceInfo: InsuranceInfo = new InsuranceInfo();
    selfAssessmentInfo: SelfAssessmentInfo = new SelfAssessmentInfo();
    abilityConcernInfo: AbilityConcernInfo = new AbilityConcernInfo();
    resourceInfo: ResourceInfo = new ResourceInfo();
    // vaccines: Vaccine[] = [];

    // genders = Config.gender;

    private ngUnsubscribe: Subject<any> = new Subject();

    personalContactInfoFormGroup: FormGroup;
    alternateContactInfoFormGroup: FormGroup;
    insuranceInfoFormGroup: FormGroup;
    selfAssessmentInfoFormGroup: FormGroup;
    abilityConcernInfoFormGroup: FormGroup;
    resourceInfoFormGroup: FormGroup;
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
        private _patientRecordService: PatientRecordService,
        private datePipe: DatePipe,
        public dialog: MatDialog,
    ) {
        // this.currentURL = window.location.href;

        this.personalContactInfoFormGroup = this._formBuilder.group({

            'ableToCall': [null, Validators.compose([])],
            'feasibleCallTime': [null, Validators.compose([])],
            'ableToMessage': [null, Validators.compose([])],
            'feasibleMessageTime': [null, Validators.compose([])],

            'dayTimePhoneNumber': [null, Validators.compose([])],
            'canCallOnDayTimePhone': [null, Validators.compose([])],
            'canMsgOnDayTimePhone': [null, Validators.compose([])],

            'nightTimePhoneNumber': [null, Validators.compose([])],
            'canCallOnNightTimePhone': [null, Validators.compose([])],
            'canMsgOnNightTimePhone': [null, Validators.compose([])],

            'lastPcpVisitDate': [null, Validators.compose([])],
            'isAgreeCcmService': [null, Validators.compose([])],
            'isAgreeToDiscussHealthInfo': [null, Validators.compose([])],

            'isInternetAvailable': [null, Validators.compose([])],
            'isInternetHelper': [null, Validators.compose([])],
            'canUseInternet': [null, Validators.compose([])],

            'wantToChange': [null, Validators.compose([])],
            'effortToChange': [null, Validators.compose([])],

        });

        this.alternateContactInfoFormGroup = this._formBuilder.group({

            'careGiverName': [null, Validators.compose([])],
            'careGiverPhoneNumber': [null, Validators.compose([])],
            'emergencyContactName': [null, Validators.compose([])],
            'emergencyContactPhoneNumber': [null, Validators.compose([])],
            'financerName': [null, Validators.compose([])],
            'financerPhoneNumber': [null, Validators.compose([])],
            'healthCarerName': [null, Validators.compose([])],
            'healthCarerPhoneNumber': [null, Validators.compose([])],
            'comment': [null, Validators.compose([])],

        });

        this.insuranceInfoFormGroup = this._formBuilder.group({

            'insuranceType': [null, Validators.compose([])],
            'insuranceOtherType': [null, Validators.compose([])],
            'insurancePolicyNumber': [null, Validators.compose([])],
            'coverageType': [null, Validators.compose([])],
            'coverageOtherType': [null, Validators.compose([])],
            'coveragePolicyNumber': [null, Validators.compose([])],
            'comment': [null, Validators.compose([])],

        });

        this.selfAssessmentInfoFormGroup = this._formBuilder.group({

            'liveType': [null, Validators.compose([])],
            'liveOtherType': [null, Validators.compose([])],
            'liveComment': [null, Validators.compose([])],

            'challengeWith': [null, Validators.compose([])],
            'challengeOtherType': [null, Validators.compose([])],
            'challengeComment': [null, Validators.compose([])],

            'primaryLanguage': [null, Validators.compose([])],
            'primaryLanguageOther': [null, Validators.compose([])],
            'primaryLanguageComment': [null, Validators.compose([])],

            'learnBestBy': [null, Validators.compose([])],
            'learnBestByOther': [null, Validators.compose([])],
            'learnBestByComment': [null, Validators.compose([])],

            'thingImpactHealth': [null, Validators.compose([])],
            'thingImpactHealthOther': [null, Validators.compose([])],
            'thingImpactHealthComment': [null, Validators.compose([])],

            'isDietaryRequire': [null, Validators.compose([])],
            'dietaryRequireDescription': [null, Validators.compose([])],

            'assistanceAvailable': [null, Validators.compose([])],

        });

        this.abilityConcernInfoFormGroup = this._formBuilder.group({

            'manageChronicCondition': [null, Validators.compose([])],
            'manageChronicConditionComment': [null, Validators.compose([])],
            'decreaseEnergyLevel': [null, Validators.compose([])],
            'decreaseEnergyLevelComment': [null, Validators.compose([])],
            'canCleanHome': [null, Validators.compose([])],
            'canCleanHomeComment': [null, Validators.compose([])],
            'emotionalCurrentIssue': [null, Validators.compose([])],
            'emotionalCurrentIssueComment': [null, Validators.compose([])],
            'manageMedication': [null, Validators.compose([])],
            'manageMedicationComment': [null, Validators.compose([])],
            'obtainHealthyFood': [null, Validators.compose([])],
            'obtainHealthyFoodComment': [null, Validators.compose([])],
            'copeLifeIssue': [null, Validators.compose([])],
            'copeLifeIssueComment': [null, Validators.compose([])],
            'isCurrentlyDnr': [null, Validators.compose([])],
            'currentlyDnrComment': [null, Validators.compose([])],
            'isCurrentlyPoa': [null, Validators.compose([])],
            'currentlyPoaComment': [null, Validators.compose([])],
            'isCurrentlyDirective': [null, Validators.compose([])],
            'currentlyDirectiveComment': [null, Validators.compose([])],
            'isAbleToMoveDaily': [null, Validators.compose([])],
            'ableToMoveDailyComment': [null, Validators.compose([])],

            'concernDetailComment': [null, Validators.compose([])],

        });

        this.resourceInfoFormGroup = this._formBuilder.group({

            'isForgetMedicine': [null, Validators.compose([])],
            'isForgetMedicineComment': [null, Validators.compose([])],
            'isForgetAppointment': [null, Validators.compose([])],
            'isForgetAppointmentComment': [null, Validators.compose([])],
            'isGoWhenSick': [null, Validators.compose([])],
            'isGoWhenSickComment': [null, Validators.compose([])],
            'goWithoutFood': [null, Validators.compose([])],
            'goWithoutFoodComment': [null, Validators.compose([])],
            'isPowerShutOff': [null, Validators.compose([])],
            'isPowerShutOffComment': [null, Validators.compose([])],
            'getUnAbleToDress': [null, Validators.compose([])],
            'getUnAbleToDressComment': [null, Validators.compose([])],
            'hardToPrepareFood': [null, Validators.compose([])],
            'hardToPrepareFoodComment': [null, Validators.compose([])],
            'isFrequentlySad': [null, Validators.compose([])],
            'isFrequentlySadComment': [null, Validators.compose([])],
            'hardToTakeBath': [null, Validators.compose([])],
            'hardToTakeBathComment': [null, Validators.compose([])],
        });
    }

    ngOnInit(): void {

        console.log("this.payLoad in parent on init =-=-==-=-=");

        this.userPermissions = this._authService.getUserPermissions();

        // this.viewPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'view_patient_record');
        this.viewPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_patient_record');
        // this.viewPatientRecordPagePermission = true;
        // this.addPatientRecordPagePermission = this._utilityService.checkUserPermission(this.user, 'add_patient_record');
        this.addPatientRecordPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'add_patient_record');
        // this.addPatientRecordPagePermission = true;
        if (this.viewPatientRecordPagePermission || this.addPatientRecordPagePermission) {

            this.loadInsuranceType();
            this.loadInsuranceCoverageType();

            this.loadLiveType();
            this.loadChallengeType();
            this.loadPrimaryLanguage();
            this.loadLearnBestBy();
            this.loadThingImpactHealth();
            this.loadAssistanceAvailable();

        }



    }


    ngOnChanges(changes: SimpleChanges): void {

        console.log("this.isTabActive in parent on change =-=-==-=-=");

        if (changes['isTabActive']) {

            if (this.isTabActive) {
                if (this.id) {

                    if (this.insuranceTypes.length == 0) {
                        this.loadInsuranceType();
                    }
                    if (this.insuranceCoverageTypes.length == 0) {
                        this.loadInsuranceCoverageType();
                    }
                    if (this.liveTypes.length == 0) {
                        this.loadLiveType();
                    }
                    if (this.challengeTypes.length == 0) {
                        this.loadChallengeType();
                    }
                    if (this.primaryLanguages.length == 0) {
                        this.loadPrimaryLanguage();
                    }
                    if (this.learnBestBys.length == 0) {
                        this.loadLearnBestBy();
                    }
                    if (this.thingImpactHealths.length == 0) {
                        this.loadThingImpactHealth();
                    }
                    if (this.assistanceAvailables.length == 0) {
                        this.loadAssistanceAvailable();
                    }

                    this.loadPersonalContactInformation();
                    this.loadAlternateContactInformation();
                    this.loadInsuranceInformation();
                    this.loadSelfAssessmentInformation();
                    this.loadAbilityConcernInformation();
                    this.loadResourceInformation();
                }
            }

        }
    }

    replaceText(text) {
        return this._utilityService.replaceConfigText(text);
    }

    loadInsuranceType() {
        // this._uiService.showSpinner();
        this._setupService.getInsuranceTypeList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get Insurance type', res.json().data);

                let array = res.json().data || null;
                var tList = [];
                if (array) {
                    for (let key in array) {
                        let t: InsuranceType = new InsuranceType();
                        t.name = array[key];
                        t.code = key;
                        tList.push(t);
                        // console.log('key: ' + key + ',  value: ' + array[key]);
                    }
                }

                this.insuranceTypes = tList;

                console.log('insuranceTypes: ' + this.insuranceTypes);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadInsuranceCoverageType() {
        // this._uiService.showSpinner();
        this._setupService.getInsuranceCoverageTypeList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get Insurance Coverage type', res.json().data);

                let array = res.json().data || null;
                var tList = [];
                if (array) {
                    for (let key in array) {
                        let t: InsuranceCoverageType = new InsuranceCoverageType();
                        t.name = array[key];
                        t.code = key;
                        tList.push(t);
                        // console.log('key: ' + key + ',  value: ' + array[key]);
                    }
                }

                this.insuranceCoverageTypes = tList;

                console.log('insuranceCoverageTypes: ' + this.insuranceCoverageTypes);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadLiveType() {
        // this._uiService.showSpinner();
        this._setupService.getLiveTypeList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get live type', res.json().data);

                let array = res.json().data || null;
                var tList = [];
                if (array) {
                    for (let key in array) {
                        let t: LiveType = new LiveType();
                        t.name = array[key];
                        t.code = key;
                        tList.push(t);
                        // console.log('key: ' + key + ',  value: ' + array[key]);
                    }
                }

                this.liveTypes = tList;

                console.log('liveTypes: ' + this.liveTypes);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadChallengeType() {
        // this._uiService.showSpinner();
        this._setupService.getChallengeTypeList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get challenge type', res.json().data);

                let array = res.json().data || null;
                var tList = [];
                if (array) {
                    for (let key in array) {
                        let t: ChallengeType = new ChallengeType();
                        t.name = array[key];
                        t.code = key;
                        tList.push(t);
                        // console.log('key: ' + key + ',  value: ' + array[key]);
                    }
                }

                this.challengeTypes = tList;

                console.log('challengeTypes: ' + this.challengeTypes);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadPrimaryLanguage() {
        // this._uiService.showSpinner();
        this._setupService.getPrimaryLanguageList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get primary languages', res.json().data);

                let array = res.json().data || null;
                var tList = [];
                if (array) {
                    for (let key in array) {
                        let t: PrimaryLanguage = new PrimaryLanguage();
                        t.name = array[key];
                        t.code = key;
                        tList.push(t);
                        // console.log('key: ' + key + ',  value: ' + array[key]);
                    }
                }

                this.primaryLanguages = tList;

                console.log('primaryLanguages: ' + this.primaryLanguages);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadLearnBestBy() {
        // this._uiService.showSpinner();
        this._setupService.getLearnBestByTypeList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get LearnBestBy', res.json().data);

                let array = res.json().data || null;
                var tList = [];
                if (array) {
                    for (let key in array) {
                        let t: LearnBestBy = new LearnBestBy();
                        t.name = array[key];
                        t.code = key;
                        tList.push(t);
                        // console.log('key: ' + key + ',  value: ' + array[key]);
                    }
                }

                this.learnBestBys = tList;

                console.log('learnBestBys: ' + this.learnBestBys);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadThingImpactHealth() {
        // this._uiService.showSpinner();
        this._setupService.getThingImpactHealthList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get thingImpactHealth', res.json().data);

                let array = res.json().data || null;
                var tList = [];
                if (array) {
                    for (let key in array) {
                        let t: ThingImpactHealth = new ThingImpactHealth();
                        t.name = array[key];
                        t.code = key;
                        tList.push(t);
                        // console.log('key: ' + key + ',  value: ' + array[key]);
                    }
                }

                this.thingImpactHealths = tList;

                console.log('thingImpactHealths: ' + this.thingImpactHealths);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadAssistanceAvailable() {
        // this._uiService.showSpinner();
        this._setupService.getAssistanceAvailableTypeList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get AssistanceAvailable', res.json().data);

                let array = res.json().data || null;
                var tList = [];
                if (array) {
                    for (let key in array) {
                        let t: AssistanceAvailable = new AssistanceAvailable();
                        t.name = array[key];
                        t.code = key;
                        tList.push(t);
                        // console.log('key: ' + key + ',  value: ' + array[key]);
                    }
                }

                this.assistanceAvailables = tList;

                console.log('thingImpactHealths: ' + this.thingImpactHealths);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadPersonalContactInformation() {

        this._uiService.showSpinner();

        this._patientRecordService.getPersonalContactInfo(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let data = res.json().data;
                console.log('u Object', data);
                // console.log('res list:', array);
                this.personalContactInfo = this._mappingService.mapPersonalContactInfo(data);

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadAlternateContactInformation() {

        this._uiService.showSpinner();

        this._patientRecordService.getAlternateContactInfo(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let data = res.json().data;
                console.log('u Object', data);
                // console.log('res list:', array);
                this.alternateContactInfo = this._mappingService.mapAlternateContactInfo(data);

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadInsuranceInformation() {

        this._uiService.showSpinner();

        this._patientRecordService.getInsuranceInfo(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let data = res.json().data;
                console.log('u Object', data);
                // console.log('res list:', array);
                this.insuranceInfo = this._mappingService.mapInsuranceInfo(data);

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadSelfAssessmentInformation() {

        this._uiService.showSpinner();

        this._patientRecordService.getSelfAssessmentInfo(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let data = res.json().data;
                console.log('u Object', data);
                // console.log('res list:', array);
                this.selfAssessmentInfo = this._mappingService.mapSelfAssessmentInfo(data);

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadAbilityConcernInformation() {

        this._uiService.showSpinner();

        this._patientRecordService.getAbilityConcernInfo(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let data = res.json().data;
                console.log('u Object', data);
                // console.log('res list:', array);
                this.abilityConcernInfo = this._mappingService.mapAbilityConcernInfo(data);

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadResourceInformation() {

        this._uiService.showSpinner();

        this._patientRecordService.getResourceInfo(this.id).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let data = res.json().data;
                console.log('u Object', data);
                // console.log('res list:', array);
                this.resourceInfo = this._mappingService.mapResourceInfo(data);

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    dateChanged(event, type) {
        console.log('event', event.value);
        console.log('type', type);
        if (type == 'lastPcpVisitDate') {
            this.personalContactInfo.lastPcpVisitDate = this.datePipe.transform(this.personalContactInfo.lastPcpVisitDate, 'yyyy-MM-dd');
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.personalContactInfo.lastPcpVisitDate);

        }

    }


    onInsuranceTypeSelect() {

    }

    onInsuranceCoverageTypeSelect() {

    }

    onLiveTypeSelect() {

    }

    onChallengeTypeSelect() {

    }

    onPrimaryLanguageSelect() {

    }

    onLearnBestBySelect() {

    }

    onThingImpactHealthSelect() {

    }

    onAssistanceAvailableSelect() {

    }


    onSubmitPersonalContactInfo() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.personalContactInfoFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addUpdatePersonalContactInfo(this.personalContactInfo, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadPersonalContactInformation();

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
            this._formService.validateAllFormFields(this.personalContactInfoFormGroup);
        }

    }

    onSubmitAlternateContactInfo() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.alternateContactInfoFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addUpdateAlternateContactInfo(this.alternateContactInfo, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadAlternateContactInformation();

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
            this._formService.validateAllFormFields(this.alternateContactInfoFormGroup);
        }

    }

    onSubmitInsuranceInfo() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.insuranceInfoFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addUpdateInsuranceInfo(this.insuranceInfo, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadInsuranceInformation();

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
            this._formService.validateAllFormFields(this.insuranceInfoFormGroup);
        }

    }

    onSubmitSelfAssessmentInfo() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.selfAssessmentInfoFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addUpdateSelfAssessmentInfo(this.selfAssessmentInfo, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadSelfAssessmentInformation();

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
            this._formService.validateAllFormFields(this.selfAssessmentInfoFormGroup);
        }

    }

    onSubmitAbilityConcernInfo() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.abilityConcernInfoFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addUpdateAbilityConcernInfo(this.abilityConcernInfo, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadAbilityConcernInformation();

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
            this._formService.validateAllFormFields(this.abilityConcernInfoFormGroup);
        }

    }

    onSubmitResourceInfo() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.resourceInfoFormGroup.valid) {
            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._patientRecordService.addUpdateResourceInfo(this.resourceInfo, this.id).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    this.loadResourceInformation();

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
            this._formService.validateAllFormFields(this.resourceInfoFormGroup);
        }

    }

}