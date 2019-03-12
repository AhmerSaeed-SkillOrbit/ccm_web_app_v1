import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


import { environment } from "../../../../environments/environment";
import { Token } from '../../models/token';

@Injectable()
export class DoctorScheduleService {



    constructor(private _http: HttpService, private _authServices: AuthService) { }
    invokeEvent: Subject<any> = new Subject();

    callMethodOfSecondComponent() {
        this.invokeEvent.next('refresh')
    }

    getDocSchedule(doctorId, userId, month, year): Observable<any> {
        let url = "doctor/schedule/single?doctorId=" + (doctorId || null) + "&userId=" + (userId || null) + "&month=" + (month + 1 || null) + "&year=" + (year || null) + "";
        return this._http.get(url)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }


    getOffDays(year, month, range): Observable<any> {
        return this._http.get("specialist/offdays/" + year + "/" + month + "/" + range).catch((err, caught) => {
            return Observable.throw(err);
        });
    }
    getHolidays(year): Observable<any> {
        return this._http.get("annual/holidays/" + year).catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    getSchedule(year, month): Observable<any> {
        return this._http.get("specialist/schedule/" + year + "/" + month).catch((err, caught) => {
            return Observable.throw(err);
        });
    }
    getScheduleDay(year, month, day): Observable<any> {
        return this._http.get("specialist/schedule/" + year + "/" + month + "/" + day).catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    setOffDays(id, offDay, isMarked): Observable<any> {

        let body = {}
        body['OffDays'] = [{
            offDay: offDay,
            isMarked: isMarked,
            id: id
        }]
        return this._http.put("specialist/offdays", body).catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    // --------- Schedule List Count with 
    public getDoctorScheduleListCount(userId): Observable<any> {

        let token: Token;
        token = this._authServices.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        // let userId = token.userId;
        // doctor/schedule/list/count?userId=11
        const getUrl = 'doctor/schedule/list/count?userId=' + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- Schedule List Pagination
    public getDoctorScheduleListPagination(userId, pageNo, limit): Observable<any> {

        let token: Token;
        token = this._authServices.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        // let userId = token.userId;
        // doctor/schedule/list?userId=11&offset=0&limit=7
        const getUrl = 'doctor/schedule/list?userId=' + (userId || null) + '&offset=' + (pageNo || 0) + '&limit=' + (limit || 5);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- get DoctorShift Via Id  
    public getDoctorShiftViaId(shiftId): Observable<any> {

        let token: Token;
        token = this._authServices.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        // let userId = token.userId;
        // doctor/schedule/list/count?userId=11
        const getUrl = 'doctor/schedule/shift/single?doctorScheduleShiftId=' + (shiftId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }
}

export class OffDays {
    id: any;
    offDay: any;
    isMarked: any;
}
export class Holidays {
    holidayOn: any;
    holidayName: any;
}


