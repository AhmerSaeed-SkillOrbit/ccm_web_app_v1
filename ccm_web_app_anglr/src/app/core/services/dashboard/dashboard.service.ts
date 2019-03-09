import { Http, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';

import { HttpService } from '../base/http.service';
import { FileService } from '../file/file.service';
import { IAuthService } from '../auth/iauth.service';

import { environment } from '../../../../environments/environment';

import { User } from '../../models/user';
import { Token } from "../../models/token";
import { Country } from '../../models/country';
import { Region } from '../../models/region';
import { City } from '../../models/city';
import { Branch } from '../../models/branch';


@Injectable()
export class DashboardService {

    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _http: HttpService,
        private _fileService: FileService,
    ) {
    }

    public getDashboardSuperAdmin(): Observable<any> {
        
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        const getUrl = 'dashboard/superadmin';
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getBranchesViaCityId(id: number): Observable<any> {
        const getUrl = 'branch/via/city/' + id;
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }


    public getZipCodes(countryId: number, zipCode: string): Observable<any> {
        const getUrl = 'location/' + countryId + '/' + zipCode;
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- OBJECTIVE & CATEGORY
    public addCategory(name): Observable<any> {
        const getUrl = 'backoffice/add/campaign/category';
        const body = {
            categoryName: name
        };

        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateCategory(post): Observable<any> {

        const getUrl = 'backoffice/update/campaign/category';
        const body = {
            id: post.id,
            categoryName: post.displayName,
        };

        return this._http.put(getUrl, body)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    // --------- City
    public getCities(): Observable<any> {
        const getUrl = 'city/all';
        return this._http.get(getUrl)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getCityListCount(): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        const getUrl = 'city/count/';
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getCitiesWithPgno(pageNo, limit): Observable<any> {
        const getUrl = 'city/' + pageNo + '/' + limit;
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- Branch
    public getBranchViaCityIdListCount(cityId, keyword = null): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        const getUrl = 'branch/via/city/count/' + (cityId || 0) + '/' + (keyword || "null");;
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getBranchsWithPgno(id, pageNo, limit, keyword = null): Observable<any> {
        const getUrl = 'branch/via/city/' + id + '/' + (keyword || "null") + '/' + pageNo + '/' + limit;
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getBranchs(): Observable<any> {
        const getUrl = 'branch/all';
        return this._http.get(getUrl)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addBranch(branch: Branch): Observable<any> {
        // const getUrl = 'add/branch';
        const getUrl = 'branch/add';

        const body = {
            BranchName: branch.branchName,
            BranchCode: branch.branchCode,
            CityId: branch.cityId,
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

    public updateBranch(branch: Branch): Observable<any> {
        // const getUrl = 'update/branch';
        const getUrl = 'branch/update';
        const body = {
            Id: branch.id,
            BranchId: branch.branchId,
            BranchName: branch.branchName,
            BranchCode: branch.branchCode,
            CityId: branch.cityId,
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

    public deleteBranch(id): Observable<any> {
        // const getUrl = 'delete/branch';
        const getUrl = 'branch/delete';
        const body = {
            id: id
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
