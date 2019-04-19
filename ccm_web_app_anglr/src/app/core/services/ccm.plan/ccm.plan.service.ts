import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import { AuthService } from "../auth/auth.service";

import { DatePipe } from '@angular/common';

import { Token } from '../../models/token';
import { User } from '../../models/user';
import { CcmPlan, HealthParam } from '../../models/user.ccm.plan';

@Injectable()
export class CcmPlanService implements OnDestroy {

    constructor(
        private _authService: AuthService,
        private _http: HttpService,
        public datePipe: DatePipe
    ) { }

    getCcmPlanListCount(patientId, searchKeyword, startDate, endDate) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // patient/ccm/plan/all/count?patientId=65&userId=11&pageNo=0&limit=10&startDate=2018-09-18&endDate=2019-04-26
        let getUrl = "patient/ccm/plan/all/count?userId=" + (userId || null) + "&patientId=" + (patientId || null) + "&searchKeyword=" + (searchKeyword || null) +
            "&startDate=" + (startDate || null) + "&endDate=" + (endDate || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    getCcmPlanListPagination(patientId, pageNo, limit, searchKeyword, startDate, endDate) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // patient/ccm/plan/all?patientId=65&userId=11&pageNo=0&limit=10&startDate=2018-09-18&endDate=2019-04-26
        let getUrl = "patient/ccm/plan/all?userId=" + (userId || null) + "&patientId=" + (patientId || null) + "&pageNo=" + (pageNo || 0) + "&limit=" + (limit || 5) +
            "&searchKeyword=" + (searchKeyword || null) + "&startDate=" + (startDate || null) + "&endDate=" +
            (endDate || null);


        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    getSingleCcmPlan(patientId, planId) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // patient/ccm/plan/single?userId=11&patientId=65&id=339
        let getUrl = 'patient/ccm/plan/single?userId=' + (userId || null) + '&patientId=' + (patientId || null) + '&id=' + (planId || null);

        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    public addUpdateCcmPlan(ccmPlan: CcmPlan, patientId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "";

        if (ccmPlan.id) {
            // patient/ccm/plan/update?userId=11&patientId=65&id=339
            getUrl = 'patient/ccm/plan/update?userId=' + (userId || null) + "&patientId=" + (patientId || null) + "&id=" + (ccmPlan.id || null);
        }
        else {
            // patient/ccm/plan/add?userId=11&patientId=65
            getUrl = 'patient/ccm/plan/add?userId=' + (userId || null) + "&patientId=" + (patientId || null);
        }


        let items = [];

        if (ccmPlan.items && ccmPlan.items.length > 0) {

            ccmPlan.items.forEach(element => {



                let goals = [];

                if (element.itemGoals && element.itemGoals.length > 0) {

                    element.itemGoals.forEach(element => {

                        let d = {
                            Id: element.id || null,
                            Name: element.goal || null,
                            Intervention: element.intervention || null,
                            IsActive: element.isActive || false,
                        };

                        goals.push(d);

                    });

                }

                let d = {
                    Id: element.id || null,
                    ItemName: element.name || null,
                    Goal: goals,
                    IsActive: element.isActive || false,
                };

                items.push(d);

            });

        }

        let hp = [];

        if (ccmPlan.healthParams && ccmPlan.healthParams.length > 0) {

            ccmPlan.healthParams.forEach(element => {

                let d = {
                    Id: element.healthParamId || null,
                    ReadingValue: element.readingValue || null,
                    // ReadingDate: element.readingDate || null,
                    ReadingDate: ccmPlan.startDate || null,
                    IsActive: element.isActive || false,
                };

                hp.push(d);

            });

        }

        // let body = am;
        let body = {
            StartDate: ccmPlan.startDate || null,
            EndDate: ccmPlan.endDate || null,
            Item: items,
            IsHealthParam: ccmPlan.isHealthParam || false,
            HealthParams: hp,
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }


    public addHealthParam(healthParam: HealthParam): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "ccm/plan/health/param/add?userId=" + (userId || null);


        // let body = am;
        let body = {
            Name: healthParam.name || null,
            Description: healthParam.description || null,
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
