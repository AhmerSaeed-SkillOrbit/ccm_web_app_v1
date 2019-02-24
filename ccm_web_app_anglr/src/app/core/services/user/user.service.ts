import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../base/http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { User } from '../../models/user';
import { Token } from '../../models/token';

import { IAuthService } from '../auth/iauth.service';
import { FileService } from '../file/file.service';

import { environment } from '../../../../environments/environment';
import { Country } from '../../models/country';
import { Region } from '../../models/region';
import { City } from '../../models/city';
import { Branch } from '../../models/branch';
import { MappingService } from '../mapping/mapping.service';


@Injectable()
export class UserService {
    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _http: HttpService,
        // private _lawFirmService: LawFirmService
        private _mappingService: MappingService,
        private _fileService: FileService,
    ) { }

    getStatus(): Observable<any> {

        // let url = 'test/info';

        let token: Token;
        token = this._authService.getTokenData();
        // let tokenId = token.tokenId;
        let userId = token.userId;

        const url = 'user/single?id=' + (userId || null);

        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Authorization', 'Bearer ' + tokenId);
        // options.headers.append('Authorization', 'Bearer '+token);

        return this._http.get(url, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
            .do((res) => {
                // const isUser = this.mapUser(res);
                const isUser = this._mappingService.mapUser(res.json().data);
                // isUser.isLoggedIn = isUser.isActive && !isUser.isBlocked ? true : false;
                this._authService.storeUser(isUser);
                // this._authService.loginStatusChanged.next(isUser);
            });
    }

    getUserById(userId): Observable<any> {
        const url = 'user/full/via/id/' + userId;
        let token: Token;
        token = this._authService.getTokenData();
        let tokenId;
        tokenId = token.tokenId;
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(url, options)
            .map((res: Response) => res.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    getUserByIdNew(userId): Observable<any> {
        const url = 'user/profile/' + userId;
        let token: Token;
        token = this._authService.getTokenData();
        let tokenId;
        tokenId = token.tokenId;
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(url, options)
            .map((res: Response) => res.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    updateUserPassword(id, currentPass, newPass): Observable<any> {

        // const getUrl = 'change/password';
        const getUrl = 'user/change/password';
        const body = {
            Id: id,
            CurrentPassword: currentPass,
            NewPassword: newPass
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    sendInvite(email, type, userId): Observable<any> {
        const url = 'invite';
        const body = {
            email: email || null,
            type: type || null,
            userId: userId || null
        };

        let token: Token;
        token = this._authService.getTokenData();

        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(url, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }
}
