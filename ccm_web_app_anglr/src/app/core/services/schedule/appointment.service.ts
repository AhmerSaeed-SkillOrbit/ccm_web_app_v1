import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import { AuthService } from "../auth/auth.service";

import { DatePipe } from '@angular/common';

import { Token } from '../../models/token';
import { Schedule } from '../../models/schedule.model';
import { Appointment } from '../../models/appointment';

@Injectable()
export class AppointmentService implements OnDestroy {

    constructor(
        private _authService: AuthService,
        private _http: HttpService,
        public datePipe: DatePipe
    ) { }

    public addAppointment(patientId, doctorId, appointment?: Appointment): Observable<any> {
        // const getUrl = 'update/role';
        const getUrl = 'appointment/add';

        const body = {
            PatientId: patientId || null,
            DoctorId: doctorId || null,
            DoctorScheduleShiftId: appointment.shiftId || null,
            ShiftTimeSlotId: appointment.timeSlotId || null,
            Description: appointment.comment || null,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getSingleAppointment(appointmentId): Observable<any> {
        // const getUrl = 'update/role';
        const getUrl = 'appointment/single?appointmentId=' + (appointmentId || null);

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    // --------- Appointment List Count with 
    public getAppointmentListCount(doctorId, status, searchKeyword = null): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;
        // appointment/list/count?userId=11&rStatus='accepted || pending || rejected'
        // const getUrl = 'appointment/list/count?userId=' + (doctorId || null) + '&rStatus=' + (status || null);
        const getUrl = 'appointment/list/count?userId=' + (userId || null) + '&rStatus='
            + (status || null) + '&search=' + (searchKeyword || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- Appointment List Pagination
    public getAppointmentPagination(pageNo, limit, doctorId, status, searchKeyword = null): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;
        // appointment/list?pageNo=0&limit=10&userId=11&rStatus='accpeted || pending || rejected'
        // const getUrl = 'appointment/list?pageNo=' + (pageNo || 0) + '&limit=' + (limit || 5) + '&userId=' + (doctorId || null) + '&rStatus=' + (status || null);
        const getUrl = 'appointment/list?pageNo=' + (pageNo || 0) + '&limit=' + (limit || 5) + '&userId=' + (userId || null)
            + '&rStatus=' + (status || null) + '&search=' + (searchKeyword || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public appointmentRequestAction(appointmentId, status, reason): Observable<any> {
        // const getUrl = 'update/role';


        const body = {
            rStatus: status,
            reason: reason || null,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'appointment/request/status/update?aId=' + (appointmentId || null) + '&userId=' + (userId || null);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public appointmentRequestCancel(appointmentId, reason): Observable<any> {
        // const getUrl = 'update/role';

        const body = {
            reason: reason || null,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // appointment/cancel?aId=1&userId=11
        const getUrl = 'appointment/cancel?aId=' + (appointmentId || null) + '&userId=' + (userId || null);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    ngOnDestroy() {

    }
}
