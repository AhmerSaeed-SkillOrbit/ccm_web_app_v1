import { Component, OnInit, Inject, OnDestroy, AfterViewChecked } from '@angular/core'
import { UIService } from "../core/services/ui/ui.service";
import { Message } from "../core/models/message";
import { AuthService } from '../core/services/auth/auth.service'
import { Router, ActivatedRoute } from '@angular/router';
// import { PatientInfoService, patientinfo } from "../core/services/specialist/patientinfo.service";
// import { Accepted } from "../core/services/specialist/specialistrequests.service";
// import { StatusService } from '../core/services/user/status.service';
import { MatDialogRef, MatDialog } from "@angular/material";

@Component({
    selector: 'schedule',
    moduleId: module.id,
    templateUrl: 'schedule.component.html',
    styleUrls: ['schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {


    viewSchedule: boolean = false;
    markOffDays: boolean = false;

    constructor(
        private dialog: MatDialog,
        // private _statusService: StatusService,
        private _uiService: UIService,
        private _authServices: AuthService,
        private _router: Router, private _route: ActivatedRoute,
        // private _patientinfoservice: PatientInfoService
    ) {


    }

    ngOnInit() {
        this.viewSchedule = true;
        this.markOffDays = true;
        // this._statusService.getpermissionCodes().subscribe(res => {
        //     if (res) {
        //         this.viewSchedule = res.ViewSchedule
        //         this.markOffDays = res.MarkOffDays
        //     }
        // });
    }

    ngOnDestroy() {
        this.dialog.closeAll();
    }
}

