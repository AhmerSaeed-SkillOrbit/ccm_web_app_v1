import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import { AuthService } from "../auth/auth.service";

import { DatePipe } from '@angular/common';

import { Token } from '../../models/token';
import { User } from '../../models/user';
import {
    ActiveMedication, AllergyMedication, AllergyNonMedication, Vaccine,
    PersonalContactInfo, AlternateContactInfo, InsuranceInfo, SelfAssessmentInfo,
    AbilityConcernInfo, ResourceInfo, Answer, QuestionAnswer, PreventiveScreen, DiabeteSupplement
} from '../../models/user.record';

@Injectable()
export class PatientRecordService implements OnDestroy {

    constructor(
        private _authService: AuthService,
        private _http: HttpService,
        public datePipe: DatePipe
    ) { }

    public getGeneralInfo(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'patient/general/information?patientId=' + (patientId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public saveGeneralInfo(user: User): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        const getUrl = 'patient/general/info/update?patientId=' + (user.id || null);
        let body = {

            // Id: user.id,
            PatientUniqueId: user.patientUniqueId || null,
            FirstName: user.firstName || null,
            MiddleName: user.middleName || null,
            LastName: user.lastName || null,
            // EmailAddress: user.email || null,
            // Password: user.password || null,
            CountryPhoneCode: user.countryPhoneCode || null,
            MobileNumber: user.mobileNumber || null,
            TelephoneNumber: user.phoneNumber || null,
            // OfficeAddress: user.officeAddress || null,
            // ResidentialAddress: user.residentialAddress || null,
            Gender: user.gender || null,
            DateOfBirth: user.dateOfBirth || null,
            // FunctionalTitle: user.functionalTitle || null,
            Age: user.age || null,
            // AgeGroup: user.ageGroup || null,


            // CountryId: user.countryId,
            // RegionId: user.regionId,
            // CityId: user.cityId,
            // BranchId: user.branchId
        }

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }



    public getActiveMedicineAll(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // active/medicine/all?patientId=65&userId=11
        const getUrl = 'active/medicine/all?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addActiveMedicine(activeMedications: ActiveMedication[], patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'add/active/medicine?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let am = []

        if (activeMedications && activeMedications.length > 0) {

            activeMedications.forEach(element => {
                let d = {
                    Id: element.id || null,
                    MedicineName: element.medicineName || null,
                    DoseNumber: element.dose || null,
                    Direction: element.direction || null,
                    StartDate: element.startDate || null,
                    StartBy: element.startBy || null,
                    WhyComments: element.whyComments || null,
                    IsActive: element.isActive || false,
                };

                am.push(d);

            });

        }

        // let body = am;
        let body = {
            ActiveMedicine: am
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public updateActiveMedicine(activeMedication: ActiveMedication, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'update/active/medicine?userId=' + (userId || null) + "&patientId=" + (patientId || null);


        let body = {
            Id: activeMedication.id || null,
            MedicineName: activeMedication.medicineName || null,
            DoseNumber: activeMedication.dose || null,
            Direction: activeMedication.direction || null,
            StartDate: activeMedication.startDate || null,
            StartBy: activeMedication.startBy || null,
            WhyComments: activeMedication.whyComments || null,
            IsActive: activeMedication.isActive || false,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }



    public getAllergyMedicineAll(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // allergy/medicine/all?patientId=65&userId=11
        const getUrl = 'allergy/medicine/all?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addAllergyMedicine(allergyMedications: AllergyMedication[], patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'add/allergy/medicine?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let am = []

        if (allergyMedications && allergyMedications.length > 0) {

            allergyMedications.forEach(element => {
                let d = {
                    Id: element.id || null,
                    MedicineName: element.medicineName || null,
                    MedicineReaction: element.reaction || null,
                    ReactionDate: element.dateOccured || null,
                    IsReactionSevere: element.isReactionSevere || false,
                    IsActive: element.isActive || false,
                };

                am.push(d);

            });

        }

        // let body = am;
        let body = {
            AllergyMedicine: am
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public updateAllergyMedicine(allergyMedication: AllergyMedication, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'update/allergy/medicine?userId=' + (userId || null) + "&patientId=" + (patientId || null);


        let body = {
            Id: allergyMedication.id || null,
            MedicineName: allergyMedication.medicineName || null,
            MedicineReaction: allergyMedication.reaction || null,
            ReactionDate: allergyMedication.dateOccured || null,
            IsReactionSevere: allergyMedication.isReactionSevere || false,
            IsActive: allergyMedication.isActive || false,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }



    public getAllergyNonMedicineAll(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // non/medicine/all?patientId=65&userId=11
        const getUrl = 'non/medicine/all?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addAllergyNonMedicine(allergyNonMedications: AllergyNonMedication[], patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'add/non/medicine?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let am = []

        if (allergyNonMedications && allergyNonMedications.length > 0) {

            allergyNonMedications.forEach(element => {
                let d = {
                    Id: element.id || null,
                    SubstanceName: element.substanceName || null,
                    SubstanceReaction: element.reaction || null,
                    ReactionDate: element.dateOccured || null,
                    IsReactionSevere: element.isReactionSevere || false,
                    IsActive: element.isActive || false,
                };

                am.push(d);

            });

        }

        // let body = am;
        let body = {
            NonMedicine: am
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public updateAllergyNonMedicine(allergyNonMedication: AllergyNonMedication, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'update/non/medicine?userId=' + (userId || null) + "&patientId=" + (patientId || null);


        let body = {
            Id: allergyNonMedication.id || null,
            SubstanceName: allergyNonMedication.substanceName || null,
            SubstanceReaction: allergyNonMedication.reaction || null,
            ReactionDate: allergyNonMedication.dateOccured || null,
            IsReactionSevere: allergyNonMedication.isReactionSevere || false,
            IsActive: allergyNonMedication.isActive || false,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }



    public getImmunizationVaccineAll(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // non/medicine/all?patientId=65&userId=11
        const getUrl = 'immunization/vaccine/all?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addImmunizationVaccine(vaccines: Vaccine[], patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'add/immunization/vaccine?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let am = []

        if (vaccines && vaccines.length > 0) {

            vaccines.forEach(element => {
                let d = {
                    Id: element.id || null,
                    Vaccine: element.vaccineName || null,
                    VaccineDate: element.vaccineDate || null,
                    IsActive: element.isActive || false,
                };

                am.push(d);

            });

        }

        // let body = am;
        let body = {
            ImmunizationVaccine: am
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public updateImmunizationVaccine(vaccine: Vaccine, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'update/immunization/vaccine?userId=' + (userId || null) + "&patientId=" + (patientId || null);


        let body = {
            Id: vaccine.id || null,
            Vaccine: vaccine.vaccineName || null,
            VaccineDate: vaccine.vaccineDate || null,
            IsActive: vaccine.isActive || false,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public getPersonalContactInfo(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // active/medicine/all?patientId=65&userId=11
        const getUrl = 'patient/assessment/single?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addUpdatePersonalContactInfo(personalContactInfo: PersonalContactInfo, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'save/patient/assessment?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let body = {
            Id: personalContactInfo.id || null,

            AbleToMessage: personalContactInfo.ableToMessage || false,
            AbleToCall: personalContactInfo.ableToCall || false,

            FeasibleMessageTime: personalContactInfo.feasibleMessageTime,
            // FeasibleMessageTime: personalContactInfo.feasibleMessageTimeFrom + " - " + personalContactInfo.feasibleMessageTimeTo,

            FeasibleCallTime: personalContactInfo.feasibleCallTime,
            // FeasibleCallTime: personalContactInfo.feasibleCallTimeFrom + " - " + personalContactInfo.feasibleCallTimeTo,

            DayTimePhoneNumber: personalContactInfo.dayTimePhoneNumber || null,
            CanCallOnDayTimePhone: personalContactInfo.canCallOnDayTimePhone || false,
            CanMsgOnDayTimePhone: personalContactInfo.canMsgOnDayTimePhone || false,

            NightTimePhoneNumber: personalContactInfo.nightTimePhoneNumber || null,
            CanCallOnNightTimePhone: personalContactInfo.canCallOnNightTimePhone || false,
            CanMsgOnNightTimePhone: personalContactInfo.canMsgOnNightTimePhone || false,

            IsInternetAvailable: personalContactInfo.isInternetAvailable || false,
            IsInternetHelper: personalContactInfo.isInternetHelper || false,
            CanUseInternet: personalContactInfo.canUseInternet || false,
            WantToChange: personalContactInfo.wantToChange || null,
            EffortToChange: personalContactInfo.effortToChange || null,



            IsActive: personalContactInfo.isActive || false,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public getAlternateContactInfo(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // active/medicine/all?patientId=65&userId=11
        const getUrl = 'patient/assessment/alternate/contact/single?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addUpdateAlternateContactInfo(alternateContactInfo: AlternateContactInfo, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'save/patient/assessment/alternate/contact?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let body = {
            Id: alternateContactInfo.id || null,

            CareGiverName: alternateContactInfo.careGiverName || null,
            CareGiverPhoneNumber: alternateContactInfo.careGiverPhoneNumber || null,
            EmergencyContactName: alternateContactInfo.emergencyContactName || null,
            EmergencyContactPhoneNumber: alternateContactInfo.emergencyContactPhoneNumber || null,
            FinancerName: alternateContactInfo.financerName || null,
            FinancerPhoneNumber: alternateContactInfo.financerPhoneNumber || null,
            HealthCarerName: alternateContactInfo.healthCarerName || null,
            HealthCarerPhoneNumber: alternateContactInfo.healthCarerPhoneNumber || null,

            Comment: alternateContactInfo.comment || null,


            IsActive: alternateContactInfo.isActive || false,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public getInsuranceInfo(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // active/medicine/all?patientId=65&userId=11
        const getUrl = 'patient/assessment/insurance/single?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addUpdateInsuranceInfo(insuranceInfo: InsuranceInfo, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'save/patient/assessment/insurance?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let body = {
            Id: insuranceInfo.id || null,

            InsuranceType: insuranceInfo.insuranceType || null,
            InsuranceOtherType: insuranceInfo.insuranceOtherType || null,
            InsurancePolicyNumber: insuranceInfo.insurancePolicyNumber || null,

            CoverageType: insuranceInfo.coverageType || null,
            CoverageOtherType: insuranceInfo.coverageOtherType || null,
            CoveragePolicyNumber: insuranceInfo.coveragePolicyNumber || null,

            Comment: insuranceInfo.comment || null,


            IsActive: insuranceInfo.isActive || false,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public getSelfAssessmentInfo(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'patient/assessment/self/single?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addUpdateSelfAssessmentInfo(selfAssessmentInfo: SelfAssessmentInfo, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'save/patient/assessment/self?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let body = {
            Id: selfAssessmentInfo.id || null,

            LiveType: selfAssessmentInfo.liveType || null,
            LiveOtherType: selfAssessmentInfo.liveOtherType || null,
            LiveComment: selfAssessmentInfo.liveComment || null,

            ChallengeWith: selfAssessmentInfo.challengeWith || null,
            ChallengeOtherType: selfAssessmentInfo.challengeOtherType || null,
            ChallengeComment: selfAssessmentInfo.challengeComment || null,

            PrimaryLanguage: selfAssessmentInfo.primaryLanguage || null,
            PrimaryLanguageOther: selfAssessmentInfo.primaryLanguageOther || null,
            PrimaryLanguageComment: selfAssessmentInfo.primaryLanguageComment || null,

            LearnBestBy: selfAssessmentInfo.learnBestBy || null,
            LearnBestByOther: selfAssessmentInfo.learnBestByOther || null,
            LearnBestByComment: selfAssessmentInfo.learnBestByComment || null,

            ThingImpactHealth: selfAssessmentInfo.thingImpactHealth || null,
            ThingImpactHealthOther: selfAssessmentInfo.thingImpactHealthOther || null,
            ThingImpactHealthComment: selfAssessmentInfo.thingImpactHealthComment || null,

            IsDietaryRequire: selfAssessmentInfo.isDietaryRequire || false,
            DietaryRequireDescription: selfAssessmentInfo.dietaryRequireDescription || null,

            AssistanceAvailable: selfAssessmentInfo.assistanceAvailable || null,


            IsActive: selfAssessmentInfo.isActive || false,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public getAbilityConcernInfo(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'patient/assessment/ability/concern/single?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addUpdateAbilityConcernInfo(abilityConcernInfo: AbilityConcernInfo, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'save/patient/assessment/ability/concern?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let body = {
            Id: abilityConcernInfo.id || null,
            ManageChronicCondition: abilityConcernInfo.manageChronicCondition || false,
            ManageChronicConditionComment: abilityConcernInfo.manageChronicConditionComment || null,
            DecreaseEnergyLevel: abilityConcernInfo.decreaseEnergyLevel || false,
            DecreaseEnergyLevelComment: abilityConcernInfo.decreaseEnergyLevelComment || null,
            CanCleanHome: abilityConcernInfo.canCleanHome || false,
            CanCleanHomeComment: abilityConcernInfo.canCleanHomeComment || null,
            EmotionalCurrentIssue: abilityConcernInfo.emotionalCurrentIssue || false,
            EmotionalCurrentIssueComment: abilityConcernInfo.emotionalCurrentIssueComment || null,
            ManageMedication: abilityConcernInfo.manageMedication || false,
            ManageMedicationComment: abilityConcernInfo.manageMedicationComment || null,
            ObtainHealthyFood: abilityConcernInfo.obtainHealthyFood || false,
            ObtainHealthyFoodComment: abilityConcernInfo.obtainHealthyFoodComment || null,
            CopeLifeIssue: abilityConcernInfo.copeLifeIssue || false,
            CopeLifeIssueComment: abilityConcernInfo.copeLifeIssueComment || null,
            IsCurrentlyDnr: abilityConcernInfo.isCurrentlyDnr || false,
            CurrentlyDnrComment: abilityConcernInfo.currentlyDnrComment || null,
            IsCurrentlyPoa: abilityConcernInfo.isCurrentlyPoa || false,
            CurrentlyPoaComment: abilityConcernInfo.currentlyPoaComment || null,
            IsCurrentlyDirective: abilityConcernInfo.isCurrentlyDirective || false,
            CurrentlyDirectiveComment: abilityConcernInfo.currentlyDirectiveComment || null,
            IsAbleToMoveDaily: abilityConcernInfo.isAbleToMoveDaily || false,
            AbleToMoveDailyComment: abilityConcernInfo.ableToMoveDailyComment || null,
            ConcernDetailComment: abilityConcernInfo.concernDetailComment || null,
            IsActive: abilityConcernInfo.isActive || false,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public getResourceInfo(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'patient/assessment/resource/single?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addUpdateResourceInfo(resourceInfo: ResourceInfo, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'save/patient/assessment/resource?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let body = {
            Id: resourceInfo.id || null,
            IsForgetMedicine: resourceInfo.isForgetMedicine || false,
            IsForgetMedicineComment: resourceInfo.isForgetMedicineComment || null,
            IsForgetAppointment: resourceInfo.isForgetAppointment || false,
            IsForgetAppointmentComment: resourceInfo.isForgetAppointmentComment || null,
            IsGoWhenSick: resourceInfo.isGoWhenSick || false,
            IsGoWhenSickComment: resourceInfo.isGoWhenSickComment || null,
            GoWithoutFood: resourceInfo.goWithoutFood || false,
            GoWithoutFoodComment: resourceInfo.goWithoutFoodComment || null,
            IsPowerShutOff: resourceInfo.isPowerShutOff || false,
            IsPowerShutOffComment: resourceInfo.isPowerShutOffComment || null,
            GetUnAbleToDress: resourceInfo.getUnAbleToDress || false,
            GetUnAbleToDressComment: resourceInfo.getUnAbleToDressComment || null,
            HardToPrepareFood: resourceInfo.hardToPrepareFood || false,
            HardToPrepareFoodComment: resourceInfo.hardToPrepareFoodComment || null,
            IsFrequentlySad: resourceInfo.isFrequentlySad || false,
            IsFrequentlySadComment: resourceInfo.isFrequentlySadComment || null,
            HardToTakeBath: resourceInfo.hardToTakeBath || false,
            HardToTakeBathComment: resourceInfo.hardToTakeBathComment || null,
            IsActive: resourceInfo.isActive || false,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public getQuestionAnswers(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'question/answer/all?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addAnswer(questionAnswer: QuestionAnswer, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'give/answer?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let body = {
            CcmQuestionId: questionAnswer.id || null,
            IsAnswered: questionAnswer.answer.isAnswered || false,
            Answer: questionAnswer.answer.answer || null,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public updateAnswer(questionAnswer: QuestionAnswer, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'update/answer?userId=' + (userId || null) + "&patientId=" + (patientId || null) + "&Id=" + (questionAnswer.answer.id || null);

        let body = {
            IsAnswered: questionAnswer.answer.isAnswered || null,
            Answer: questionAnswer.answer.answer || null,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }


    public getPsAnswers(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'question/answer/all?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addPsAnswer(questionAnswer: PreventiveScreen, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'give/answer?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let body = {
            CcmQuestionId: questionAnswer.id || null,
            IsAnswered: questionAnswer.answer.isAnswered || false,
            Answer: questionAnswer.answer.answer || null,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public updatePsAnswer(questionAnswer: PreventiveScreen, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'update/answer?userId=' + (userId || null) + "&patientId=" + (patientId || null) + "&Id=" + (questionAnswer.answer.id || null);

        let body = {
            IsAnswered: questionAnswer.answer.isAnswered || null,
            Answer: questionAnswer.answer.answer || null,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public getDsAnswers(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'question/answer/all?patientId=' + (patientId || null) + "&userId=" + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addDsAnswer(questionAnswer: DiabeteSupplement, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'give/answer?userId=' + (userId || null) + "&patientId=" + (patientId || null);

        let body = {
            CcmQuestionId: questionAnswer.id || null,
            IsAnswered: questionAnswer.answer.isAnswered || false,
            Answer: questionAnswer.answer.answer || null,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public updateDsAnswer(questionAnswer: DiabeteSupplement, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'update/answer?userId=' + (userId || null) + "&patientId=" + (patientId || null) + "&Id=" + (questionAnswer.answer.id || null);

        let body = {
            IsAnswered: questionAnswer.answer.isAnswered || null,
            Answer: questionAnswer.answer.answer || null,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }


    ngOnDestroy() {

    }
}
