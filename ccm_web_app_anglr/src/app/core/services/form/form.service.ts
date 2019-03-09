// import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy, Inject } from "@angular/core";
// import { Subject } from "rxjs/Subject";
// import { Observable } from "rxjs/Observable";
// import { HttpService } from "../base/http.service";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';

// import { User } from "../../models/user";
// import { Advisory, AdvisoryServiceRequester, AdvisoryServiceAssign, AdvisoryServiceAdvice } from "../../models/advisory";
// import { DefaultAccount } from "../../models/defaultAccount";
// import { Observation, DocumentObservation } from "../../models/observation";
// import { Token } from "../../models/token";
// import { Milestone } from "../../models/milestone";
// import { CaseDocument } from "../../models/caseDocument";
// import { CaseDocumentBelongTo } from "../../models/caseDocumentBelongTo";
// import { QueryType } from '../../models/queryType';
// import { FormStatus } from '../../models/formStatus';
// import { FinalStatus } from '../../models/finalStatus';
// import { Tag } from '../../models/tag';
// import { Currency } from '../../models/currency';

// import { IAuthService } from '../auth/iauth.service';
// import { AdminService } from '../admin/admin.service';
// import { AdminSetupService } from '../admin/admin.setup.service';
// import { FileService } from '../file/file.service';
// import { LawFirmService } from '../lawFirm/lawFirm.service';

// import { environment } from "../../../../environments/environment";

import { FormGroup, FormControl } from '@angular/forms';


@Injectable()
export class FormService {
    constructor(
        // @Inject('IAuthService')
        // private _authService: IAuthService,
        // private _http: HttpService,
        // private _adminService: AdminService,
        // private _adminSetupService: AdminSetupService,
        // private _lawFirmService: LawFirmService,
        // private _fileService: FileService,
    ) { }

    public validateAllFormFields(formGroup: FormGroup) {         //{1}
        Object.keys(formGroup.controls).forEach(field => {  //{2}
            const control = formGroup.get(field);             //{3}
            if (control instanceof FormControl) {             //{4}
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        //{5}
                this.validateAllFormFields(control);            //{6}
            }
        });
    }

    public phoneNoFunction(event, data = null): any {
        // console.log("phoneNoFunction");

        // if (event.keyCode == 8 || event.keyCode == 9
        //     || event.keyCode == 27 || event.keyCode == 13
        //     || (event.keyCode == 65 && event.ctrlKey === true))
        //     return;
        // if ((event.keyCode < 48 || event.keyCode > 57))
        //     event.preventDefault();

        // var length = data ? data.length : 0;

        // if (length == 3)
        //     return data = data + '-';

        // return data;

    }

    public textFieldtoNumberRestrict(event): any {
        // console.log("phoneNoFunction");

        if (event.keyCode == 8 || event.keyCode == 9
            || event.keyCode == 27 || event.keyCode == 13
            || (event.keyCode == 65 && event.ctrlKey === true))
            return;
        // if ((event.keyCode < 48 || event.keyCode > 57))
        if ((event.keyCode < 48) || (event.keyCode > 57 && event.keyCode < 96) || (event.keyCode > 105))
            event.preventDefault();

        // var length = data ? data.length : 0;

        // if (length == 3)
        //     return data = data + '-';

        // return data;

    }
}
