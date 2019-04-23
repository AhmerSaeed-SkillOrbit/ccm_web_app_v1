import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy, Inject } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { User } from "../../models/user";
import { Token } from "../../models/token";
import { FileUpload } from "../../models/fileUpload";

import { IAuthService } from '../auth/iauth.service';
import { GenericFileUpload } from '../../models/genericFileUpload';

@Injectable()
export class FileService {
    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _http: HttpService,
        // private _adminService: AdminService
    ) { }

    // --------- Profile Picture Upload
    public uploadProfilePic(file, userId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        options.headers.append('Accept', 'application/json');

        let loggedInUserId = token.userId;

        // upload/profile/picture?userId=3&byUserId=3
        let getUrl = "upload/profile/picture?userId=" + (userId || null) + "&byUserId=" + (loggedInUserId || null);
        let body: FormData = new FormData();
        body.append('File', file, file.name);
        body.append('UserId', userId);
        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    // --------- file save
    // public saveFile(caseData, documentTypeId, file): Observable<any> {
    public saveGenericFile(fileUpload: GenericFileUpload, file): Observable<any> {
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

        // upload/general/file/?byUserId=3
        let getUrl = "upload/general/file?byUserId=" + (userId || null);
        let body: FormData = new FormData();
        body.append('Purpose', fileUpload.fileUploadPurpose);
        body.append('File', file, file.name);
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

    // --------- file remove
    public removeGenericFile(caseBasicId, documentUploadId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'remove/case/document/' + caseBasicId + '/' + documentUploadId;
        let body = {}

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }


    public getGeneralFileListCount(searchKeyword, byUserRole, searchDateFrom, searchDateTo) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // general/file/list/count?userId=1&searchKeyword=tes&byUserRole=3&searchDateFrom=null&searchDateTo=null
        let getUrl = "general/file/list/count?userId=" + (userId || null) + "&searchKeyword=" + (searchKeyword || null) + "&byUserRole=" + (byUserRole || null) +
            "&searchDateFrom=" + (searchDateFrom || null) + "&searchDateTo=" + (searchDateTo || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    public getGeneralFileListPagination(pageNo, limit, searchKeyword, byUserRole, searchDateFrom, searchDateTo) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // general/file/list?userId=1&searchKeyword=tes&byUserRole=3&pageNo=0&limit=10&searchDateFrom=null&searchDateTo=null
        let getUrl = "general/file/list?userId=" + (userId || null) + "&pageNo=" + (pageNo || 0) + "&limit=" + (limit || 5) +
            "&searchKeyword=" + (searchKeyword || null) + "&byUserRole=" + (byUserRole || null) +
            "&searchDateFrom=" + (searchDateFrom || null) + "&searchDateTo=" + (searchDateTo || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    public getSingleGeneralFile(fileId) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // patient/ccm/plan/single?userId=11&patientId=65&id=339
        let getUrl = 'general/file/single?userId=' + (userId || null) + '&id=' + (fileId || null);

        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }


}
