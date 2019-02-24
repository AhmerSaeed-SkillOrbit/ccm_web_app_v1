
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IAuthService } from './iauth.service';
import { UIService } from '../ui/ui.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { Token } from '../../models/token';
import { environment } from '../../../../environments/environment';

import { Message, MessageTypes } from '../../models/message';


@Injectable()
export class AuthService implements IAuthService, OnDestroy {


    private messageSource = new BehaviorSubject<boolean>(false);
    currentMessage = this.messageSource.asObservable();

    loginStatusChanged = new Subject<boolean>();
    loginUserStatusChanged = new Subject<User>();

    private _clientId = '';
    private _clientSecret = '';
    private token_expires: number;
    constructor(private _http: Http, private _router: Router,
        private _uiService: UIService,
    ) {
    }

    ngOnDestroy(): void {
        console.log('destorying auth service');
    }

    /**
    * Build API url.
    * @param url
    * @returns {string}
    */
    signinstatus(message: boolean) {
        this.messageSource.next(message);
    }

    protected getAuthFullUrl(url: string): string {
        return environment.authBaseUrl + url;
    }

    protected getFullUrl(url: string): string {
        return environment.apiBaseUrl + url;
    }

    protected mapUser(res: any): User {
        const userData = res.json();
        const isUser = new User();
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
        isUser.countryId = userData.countryId;
        isUser.stateId = userData.stateId;
        isUser.regionId = userData.regionId;
        isUser.cityId = userData.cityId;
        isUser.branchId = userData.branchId;

        // isUser.accountVerified = userData.isActive;
        isUser.isActive = userData.isActive;
        isUser.isBlocked = userData.isBlocked;
        isUser.lastLogin = userData.lastLogin;
        isUser.createdOn = userData.createdOn;
        isUser.createdBy = userData.createdBy;
        isUser.updatedOn = userData.updatedOn;
        isUser.updatedBy = userData.updatedBy;

        return isUser;
    }

    /**
     * Build API url
     * @param res
     */
    protected getAPIFullUrl(url: String): string {
        return environment.apiBaseUrl + url;
    }

    private SaveToken(response: Response) {
        const data = response.json().data;
        this.token_expires = Date.now() + ((data.expiryTime - 60) * 1000);
        console.log('expiry:' + data.expiryTime);
        localStorage.setItem('token_id', data.accessToken);
        localStorage.setItem('token_expiry', this.token_expires.toString());
        localStorage.setItem('userId', data.userId);
        // localStorage.setItem('refresh_token', data.refresh_token);
        // localStorage.setItem('token_type', data.token_type);
        // setTimeout(function(){ this.logoutUser(); }, (data.expiryTime * 1000));
        // console.log();

        return data;
    }

    checkToken(): boolean {
        if (localStorage.getItem('token_id')) {
            if ((parseInt(localStorage.getItem('token_expiry'))) > Date.now()) {
                return true;
            } else {
                this.logoutUser();
                return false;
            }
        } else {
            return false;
        }

    }

    isLoggedIn(): boolean {
        const token = this.getTokenData();
        if (token && token.tokenExpiry) {
            if (token.tokenExpiry > Date.now().toString()) {
                return true;
            }
        }
        return false;
    }


    checkLogin(user: User): Observable<any> {
        // const url = this.getAuthFullUrl('connect/token');
        const url = this.getAuthFullUrl('login');
        const params = new URLSearchParams();
        params.append('grant_type', environment.grant_type);
        params.append('email', user.email);
        params.append('password', user.password);
        params.append('client_id', environment.client_id);
        params.append('client_secret', environment.client_secret);

        const options = new RequestOptions();

        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(url, params.toString(), options)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
            .do((res) => {
                this.SaveToken(res);
            });


    }


    forgotPassword_(user: User): Observable<any> {
        const url = this.getFullUrl('forgetpassword');
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        const body = {
            entityType: user.entityType,
            email: user.email,
        };

        return this._http.post(url, body, options)
            .catch((err, caught) => {
                //console.log(err);
                return Observable.throw(err);
            });
    }

    forgotPassword(user: User): Observable<any> {
        const url = this.getAPIFullUrl('user/reset/password/' + user.email);
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        const body = {};

        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }


