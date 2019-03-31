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
import { Document } from "../../models/document";

import { IAuthService } from '../auth/iauth.service';

@Injectable()
export class FileService {
    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _http: HttpService,
        // private _adminService: AdminService
    ) { }

    // --------- case file save
    // public saveFile(caseData, documentTypeId, file): Observable<any> {
    public saveFile(caseBasicId, documentTypeId, file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/case/doc';
        let body: FormData = new FormData();
        body.append('CaseBasicId', caseBasicId);
        body.append('DocumentTypeId', documentTypeId);
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

    // --------- case file remove
    public removeFile(caseBasicId, documentUploadId): Observable<any> {
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

    // --------- resume save
    public saveResume(file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/lawfirm/lawyer/resume';
        let body: FormData = new FormData();
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    // --------- lawfirm resume save
    public saveLawFirmResume(file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/lawfirm/resume/doc';
        let body: FormData = new FormData();
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    // --------- reference file save
    public saveReference(file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/lawfirm/reference/doc';
        let body: FormData = new FormData();
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    // --------- payment file save
    public savePaymentDoc(caseBasicId, file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/case/expense/doc';
        let body: FormData = new FormData();
        body.append('CaseBasicId', caseBasicId);
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    // --------- proceeding file save
    public saveProceedingDoc(caseBasicId, file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/case/proceeding/doc';
        let body: FormData = new FormData();
        body.append('CaseBasicId', caseBasicId);
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    // --------- case filing file save
    public saveCaseFilingDoc(caseBasicId, file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/case/file/doc';
        let body: FormData = new FormData();
        body.append('CaseBasicId', caseBasicId);
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }
    // --------- plaint file save
    public savePlaintDoc(caseBasicId, file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/case/plaint/doc';
        let body: FormData = new FormData();
        body.append('CaseBasicId', caseBasicId);
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    // --------- Post File Settlement file save
    public savePostFileSettlementUpload(caseBasicId, file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/post/settlement/doc';
        let body: FormData = new FormData();
        body.append('CaseBasicId', caseBasicId);
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    // --------- Pre File Settlement file save
    public savePreFileSettlementUpload(file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/pre/settlement/doc';
        let body: FormData = new FormData();
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    // --------- Defaulter Collateral file save
    public saveDefaulterCollateralDoc(file, defaulterId): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        let getUrl = 'upload/defaulter/collateral/doc';
        let body: FormData = new FormData();
        body.append('DefaulterId', defaulterId);
        body.append('File', file, file.name);
        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    // --------- Defaulter Charge file save
    public saveDefaulterChargeDoc(file, defaulterId): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/defaulter/charge/type/doc';
        let body: FormData = new FormData();
        body.append('DefaulterId', defaulterId);
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }


    // --------- Bail Document save
    public saveBailDocs(file, CaseCourtId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        let getUrl = 'upload/bail/doc';
        let body: FormData = new FormData();
        body.append('File', file, file.name);
        body.append('CaseCourtId', CaseCourtId);
        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }


    // --------- Fir Document save
    public saveFirDocs(file, CaseBasicId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        let getUrl = 'upload/fir/doc';
        let body: FormData = new FormData();
        body.append('File', file, file.name);
        body.append('CaseBasicId', CaseBasicId);
        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    // --------- NPL File save
    public uploadNplFile(file): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        options.headers.append('Accept', 'application/json');
        let getUrl = 'upload/npl/data/file';
        let body: FormData = new FormData();
        body.append('File', file, file.name);
        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    // --------- HR File save
    public uploadHrFile(file): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        options.headers.append('Accept', 'application/json');
        let getUrl = 'upload/hr/data/file';
        let body: FormData = new FormData();
        body.append('File', file, file.name);
        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    // --------- Profile Picture Upload
    public uploadProfilePic(file, userId): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        options.headers.append('Accept', 'application/json');
        let getUrl = 'upload/user/profile/picture';
        let body: FormData = new FormData();
        body.append('File', file, file.name);
        body.append('UserId', userId);
        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    // --------- Bail Document save
    public saveContractDocs(file): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        let getUrl = 'upload/contract/doc';
        let body: FormData = new FormData();
        body.append('File', file, file.name);
        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }

    // --------- advisory file save
    public saveAdvisoryDocs(file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/advisory/doc';
        let body: FormData = new FormData();
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    // --------- advice file save
    public saveAdviceDocs(file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/advisory/service/advice/doc';
        let body: FormData = new FormData();
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    // --------- advisory discussion file save
    public saveAdvisoryDiscussionDocs(file): Observable<any> {
        console.log("file", file);
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Content-Type', 'multipart/form-data');
        options.headers.append('Accept', 'application/json');
        // options.headers.append('Content-Type', 'application/json');

        let getUrl = 'upload/advisory/discussion/doc';
        let body: FormData = new FormData();
        body.append('File', file, file.name);

        return this._http.postWithFile(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
    }
}
