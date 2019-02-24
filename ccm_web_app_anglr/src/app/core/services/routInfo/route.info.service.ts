import { Injectable, Inject } from '@angular/core';
import { HttpService } from "../base/http.service";
import { RouteInfoModel } from "../../models/routeinfo.model";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";


@Injectable()
export class RoutingInfoService {

    private componentMapping = new Map<string, any>();
    private routingGuards = new Map<string, any> ();

    routingInfo = new Array<RouteInfoModel>();

    routingInfoChanged = new Subject<RouteInfoModel[]>();

    constructor(private _http : HttpService){}


    public init() {
        
        // this.componentMapping['home'] = HomeComponent;
        // this.componentMapping['login'] = IBLoginComponent;
     
        // //this.routingGuards['home'];

        // let homeRoute = new RouteInfoModel(1, 'home', 'home', '', 0, '' , this.componentMapping['home'], null);
        // let loginRoute = new RouteInfoModel(2, 'login', 'login', '', 0, '', this.componentMapping['login'], null );

        //  this.routingInfo.push(homeRoute);
        //  this.routingInfo.push(loginRoute);

        // this.routingInfoChanged.next(this.routingInfo);

        // console.log(this.routingInfo);
        
    }

    getRoutes(userRole : string){
         return <Observable<RouteInfoModel>> this._http.get('routes.json');
         
    }
}