    resetPassword(user: User, key: string): Observable<any> {
        const url = this.getFullUrl('user/registration/verify');

        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        const body = {
            VerificationKey: key,
            UserPassword: user.password,
        };
        return this._http.put(url, body)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    checkEntityNameAvailability(entityName, entityType): Observable<any> {

        const url = this.getFullUrl('name/available');

        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        const body = {
            entityName: entityName,
            entityType: entityType
        };

        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    checkSapIdAvailability(sapId): Observable<any> {

        const url = this.getAPIFullUrl('/user/sapid/available/' + sapId);
        return this._http.get(url).catch((err, caught) => {
            return Observable.throw(err);
        });

    }

    checkEmailAvailability(emailAddress, entityType): Observable<any> {
        const url = this.getAPIFullUrl('/user/email/available/' + emailAddress);
        return this._http.get(url).catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    update(user): Observable<any> {
        const url = this.getAPIFullUrl('user/registration/complete');
        const body = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            title: user.title,
            credentials: user.credentials,
            employer: user.employer,
            address: user.address,
            cityId: user.city.id,
            countryId: user.country.id,
            zipCode: user.zipCode,
            stateId: user.state.id,
            secretQuestion1: user.secretQuestion1,
            secretQuestion2: user.secretQuestion2,
            secretAnswer1: user.secretAnswer1,
            secretAnswer2: user.secretAnswer2
        };

        return this._http.put(url, body)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    verifyToken(inviteCode, type): Observable<any> {
        // const url = this.getAPIFullUrl('user/registration');
        const url = this.getAPIFullUrl('invite/update');

        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        const body = {
            Token: inviteCode || null,
            Type: type || null,
        };

        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    register(user: User, inviteCode, type): Observable<any> {

        // const url = this.getAPIFullUrl('user/registration');
        const url = this.getAPIFullUrl('register');

        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        const body = {
            InviteCode: inviteCode || null,
            Type: type || null,
            FirstName: user.firstName || null,
            LastName: user.lastName || null,

            EmailAddress: user.email || null,
            Password: user.password || null,

            MobileNumber: user.mobileNumber || null,
            TelephoneNumber: user.phoneNumber || null,
            OfficeAddress: user.officeAddress || null,
            ResidentialAddress: user.ResidentialAddress || null,
            Gender: user.gender || null,
            FunctionalTitle: user.functionalTitle || null,
            Age: user.age || null,
            AgeGroup: user.ageGroup || null,


            CountryId: user.countryId,
            RegionId: user.regionId,
            CityId: user.cityId,
            BranchId: user.branchId
        };

        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    verifyKey(key: string): Observable<any> {
        const url = this.getAPIFullUrl('user/verify/account');
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        const body = { VerificationKey: key };

        return this._http.put(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    resendEmail(user: User): Observable<any> {
        const url = this.getFullUrl('accountverification/resend');
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        const body = {
            email: user.email,
            entityType: user.entityType
        };
        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    resendVerificationEmail(user: User): Observable<any> {
        const url = this.getFullUrl('user/resend/verification/email/' + user.email);

        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        const body = {};
        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    getToken(): string {
        return localStorage.getItem('token_id');
    }

    getTokenData(): Token {

        const token = new Token();

        token.tokenId = localStorage.getItem('token_id');
        token.tokenExpiry = localStorage.getItem('token_expiry');
        // token.refreshToken = localStorage.getItem('refresh_token');
        // token.tokenType = localStorage.getItem('token_type');
        token.userId = +localStorage.getItem('userId');

        return token;

    }

    getLoggedinUser(): User {
        return this.getUser();
    }

    public storeUser(user: User) {
        if (!user) { return; }

        localStorage.setItem('user', JSON.stringify(user));
        this.loginUserStatusChanged.next(user);
    }

    public storeUrlPath(urlPath: string) {
        localStorage.setItem('urlPath', JSON.stringify(urlPath));
    }

    getUrlPath(): string {
        return JSON.parse(localStorage.getItem('urlPath'));
    }

    getUser(): User {
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user'));
        }
        return;
    }




    verifyEmail(email: String) {
        const url = this.getAPIFullUrl('/user/email/available/' + email);
        return this._http.get(url).catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    logoutUser() {
        console.log("logout");
        localStorage.clear();
        this.loginStatusChanged.next(null);
        this.loginUserStatusChanged.next(null);
        this._router.navigate(['/']);

        // this.loginStatusChangedNew.next("Abc");
    }

    errStatusCheck(err: any): any {
        let errMsg: string;
        console.log('err', err);
        const msg = new Message();
        msg.title = '';
        msg.iconType = '';
        if (err.status == 400) {
            msg.msg = err.json() ? err.json().message : 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg;

        } else if (err.status == 401) {
            msg.msg = err.json() ? err.json() : 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg;

        } else if (err.status == 403) {

            this._router.navigate(['/permission']);

        } else if (err.status == 404 && err.statusText == 'Not Found') {

            msg.msg = 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg;

        } else if (err.status == 404 && err.statusText !== 'Not Found') {

            msg.msg = err.json() ? err.json() : 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg;

        } else {
            msg.msg = 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg;
        }
    }

    errStatusCheckResponse(err: any): any {
        let errMsg: string;
        console.log('err', err);

        const msg = new Message();
        msg.title = '';
        msg.iconType = '';
        if (err.status == 400) {
            msg.msg = err.json() ? err.json().message : 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg;

        } else if (err.status == 401) {
            msg.msg = err.json() ? err.json().message : 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg;

        } else if (err.status == 403) {

            this._router.navigate(['/permission']);

        } else if (err.status == 404 && err.statusText == 'Not Found') {

            msg.msg = 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg;

            // this._router.navigate(['/error']);

        } else if (err.status == 404 && err.statusText !== 'Not Found') {

            msg.msg = err.json() ? err.json().message : 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg;

        } else {
            msg.msg = 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg;
        }
    }
}
