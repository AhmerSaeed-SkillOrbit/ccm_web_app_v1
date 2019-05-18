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
import { p } from '@angular/core/src/render3';


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

    getUserRole(): Observable<any> {

        // let url = 'test/info';

        let token: Token;
        token = this._authService.getTokenData();
        // let tokenId = token.tokenId;
        let userId = token.userId;

        const url = 'permission/via/user/id?UserId=' + (userId || null);

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
                let array = res.json().data || [];
                let pList = [];
                array.forEach(element => {
                    pList.push(this._mappingService.mapPermission(element));
                });
                // const isUser = this._mappingService.mapPermission(res.json().data);
                this._authService.storePermission(pList);
            });
    }

    getUserById(userId): Observable<any> {

        // const url = 'user/full/via/id/' + userId;
        const url = 'user/single?id=' + (userId || null);

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

    // --------- Add Bulk User
    public addBulkUser(file, type): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let userId = token.userId;

        // bulk/user/register/
        // let getUrl = "bulk/user/register?byUserId=" + (userId || null);
        let getUrl = "bulk/user/register";
        let body: FormData = new FormData();

        body.append('file', file, file.name);
        body.append('id', userId.toString() || null);
        body.append('type', type || null);

        // let body = {
        //     CaseBasicId: caseBasicId || 0, //for insert or update 
        //     DocumentTypeId: documentTypeId || 0,
        //     File: file || null,
        // }

        // return this._http.post(getUrl, body, options)
        //     .map((res: Response) => res)
        //     .catch((err, caught) => {
        //         return Observable.throw(err);
        //     })
        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    public addPatient(user: User): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        const getUrl = 'patient/add';
        let body = {
            SourceUserId: userId || null,

            FirstName: user.firstName || null,
            LastName: user.lastName || null,
            EmailAddress: user.email || null,
            // Password: user.password || null,
            CountryPhoneCode: user.countryPhoneCode || null,
            MobileNumber: user.mobileNumber || null,
            TelephoneNumber: user.phoneNumber || null,
            OfficeAddress: user.officeAddress || null,
            ResidentialAddress: user.residentialAddress || null,
            Gender: user.gender || null,
            FunctionalTitle: user.functionalTitle || null,
            Age: user.age || null,
            AgeGroup: user.ageGroup || null,
            RoleId: user.roleId || null,
            RoleCode: user.role.roleCode || null,
            // RoleCode: user.roleCode || null,

            // CountryId: user.countryId,
            // RegionId: user.regionId,
            // CityId: user.cityId,
            // BranchId: user.branchId
        }

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public addUser(user: User): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        const getUrl = 'user/add';
        let body = {

            FirstName: user.firstName || null,
            LastName: user.lastName || null,
            EmailAddress: user.email || null,
            // Password: user.password || null,
            CountryPhoneCode: user.countryPhoneCode || null,
            MobileNumber: user.mobileNumber || null,
            TelephoneNumber: user.phoneNumber || null,
            OfficeAddress: user.officeAddress || null,
            ResidentialAddress: user.residentialAddress || null,
            Gender: user.gender || null,
            FunctionalTitle: user.functionalTitle || null,
            Age: user.age || null,
            AgeGroup: user.ageGroup || null,
            RoleId: user.roleId || null,
            RoleCode: user.role.roleCode || null,
            // RoleCode: user.roleCode || null,

            // CountryId: user.countryId,
            // RegionId: user.regionId,
            // CityId: user.cityId,
            // BranchId: user.branchId
        }

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public updateUser(user: User): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        const getUrl = 'user/update?id=' + (user.id || null);
        let body = {

            // Id: user.id,
            // PatientUniqueId: user.patientUniqueId || null,
            FirstName: user.firstName || null,
            LastName: user.lastName || null,
            // EmailAddress: user.email || null,
            // Password: user.password || null,

            CountryPhoneCode: user.countryPhoneCode || null,
            MobileNumber: user.mobileNumber || null,
            TelephoneNumber: user.phoneNumber || null,
            OfficeAddress: user.officeAddress || null,
            ResidentialAddress: user.residentialAddress || null,
            Gender: user.gender || null,
            FunctionalTitle: user.functionalTitle || null,
            Age: user.age || null,
            AgeGroup: user.ageGroup || null,
            ProfileSummary: user.profileSummary || null,


            // CountryId: user.countryId,
            // RegionId: user.regionId,
            // CityId: user.cityId,
            // BranchId: user.branchId
        }

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    public deleteUser(Id): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        const getUrl = 'user/delete?id=' + (Id || null);

        console.log('getUrl');
        console.log(getUrl);

        let body = {
            Id: Id
        }

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    updateUserPassword(id, currentPass, newPass): Observable<any> {

        // const getUrl = 'change/password';
        const getUrl = 'change/password';
        const body = {
            id: id,
            oldPassword: currentPass || null,
            newPassword: newPass || null
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

    sendInvite(email, mobileNo, phoneCode, type, userId): Observable<any> {
        const url = 'invite';
        const body = {
            email: email || null,
            CountryPhoneCode: phoneCode || null,
            mobileNumber: mobileNo || null,
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

    // --------- User All
    public getUsersListAll(): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;
        // user/list/search?p=0&c=2&s=null&r=null
        const getUrl = 'user/list';
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- User List Count with role and search
    public getUsersListCount(searchKey, roleCode): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;
        // user/count?s=null&r=super_admin
        const getUrl = 'user/count?s=' + (searchKey || null) + '&r=' + (roleCode || null) + '&userId=' + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- User Pagination
    public getUsersListPagination(pageNo, limit, searchKey, roleCode): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;
        // user/list/search?p=0&c=2&s=null&r=null
        const getUrl = 'user/list/search?p=' + (pageNo || 0) + '&c=' + (limit || 5) + '&s=' + (searchKey || null) + '&r=' + (roleCode || null) + '&userId=' + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- Associated Facilitator All
    public getAssociatedFacilitatorAll(doctorId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        // let userId = token.userId;
        // user/list/search?p=0&c=2&s=null&r=null
        const getUrl = 'doctor/facilitator?doctorId=' + (doctorId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- Patient Associated Doctor
    public getPatientAssociatedDoctor(patientId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        // let userId = token.userId;
        // user/list/search?p=0&c=2&s=null&r=null
        const getUrl = 'patient/associated/doctor?patientId=' + (patientId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public assignFacilitator(doctor, facilitators): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        const getUrl = 'associate/doctor/facilitator';

        let fls = [];
        if (facilitators && facilitators.length > 0) {
            facilitators.forEach(element => {
                fls.push({
                    Id: element.id
                });

            });

        }

        let body = {
            DoctorId: doctor.id || null,
            Facilitator: fls || []
        }

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    // --------- User List Via Role Code
    public getUserListViaRole(roleCode): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        // let userId = token.userId;
        // user/list/search?p=0&c=2&s=null&r=null
        const getUrl = 'user/via/role?roleCode=' + (roleCode || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }



    // --------- User login history List Count with role and search
    public getUserLoginHistoryListCount(ofUserId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;
        const getUrl = 'login/history/count?byUserId=' + (userId || null) + '&ofUserId=' + (ofUserId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- User Login History Pagination
    public getUserLoginHistoryListPagination(pageNo, limit, ofUserId): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;
        // user/list/search?p=0&c=2&s=null&r=null
        const getUrl = 'login/history/all?byUserId=' + (userId || null) + '&ofUserId=' + (ofUserId || null) + '&p=' + (pageNo || 0) + '&c=' + (limit || 5);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- get Publish Tab
    public getPublishTab(): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;
        // user/list/search?p=0&c=2&s=null&r=null
        const getUrl = 'patient/record/tab/published?patientId=' + (userId || null);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- Doctor All
    public getDoctorListAll(): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;
        const getUrl = 'doctor/list';
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }
}
