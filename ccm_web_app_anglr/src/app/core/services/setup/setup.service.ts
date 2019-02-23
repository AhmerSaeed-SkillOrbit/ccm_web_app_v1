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
export class SetupService {

    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _http: HttpService,
        private _fileService: FileService,
    ) {
    }

    public getCountries(): Observable<any> {
        const getUrl = 'country/all';
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // public getRegions(): Observable<any> {
    //     const getUrl = 'region/all';
    //     return this._http.get(getUrl)
    //         .map((res: Response) => res)
    //         .catch((error: any) => {
    //             return Observable.throw(error);
    //         }
    //         );
    // }


    public getRegionsViaCountryId(countryId: number): Observable<any> {
        const getUrl = 'region/via/country/' + countryId;
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getStates(): Observable<any> {
        const getUrl = 'states/all';
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getStatesViaCountryId(countryId: number): Observable<any> {
        const getUrl = 'state/via/country/' + countryId;
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getCitiesViaRegionId(id: number): Observable<any> {
        const getUrl = 'city/via/region/' + id;
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getCitiesViaStateId(id: number): Observable<any> {
        const getUrl = 'city/via/state/' + id;
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getBranches(): Observable<any> {
        const getUrl = 'branches/all';
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
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


    // --------- Region
    public getRegionViaCountryIdListCount(countryId, keyword = null): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        const getUrl = 'region/via/country/count/' + (countryId || 0) + '/' + (keyword || "null");;
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getRegionsWithPgno(id, pageNo, limit, keyword = null): Observable<any> {
        const getUrl = 'region/via/country/' + id + '/' + (keyword || "null") + '/' + pageNo + '/' + limit;
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getRegions(): Observable<any> {
        const getUrl = 'region/all';
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addRegion(region): Observable<any> {
        // const getUrl = 'add/region';
        const getUrl = 'region/add';

        const body = {
            RegionName: region.regionName,
            CountryId: region.countryId,
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

    public updateRegion(region): Observable<any> {
        // const getUrl = 'update/region';
        const getUrl = 'region/update';
        const body = {
            Id: region.id,
            RegionId: region.regionId,
            RegionName: region.regionName,
            CountryId: region.countryId,
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

    public deleteRegion(id): Observable<any> {
        // const getUrl = 'delete/region';
        const getUrl = 'region/delete';
        const body = {
            Id: id
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

    public assignCitiestoRegion(citiesData: City[], region: Region): Observable<any> {
        const getUrl = 'city/region/assign';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let cts = [];

        if (citiesData && citiesData.length > 0) {
            citiesData.forEach(element => {
                cts.push({
                    Id: element.id
                });
            });
        }

        const body = {
            RegionId: region.id || null,
            City: cts
        };

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    // --------- Designation
    public getDesignationCount(): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        const getUrl = 'designation/all/count';
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getDesignations(): Observable<any> {
        const getUrl = 'designation/all';
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getDesignationsWithPgNo(pageNo, limit): Observable<any> {
        const getUrl = 'designation/all/' + pageNo + '/' + limit;
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addDesignation(post): Observable<any> {
        // const getUrl = 'add/designation';
        const getUrl = 'designation/add';
        const body = {
            DesignationName: post.designationName,
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

    public updateDesignation(post): Observable<any> {
        // const getUrl = 'update/designation';
        const getUrl = 'designation/update';
        const body = {
            Id: post.id,
            DesignationId: post.designationId,
            DesignationName: post.designationName,
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

    public deleteDesignation(id): Observable<any> {
        // const getUrl = 'delete/designation';
        const getUrl = 'designation/delete';
        const body = {
            Id: id
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


    // --------- Department

    public getDepartmentCount(): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        const getUrl = 'department/all/count';
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getDepartmentsWithPgNo(pageNo, limit): Observable<any> {
        const getUrl = 'department/all/' + pageNo + '/' + limit;
        console.log('getDepartmentsWithPgNo', getUrl);

        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getDepartments(): Observable<any> {
        const getUrl = 'department/all';
        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addDepartment(department): Observable<any> {
        // const getUrl = 'add/department';
        const getUrl = 'department/add';
        const body = {
            DepartmentName: department.departmentName,
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

    public updateDepartment(department): Observable<any> {
        // const getUrl = 'update/department';
        const getUrl = 'department/update';
        const body = {
            Id: department.id,
            DepartmentId: department.departmentId,
            DepartmentName: department.departmentName,
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

    public deleteDepartment(id): Observable<any> {
        // const getUrl = 'delete/department';
        const getUrl = 'department/delete';
        const body = {
            Id: id
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


    // --------- Role
    public getRoleViaIdListCount(id): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        const getUrl = 'role/via/department/count/' + id;
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getRolesViaId(id, pageNo, limit): Observable<any> {
        // const getUrl = 'role/' + id;
        const getUrl = 'role/via/department/' + id + '/' + pageNo + '/' + limit;
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

    public getRoleViaDepartmentCount(id): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        const getUrl = 'role/via/department/count/' + id;
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getRolesViaDepartmentId(roleId: any): Observable<any> {
        const getUrl = 'role/via/department/' + roleId;
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


    public getRolesWithCount(keyword): Observable<any> {
        const getUrl = 'role/all/count/' + (keyword || "null");
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

    public getRolesWithPgno(keyword, pageNo, limit): Observable<any> {
        const getUrl = 'role/all/' + (keyword || "null") + '/' + (pageNo || 0) + '/' + (limit || 10);
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

    public getRoles(): Observable<any> {
        const getUrl = 'role/all';
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

    public addRole(role): Observable<any> {
        // const getUrl = 'add/role';
        const getUrl = 'role/add';
        const body = {
            RoleName: role.roleName,
            DepartmentId: role.departmentId,
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

    public updateRole(role): Observable<any> {
        // const getUrl = 'update/role';
        const getUrl = 'role/update';
        const body = {
            Id: role.id,
            RoleId: role.roleId,
            RoleName: role.roleName,
            DepartmentId: role.departmentId,
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

    public deleteRole(id): Observable<any> {
        // const getUrl = 'delete/role';
        const getUrl = 'role/delete';
        const body = {
            Id: id
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

    public getRolesWithPermissions(): Observable<any> {
        const getUrl = 'role/permission/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    // --------- Permission

    public getPermissionListCount(): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        const getUrl = 'permission/all/count';
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getPermissionsWithPgno(pageNo, limit): Observable<any> {
        const getUrl = 'permission/all/' + pageNo + '/' + limit;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getPermissions(): Observable<any> {
        const getUrl = 'permission/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getPermissionsViaOffsetLimit(pageNo, limit): Observable<any> {

        console.log("pageNo", pageNo);
        console.log("limit", limit);
        const getUrl = "permission/all/" + (pageNo || 0) + "/" + (limit || 0);
        // const getUrl = "permission/all/" + pageNo.toString() || "0" + "/" + limit.toString() || "0";

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addPermission(permission): Observable<any> {
        // const getUrl = 'add/permission';
        const getUrl = 'permission/add';
        const body = {
            PermissionName: permission.permissionName,
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

    public updatePermission(permission): Observable<any> {
        // const getUrl = 'update/permission';
        const getUrl = 'permission/update';
        const body = {
            Id: permission.id,
            PermissionId: permission.permissionId,
            PermissionName: permission.permissionName,
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

    public deletePermission(id): Observable<any> {
        // const getUrl = 'delete/permission';
        const getUrl = 'permission/delete';
        const body = {
            Id: id
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


    public assignPermissionToRole(role, permissions): Observable<any> {
        // const getUrl = 'assign/role/permissions';
        const getUrl = 'role/permission/assign';
        const body = {
            RoleId: role.roleId,
            Permissions: permissions,
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


    // --------- CaseType

    public getCaseTypeListCount(): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        const getUrl = 'case/type/all/count';
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getCaseTypes(pageNo, limit): Observable<any> {
        // const getUrl = 'casetype/all';
        const getUrl = 'case/type/all/' + pageNo + '/' + limit;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addCaseType(caseType): Observable<any> {
        // const getUrl = 'add/casetype';
        const getUrl = 'case/type/add';
        const body = {
            CaseType: caseType.caseType,
            CaseTypeDescription: caseType.caseTypeDescription,
            CaseTypeTooltip: caseType.caseTypeTooltip,
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

    public updateCaseType(caseType): Observable<any> {
        // const getUrl = 'update/caseType';
        const getUrl = 'case/type/update';
        const body = {
            Id: caseType.id,
            CaseTypeId: caseType.caseTypeId,
            CaseType: caseType.caseType,
            CaseTypeDescription: caseType.caseTypeDescription,
            CaseTypeTooltip: caseType.caseTypeTooltip,
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

    public deleteCaseType(id): Observable<any> {
        // const getUrl = 'delete/caseType';
        const getUrl = 'case/type/delete';
        const body = {
            Id: id
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


    // --------- CaseNature

    public getCaseNatureListCount(): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        const getUrl = 'case/nature/all/count';
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getCaseNatures(pageNo, limit): Observable<any> {
        // const getUrl = 'caseNature/all';
        const getUrl = 'case/nature/all/' + pageNo + '/' + limit;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addCaseNature(caseNature): Observable<any> {
        // const getUrl = 'add/caseNature';
        const getUrl = 'case/nature/add';
        const body = {
            CaseNature: caseNature.caseNature,
            CaseNatureDescription: caseNature.caseNatureDescription,
            CaseNatureTooltip: caseNature.caseNatureTooltip,
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

    public updateCaseNature(caseNature): Observable<any> {
        // const getUrl = 'update/caseNature';
        const getUrl = 'case/nature/update';
        const body = {
            Id: caseNature.id,
            CaseNatureId: caseNature.caseNatureId,
            CaseNature: caseNature.caseNature,
            CaseNatureDescription: caseNature.caseNatureDescription,
            CaseNatureTooltip: caseNature.caseNatureTooltip,
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

    public deleteCaseNature(id): Observable<any> {
        // const getUrl = 'delete/caseNature';
        const getUrl = 'case/nature/delete';
        const body = {
            Id: id
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


    // --------- CaseTerritory

    public getCaseTerritoryCount(): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        const getUrl = 'case/territory/all/count';
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getCaseTerritories(pageNo, limit): Observable<any> {
        const getUrl = 'case/territory/all/' + pageNo + '/' + limit;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addCaseTerritory(caseTerritory): Observable<any> {
        const getUrl = 'case/territory/add';
        const body = {
            CaseTerritory: caseTerritory.caseTerritory,
            CaseTerritoryDescription: caseTerritory.caseTerritoryDescription,
            CaseTerritoryTooltip: caseTerritory.caseTerritoryTooltip,
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

    public updateCaseTerritory(caseTerritory): Observable<any> {
        const getUrl = 'case/territory/update';
        const body = {
            Id: caseTerritory.id,
            CaseTerritoryId: caseTerritory.caseTerritoryId,
            CaseTerritory: caseTerritory.caseTerritory,
            CaseTerritoryDescription: caseTerritory.caseTerritoryDescription,
            CaseTerritoryTooltip: caseTerritory.caseTerritoryTooltip,
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

    public deleteCaseTerritory(id): Observable<any> {
        const getUrl = 'case/territory/delete';
        const body = {
            Id: id
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


    // --------- CaseClassification

    public getCaseClassificationCount(): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        const getUrl = 'case/classification/all/count';
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getCaseClassifications(): Observable<any> {
        // const getUrl = 'caseClassification/all';
        const getUrl = 'case/classification/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);


        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }


    public getCaseClassificationsPagination(pageNo, limit): Observable<any> {
        // const getUrl = 'caseClassification/all';
        const getUrl = 'case/classification/all/' + pageNo + '/' + limit;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);


        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addCaseClassification(caseClassification): Observable<any> {
        // const getUrl = 'add/caseClassification';
        const getUrl = 'case/classification/add';
        const body = {
            CaseClassification: caseClassification.caseClassification,
            CaseClassificationDescription: caseClassification.caseClassificationDescription,
            CaseClassificationTooltip: caseClassification.caseClassificationTooltip,
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

    public updateCaseClassification(caseClassification): Observable<any> {
        // const getUrl = 'update/caseClassification';
        const getUrl = 'case/classification/update';
        const body = {
            Id: caseClassification.id,
            CaseClassificationId: caseClassification.caseClassificationId,
            CaseClassification: caseClassification.caseClassification,
            CaseClassificationDescription: caseClassification.caseClassificationDescription,
            CaseClassificationTooltip: caseClassification.caseClassificationTooltip,
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

    public deleteCaseClassification(id): Observable<any> {
        // const getUrl = 'delete/caseClassification';
        const getUrl = 'case/classification/delete';
        const body = {
            Id: id
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


    // --------- CaseDocumentType

    public getCaseDocumentTypeCount(): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        const getUrl = 'case/document/type/all/count';
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getCaseDocumentTypesWithPgno(pageNo, limit): Observable<any> {
        // const getUrl = 'caseDocumentType/all';
        const getUrl = 'case/document/type/all/' + pageNo + '/' + limit;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getCaseDocumenttypesViaBelongCode(belongsToCode): Observable<any> {
        // const getUrl = 'caseDocumentType/all';
        const getUrl = 'case/document/type/' + belongsToCode;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addCaseDocument(caseDocument): Observable<any> {
        // const getUrl = 'add/caseDocument';
        const getUrl = 'case/document/add';
        const body = {
            DocumentName: caseDocument.documentName,
            DocumentDescription: caseDocument.documentDescription,
            DocumentTooltip: caseDocument.documentTooltip,
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

    public updateCaseDocument(caseDocument): Observable<any> {
        // const getUrl = 'update/caseDocument';
        const getUrl = 'case/document/update';
        const body = {
            Id: caseDocument.id,
            DocumentId: caseDocument.documentId,
            DocumentName: caseDocument.documentName,
            DocumentDescription: caseDocument.documentDescription,
            DocumentTooltip: caseDocument.documentTooltip,
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

    public deleteCaseDocument(id): Observable<any> {
        // const getUrl = 'delete/caseDocument';
        const getUrl = 'case/document/delete';
        const body = {
            Id: id
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

    // --------- CaseDocumentNature

    public getCaseDocumentNatures(pageNo, limit): Observable<any> {
        // const getUrl = 'caseDocumentNature/all';
        const getUrl = 'case/document/nature/all/' + pageNo + '/' + limit;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public addCaseDocumentNature(caseDocumentNature): Observable<any> {
        // const getUrl = 'add/caseDocumentNature';
        const getUrl = 'case/document/nature/add';
        const body = {
            DocumentNature: caseDocumentNature.documentNature,
            DocumentNatureDescription: caseDocumentNature.documentNatureDescription,
            DocumentNatureTooltip: caseDocumentNature.documentNatureTooltip,
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

    public updateCaseDocumentNature(caseDocumentNature): Observable<any> {
        // const getUrl = 'update/caseDocumentNature';
        const getUrl = 'case/document/nature/update';
        const body = {
            Id: caseDocumentNature.id,
            DocumentNatureId: caseDocumentNature.documentNatureId,
            DocumentNature: caseDocumentNature.documentNature,
            DocumentNatureDescription: caseDocumentNature.documentNatureDescription,
            DocumentNatureTooltip: caseDocumentNature.documentNatureTooltip,
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

    public deleteCaseDocumentNature(id): Observable<any> {
        // const getUrl = 'delete/caseDocumentNature';
        const getUrl = 'case/document/nature/delete';
        const body = {
            Id: id
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

    // --------- PoliceStation

    public getPoliceStations(): Observable<any> {
        // const getUrl = 'casetype/all';
        const getUrl = 'police/station/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addPoliceStation(policeStation): Observable<any> {
        // const getUrl = 'add/policeStation';
        const getUrl = 'police/station/add';
        const body = {
            PoliceStation: policeStation.policeStation,
            ContactPerson: policeStation.contactPerson,
            LocationAddress: policeStation.locationAddress,
            ContactNumber: policeStation.contactNumber
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

    public updatePoliceStation(policeStation): Observable<any> {
        // const getUrl = 'update/policeStation';
        const getUrl = 'police/station/update';
        const body = {
            Id: policeStation.id,
            PoliceStation: policeStation.policeStation,
            ContactPerson: policeStation.contactPerson,
            LocationAddress: policeStation.locationAddress,
            ContactNumber: policeStation.contactNumber
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

    public deletePoliceStation(id): Observable<any> {
        // const getUrl = 'delete/policeStation';
        const getUrl = 'police/station/delete';
        const body = {
            Id: id
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

    // --------- ExpenseNature

    public getExpenseNatures(): Observable<any> {
        // const getUrl = 'caseDocumentNature/all';
        const getUrl = 'expense/nature/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addExpenseNature(expenseNature): Observable<any> {
        // const getUrl = 'add/caseDocumentNature';
        const getUrl = 'expense/nature/add';
        const body = {
            ExpenseNature: expenseNature.expenseNature,
            ExpenseNatureDescription: expenseNature.expenseNatureDescription,
            ExpenseNatureTooltip: expenseNature.expenseNatureTooltip,
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

    public updateExpenseNature(expenseNature): Observable<any> {
        // const getUrl = 'update/caseDocumentNature';
        const getUrl = 'expense/nature/update';
        const body = {
            Id: expenseNature.id,
            ExpenseNature: expenseNature.expenseNature,
            ExpenseNatureDescription: expenseNature.expenseNatureDescription,
            ExpenseNatureTooltip: expenseNature.expenseNatureTooltip,
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

    public deleteExpenseNature(id): Observable<any> {
        // const getUrl = 'delete/caseDocumentNature';
        const getUrl = 'expense/nature/delete';
        const body = {
            Id: id
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




    public getPlatformStatisticsList() {
        const url = 'backoffice/get/platform/general/settings/statslist';
        return this._http.get(url)
            .map(res => res.json().genericResponse.genericBody.data);
    }

    public getCurrencies(): Observable<any> {
        const getUrl = 'currency/all';
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

    public getCollateralOptionAll(): Observable<any> {
        const getUrl = 'collateral/option/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getMortgageTypeAll(): Observable<any> {
        const getUrl = 'mortgage/type/option/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getMortgageOptionAll(): Observable<any> {
        const getUrl = 'mortgage/option/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getMortgageOptionViaMortgageId(mortgageTypeId): Observable<any> {
        const getUrl = 'mortgage/option/via/mortgage/type/' + mortgageTypeId;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getMortgageOptionDetailViaMortgageOptionId(mortgageOptionId): Observable<any> {
        const getUrl = 'mortgage/option/detail/via/mortgage/option/' + mortgageOptionId;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getMortgageOptionDetailType(): Observable<any> {
        const getUrl = 'mortgage/option/detail/type';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getChargeTypeAll(): Observable<any> {
        const getUrl = 'charge/type/option/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getPaymentDepositInOptions(): Observable<any> {
        const getUrl = 'payment/deposit/in/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getHearingPostponedReasonOptionAll(): Observable<any> {
        const getUrl = 'hearing/postponed/reason/option/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getOrderPassOptionAll(): Observable<any> {
        const getUrl = 'order/pass/option/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getComplianceResponsibilityOptionAll(): Observable<any> {
        const getUrl = 'compliance/submission/responsibility/option/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getComplianceNatureOptionAll(): Observable<any> {
        const getUrl = 'compliance/issue/nature/option/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getAllInternalEmployeesCount(): Observable<any> {
        const getUrl = 'internal/employee/all/count';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getAllInternalEmployeesPagination(pageNo, limit): Observable<any> {
        const getUrl = 'internal/employee/all/' + pageNo + '/' + limit;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getAllInternalEmployees(): Observable<any> {
        const getUrl = 'internal/employee/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getSingleInternalEmployee(empId): Observable<any> {
        const getUrl = 'internal/employee/via/id/' + empId;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public saveInternalEmployee(obj): Observable<any> {
        const getUrl = 'internal/employee/save';

        let token: Token;
        token = this._authService.getTokenData();
        const body = obj;
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getAllExternalPartiesCount(): Observable<any> {
        const getUrl = 'external/party/all/count';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);

            }
            );
    }

    public getAllExternalPartiesPagination(pageNo, limit): Observable<any> {

        const getUrl = 'external/party/all/' + pageNo + '/' + limit;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);

            }
            );
    }

    public getAllExternalParties(): Observable<any> {
        const getUrl = 'external/party/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);

            }
            );
    }

    public saveExternalEmployee(obj): Observable<any> {
        const getUrl = 'external/party/save';

        let token: Token;
        token = this._authService.getTokenData();
        const body = obj;
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getSingleExternalEmployee(empId): Observable<any> {
        const getUrl = 'external/party/via/id/' + empId;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getAllFlags(): Observable<any> {
        const getUrl = 'flag/option/all';
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public markLawfirmFlag(obj): Observable<any> {
        const getUrl = 'lawfirm/mark/flag';
        let token: Token;
        const body = obj;
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

    public markJudgeFlag(obj): Observable<any> {
        const getUrl = 'judge/mark/flag';
        let token: Token;
        const body = obj;
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

    public markUserFlag(obj): Observable<any> {
        const getUrl = 'user/mark/flag';
        let token: Token;
        const body = obj;
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

    public markCourtFlag(obj): Observable<any> {
        const getUrl = 'court/mark/flag';
        let token: Token;
        const body = obj;
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

    public getCaseResultOptions(): Observable<any> {
        const getUrl = 'case/result/option/all';
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getCaseResultActionOptions(): Observable<any> {
        const getUrl = 'case/result/action/option/all';
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getRatingOptions(): Observable<any> {
        const getUrl = 'rating/option/all';
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getCaseCloseSourceOptions(): Observable<any> {
        const getUrl = 'case/close/source/option/all';
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getAmountRecoverSourceOptions(): Observable<any> {
        const getUrl = 'amount/recover/source/option/all';
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getLoanProductAll(): Observable<any> {
        const getUrl = 'loan/product/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getAllDefaultersCount(): Observable<any> {
        const getUrl = 'defaulter/all/count';
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getAllDefaultersPagination(pageNo, limit): Observable<any> {

        const getUrl = 'defaulter/all/' + pageNo + '/' + limit;
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getAllDefaulters(): Observable<any> {
        const getUrl = 'defaulter/all';
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getAllJudgesCount(): Observable<any> {
        const getUrl = 'judge/users/count';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);

            }
            );
    }

    public getAllJudgesPagination(pageNo, limit): Observable<any> {
        const getUrl = 'judge/users/' + pageNo + '/' + limit;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);

            }
            );
    }

    public getAllJudges(): Observable<any> {
        const getUrl = 'judge/users';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);

            }
            );
    }

    public getSingleCourt(id): Observable<any> {
        const getUrl = 'court/details/' + id;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);

            }
            );
    }

    public saveCourtJudges(obj): Observable<any> {
        const getUrl = 'court/judge/assign';
        const body = obj;
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    // --------- ComplainNature

    public getComplainNatures(): Observable<any> {
        // const getUrl = 'caseDocumentNature/all';
        const getUrl = 'complain/nature/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addComplainNature(complainNature): Observable<any> {
        // const getUrl = 'add/caseDocumentNature';
        const getUrl = 'complain/nature/add';
        const body = {
            ComplainNature: complainNature.complainNature,
            // ComplainNatureDescription: complainNature.complainNatureDescription,
            // ComplainNatureTooltip: complainNature.complainNatureTooltip,
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

    public updateComplainNature(complainNature): Observable<any> {
        // const getUrl = 'update/caseDocumentNature';
        const getUrl = 'complain/nature/update';
        const body = {
            Id: complainNature.id,
            ComplainNature: complainNature.complainNature,
            // ComplainNatureDescription: complainNature.complainNatureDescription,
            // ComplainNatureTooltip: complainNature.complainNatureTooltip,
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

    public deleteComplainNature(id): Observable<any> {
        // const getUrl = 'delete/caseDocumentNature';
        const getUrl = 'complain/nature/delete';
        const body = {
            Id: id
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

    // --------- PartyNature

    public getPartyNatures(): Observable<any> {
        // const getUrl = 'caseDocumentNature/all';
        const getUrl = 'party/nature/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    // --------- Internal Employee

    public getInternalEmployees(): Observable<any> {
        // const getUrl = 'caseDocumentNature/all';
        const getUrl = 'internal/employee/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }


    public getInternalUnionsCount(): Observable<any> {
        const getUrl = 'internal/union/all/count';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getInternalUnionsPagination(pageNo, limit): Observable<any> {
        const getUrl = 'internal/union/all/' + pageNo + '/' + limit;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getInternalUnions(): Observable<any> {
        const getUrl = 'internal/union/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public saveInternalUnion(obj): Observable<any> {
        const getUrl = 'internal/union/save';

        let token: Token;
        token = this._authService.getTokenData();
        const body = obj;
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getSingleInternalUnion(empId): Observable<any> {
        const getUrl = 'internal/union/via/id/' + empId;

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            }
            );
    }

    public getContractTags(): Observable<any> {
        const getUrl = 'contract/tag/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    // --------- Fir Resources

    public getFirResources(): Observable<any> {
        // const getUrl = 'casetype/all';
        const getUrl = 'fir/resource/list';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    // --------- Critical Options

    public getCriticalOptions(): Observable<any> {
        // const getUrl = 'casetype/all';
        const getUrl = 'report/critical/option/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    // --------- Status

    public getStatuses(): Observable<any> {
        // const getUrl = 'casetype/all';
        const getUrl = 'report/case/status/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    // --------- Report Tabs

    public getReportTabs(): Observable<any> {
        // const getUrl = 'casetype/all';
        const getUrl = 'report/tab/option/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }


}
