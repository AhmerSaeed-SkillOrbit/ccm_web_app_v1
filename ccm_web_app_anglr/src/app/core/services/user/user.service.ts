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


@Injectable()
export class UserService {
    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _http: HttpService,
        // private _lawFirmService: LawFirmService
        private _fileService: FileService,
    ) { }

    mapUser(res: any): User {
        // const userData = res.json().genericResponse.genericBody.data.userData;
        // const userData = res.json().genericBody.data.userData;

        // const userData = res.json();
        const userData = res.json().data.length > 0 ? res.json().data[0] : null;
        const isUser = new User();
        if (userData) {


            // isUser.fullName = userData.entity.entityName;
            isUser.id = userData.id;
            isUser.sapId = userData.sapId;
            isUser.email = userData.userEmail;
            isUser.password = userData.userPassword;
            isUser.firstName = userData.firstName;
            isUser.lastName = userData.lastName;

            isUser.cnic = userData.cnic;
            isUser.mobileNumber = userData.mobileNum;
            isUser.phoneNumber = userData.phoneNum;

            // isUser.roleId =  userData.roleId;

            // isUser.countryId = userData.countryId;
            isUser.country = userData.country || new Country();
            isUser.countryId = userData.country ? userData.country.id : null;

            isUser.stateId = userData.stateId;
            // isUser.state = userData.state || new State();
            // isUser.stateId = userData.state ? userData.state.id : null;

            // isUser.regionId = userData.regionId;
            isUser.region = userData.region || new Region();
            isUser.regionId = userData.region ? userData.region.id : null;

            // isUser.cityId = userData.cityId;
            isUser.city = userData.city || new City();
            isUser.cityId = userData.city ? userData.city.id : null;

            // isUser.branchId = userData.branchId;
            isUser.branch = userData.branch || new Branch();
            isUser.branchId = userData.branch ? userData.branch.id : null;

            isUser.roles = userData.roles;
            isUser.permissions = userData.permissions;


            // isUser.accountVerified = userData.isActive;
            isUser.isActive = userData.isActive;
            isUser.isBlocked = userData.isBlocked;
            isUser.lastLogin = userData.lastLogin;
            isUser.createdOn = userData.createdOn;
            isUser.createdBy = userData.createdBy;
            isUser.updatedOn = userData.updatedOn;
            isUser.updatedBy = userData.updatedBy;
            // if (userData.flag === null) {
            //     const defaultFlag = {
            //         flagCode: 'green',
            //         flagDescription: 'none',
            //         flagName: 'Green',
            //         flagTooltip: 'none',
            //         id: 2
            //     };
            //     isUser.flag = defaultFlag;
            // } else {
            //     isUser.flag = userData.flag;
            // }

            if (userData.profilePicture) {
                isUser.profilePicture = userData.profilePicture;
                // u.resume = this._fileService.mapDocument(element.resume);
            }

            isUser.resume = this._fileService.mapDocument(userData.resume);
            // isUser.entityType = userData.entity.entityType;
            // isUser.entityId = userData.entity.id;
            // isUser.entityName = userData.entity.entityName;

            // isUser.token = userData.token.token;

            // isUser.permissions = userData.userRole.permissions;
            // isUser.overAllUnreadStatus = userData.entity.overAllUnreadStatus;
            // isUser.profilePic = userData.entity.profilePic;
            // isUser.coverPic = userData.entity.coverPic;;

            // let expiryTime = new Date(Date.now());
            // expiryTime.setSeconds(expiryTime.getSeconds() + userData.token.expiry);
            // isUser.expiry = Date.now() + (userData.token.expiry * 1000);
        }

        return isUser;
    }

    getStatus(): Observable<any> {

        // let url = 'test/info';
        const url = 'user/full';
        let token: Token;
        token = this._authService.getTokenData();
        let tokenId;
        // tokenId = this._authService.getToken();
        tokenId = token.tokenId;


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
                const isUser = this.mapUser(res);
                isUser.isLoggedIn = isUser.isActive && !isUser.isBlocked ? true : false;
                this._authService.storeUser(isUser);
                this._authService.loginStatusChanged.next(isUser);
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
}
