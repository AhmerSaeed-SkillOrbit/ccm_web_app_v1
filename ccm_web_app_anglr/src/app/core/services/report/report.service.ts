
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
    getPatientCptReportListCount(doctorId, CptOptionId, startDate, endDate, searchKeyword) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "patient/ccm/cpt/report/count?userId=" + (userId || null) + "&searchKeyword=" + (searchKeyword || null) +
            "&doctorId=" + (doctorId || null) + "&CptOptionId=" + (CptOptionId || null) +
            "&startDate=" + (startDate || null) + "&endDate=" + (endDate || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    // Patient CPT List Pagination
    getPatientCptReportListPagination(pageNo, limit, doctorId, CptOptionId, startDate, endDate, searchKeyword?) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "patient/ccm/cpt/report?userId=" + (userId || null) + "&pageNo=" + (pageNo || 0) + "&limit=" + (limit || 5) +
            "&searchKeyword=" + (searchKeyword || null) + "&doctorId=" + (doctorId || null) + "&CptOptionId=" + (CptOptionId || null) +
            "&startDate=" + (startDate || null) + "&endDate=" + (endDate || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }


}
