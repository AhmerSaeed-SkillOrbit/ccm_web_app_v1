import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import { AuthService } from "../auth/auth.service";

import { DatePipe } from '@angular/common';

import { Token } from '../../models/token';
import { User } from '../../models/user';

@Injectable()
export class PatientRecordService implements OnDestroy {

    constructor(
        private _authService: AuthService,
        private _http: HttpService,
        public datePipe: DatePipe
    ) { }

    // --------- Schedule List Count with 
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

        const getUrl = 'general/info/save?id=' + (user.id || null);
        let body = {

            Id: user.id,
            FirstName: user.firstName || null,
            LastName: user.lastName || null,
            // EmailAddress: user.email || null,
            // Password: user.password || null,
            CountryPhoneCode: user.countryPhoneCode || null,
            MobileNumber: user.mobileNumber || null,
            TelephoneNumber: user.phoneNumber || null,
            OfficeAddress: user.officeAddress || null,
            ResidentialAddress: user.residentialAddress || null,
            Gender: user.gender || null,
            FunctionalTitle: user.functionalTitle || null,
            Age: user.age || null,
            AgeGroup: user.ageGroup || null,


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


    ngOnDestroy() {

    }
}
