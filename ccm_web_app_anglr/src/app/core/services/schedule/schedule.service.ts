import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import { AuthService } from "../auth/auth.service";

import { DatePipe } from '@angular/common';

import { Token } from '../../models/token';
import { Schedule } from '../../models/schedule.model';

@Injectable()
export class ScheduleService implements OnDestroy {

    constructor(
        private _authService: AuthService,
        private _http: HttpService,
        public datePipe: DatePipe
    ) { }

    public scheduleDoctor(doctorId, schedule?: Schedule): Observable<any> {
        // const getUrl = 'update/role';
        const getUrl = 'doctor/schedule/save?doctorId=' + (doctorId || null);

        let sd = [];

        if (schedule.scheduleDetails.length > 0) {

            schedule.scheduleDetails.forEach(element => {

                let ss = [];

                if (element.scheduleShifts.length > 0) {

                    element.scheduleShifts.forEach(element1 => {
                        ss.push({
                            StartTime: element1.startTime || "",
                            EndTime: element1.endTime || "",
                        });
                    });
                }


                sd.push({
                    ScheduleDate: element.scheduleDate || null,
                    IsOffDay: element.isOffDay || false,
                    NoOfShift: element.noOfShift || null,
                    ScheduleShift: ss
                    // StartTime: element.startTime || "",
                    // EndTime: element.endTime || "",
                    // ShiftType: element.shiftHour || ""
                });
            });

        }

        const body = {
            // StartDate: "2019-03-27",
            StartDate: schedule.startDate ? this.datePipe.transform(schedule.startDate, 'yyyy-MM-dd') : "",
            EndDate: schedule.endDate ? this.datePipe.transform(schedule.endDate, 'yyyy-MM-dd') : "",
            MonthName: schedule.monthId || schedule.monthId == 0 ? schedule.monthId + 1 : null,
            YearName: schedule.year || null,
            ScheduleDetail: sd
            // ScheduleDetail: [
            //     {
            //         ScheduleDate: "2019-03-27",
            //         IsOffDay: true,
            //         StartTime: "09:00 AM",
            //         EndTime: "13:00 PM",
            //         ShiftType: "4 Hours"
            //     }
            // ]
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

    getHolidays(years: number): Observable<any> {
        return this._http.get('annual/holidays/' + years)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    getShifts(): Observable<any> {
        return this._http.get('schedule/master/shifts')
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    getAvailableConsultant(data): Observable<any> {
        return this._http.get('specialist/available/' + data.speciality + '/'
            + data.year + '/' + data.month + '/' + data.date)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    //specialist get
    getMasterScheduleMonth(data): Observable<any> {
        return this._http.get('schedule/master/' + data.partnerSiteID + "/"
            + data.specialistID + '/'
            + data.year + '/' + data.month)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    getMasterScheduleDay(data): Observable<any> {
        return this._http.get('schedule/master/' + data.partnerSiteID + "/"
            + data.speciality + '/'
            + data.year + '/' + data.month
            + '/' + data.date)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    //supervisor get
    getSupervisorScheduleMonth(data): Observable<any> {
        return this._http.get('schedule/supervisor/'
            + data.specialistID + '/'
            + data.year + '/' + data.month)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    getSupervisorScheduleDay(data): Observable<any> {
        return this._http.get('schedule/supervisor/details/'
            + data.speciality + '/'
            + data.year + '/' + data.month
            + '/' + data.date)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }


    //specialist put
    saveMasterScheduleChanges(data): Observable<any> {
        return this._http.put('schedule/master', data)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    //supervisor put
    saveSupervisorScheduleChanges(data): Observable<any> {
        return this._http.put('schedule/supervisor', data)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }


    //supervisor pending request  get

    getSupervisorPendingRequest(): Observable<any> {
        return this._http.get('supervisor/pending/request')
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    //supervisor pending request put
    assigSupervisorPendingRequest(requestId, userId): Observable<any> {
        return this._http.put('supervisor/assign/request/' + requestId + '/' + userId + '', null)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    ngOnDestroy() {

    }
}

export class supervisor {
    id: any;
    specialityId: any;
    specialityName: any;
    facilityId: any;
    facilityName: any;
    status: any;
    pendingSince: any;
    isHighPriority: any;
    reasonForRequest: any;
    durationInMinutes: any;
    partnerSite: any;
    endPoint: any;
    receivedOn: any;
    connectionFrom: any;
} 