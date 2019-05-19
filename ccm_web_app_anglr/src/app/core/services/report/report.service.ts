
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpService } from '../base/http.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Token } from '../../models/token';

import { AuthService } from "../auth/auth.service";
import { ForumFeed } from '../../models/forum';
import { Ticket, TicketAssignee } from '../../models/ticket';

@Injectable()
export class ReportService {

    constructor(
        private _http: HttpService,
        private _authService: AuthService
    ) { }

    // Patient Registered Report Count
    getPatientRegisteredReportListCount(doctorId, startDate, endDate, searchKeyword) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "patient/registered/report/count?userId=" + (userId || null) + "&searchKeyword=" + (searchKeyword || null) +
            "&doctorId=" + (doctorId || null) + "&startDate=" + (startDate || null) + "&endDate=" + (endDate || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    // Patient Registered Report List Pagination
    getPatientRegisteredReportListPagination(pageNo, limit, doctorId, startDate, endDate, searchKeyword?) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "patient/registered/report?userId=" + (userId || null) + "&pageNo=" + (pageNo || 0) + "&limit=" + (limit || 5) +
            "&searchKeyword=" + (searchKeyword || null) + "&doctorId=" + (doctorId || null) + "&startDate=" + (startDate || null) +
            "&endDate=" + (endDate || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    // Patient Invitation Report Count
    getPatientInvitationReportListCount(doctorId, startDate, endDate, searchKeyword) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "patient/invitation/report/count?userId=" + (userId || null) + "&searchKeyword=" + (searchKeyword || null) +
            "&doctorId=" + (doctorId || null) + "&startDate=" + (startDate || null) + "&endDate=" + (endDate || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    // Patient Invitation Report List Pagination
    getPatientInvitationReportListPagination(pageNo, limit, doctorId, startDate, endDate, searchKeyword?) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "patient/invitation/report?userId=" + (userId || null) + "&pageNo=" + (pageNo || 0) + "&limit=" + (limit || 5) +
            "&searchKeyword=" + (searchKeyword || null) + "&doctorId=" + (doctorId || null) + "&startDate=" + (startDate || null) +
            "&endDate=" + (endDate || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    // Patient CPT Report Count
    getPatientCptReportListCount(doctorId, cptOptionId, startDate, endDate, searchKeyword) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "patient/ccm/cpt/report/count?userId=" + (userId || null) + "&searchKeyword=" + (searchKeyword || null) +
            "&doctorId=" + (doctorId || null) + "&cptOptionId=" + (cptOptionId || null) +
            "&startDate=" + (startDate || null) + "&endDate=" + (endDate || null) +
            "&CcmCptOptionCode=[]";

        let co = [];
        if (cptOptionId) {
            co.push({
                Id: cptOptionId
            });
        }

        let body = {
            // CcmCptOptionCode: []
            CcmCptOptionCode: co
        }

        // return this._http.get(getUrl, options)
        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    // Patient CPT List Pagination
    getPatientCptReportListPagination(pageNo, limit, doctorId, cptOptionId, startDate, endDate, searchKeyword?) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "patient/ccm/cpt/report?userId=" + (userId || null) + "&pageNo=" + (pageNo || 0) + "&limit=" + (limit || 5) +
            "&searchKeyword=" + (searchKeyword || null) + "&doctorId=" + (doctorId || null) + "&cptOptionId=" + (cptOptionId || null) +
            "&startDate=" + (startDate || null) + "&endDate=" + (endDate || null) +
            "&CcmCptOptionCode=[]";

        let co = [];
        if (cptOptionId) {
            co.push({
                Id: cptOptionId
            });
        }

        let body = {
            // CcmCptOptionCode: []
            CcmCptOptionCode: co
        }

        // return this._http.get(getUrl, options)
        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    // Patient Type Report Count
    getPatientTypeReportListCount(doctorId, patientTypeId, startDate, endDate, searchKeyword) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "patient/type/report/count?userId=" + (userId || null) + "&searchKeyword=" + (searchKeyword || null) +
            "&doctorId=" + (doctorId || null) + "&patientTypeId=" + (patientTypeId || null) +
            "&startDate=" + (startDate || null) + "&endDate=" + (endDate || null) +
            "&CcmCptOptionCode=[]";

        let pt = [];
        if (patientTypeId) {
            pt.push({
                Id: patientTypeId
            });
        }

        let body = {
            // PatientType: []
            PatientType: pt
        }

        // return this._http.get(getUrl, options)
        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    // Patient Type List Pagination
    getPatientTypeReportListPagination(pageNo, limit, doctorId, patientTypeId, startDate, endDate, searchKeyword?) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "patient/type/report?userId=" + (userId || null) + "&pageNo=" + (pageNo || 0) + "&limit=" + (limit || 5) +
            "&searchKeyword=" + (searchKeyword || null) + "&doctorId=" + (doctorId || null) + "&patientTypeId=" + (patientTypeId || null) +
            "&startDate=" + (startDate || null) + "&endDate=" + (endDate || null) +
            "&PatientTypeIds=[]";

        let pt = [];
        if (patientTypeId) {
            pt.push({
                Id: patientTypeId
            });
        }

        let body = {
            // PatientType: []
            PatientType: pt
        }

        // return this._http.get(getUrl, options)
        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }


}
