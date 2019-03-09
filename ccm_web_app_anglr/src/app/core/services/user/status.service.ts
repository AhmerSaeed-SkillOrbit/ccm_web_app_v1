import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { environment } from "../../../../environments/environment";

@Injectable()
export class StatusService
{
    constructor(private _http: HttpService) {}

    getStatus(): Observable<any> {
        return this._http.get("user/info") .catch((err, caught) => {
            return Observable.throw(err);
        });
    }
}