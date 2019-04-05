import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import { AuthService } from "../auth/auth.service";

import { DatePipe } from '@angular/common';

import { Token } from '../../models/token';
import { User } from '../../models/user';
import { ActiveMedication, AllergyMedication, AllergyNonMedication, Vaccine } from '../../models/user.record';

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
            UnqiuePatientId: user.unqiuePatientId || null,
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

    ngOnDestroy() {

    }
}
