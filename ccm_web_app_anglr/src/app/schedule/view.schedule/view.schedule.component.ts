import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { DatePipe } from '@angular/common';

import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Message, MessageTypes } from '../../core/models/message';

import { UserService } from '../../core/services/user/user.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { FormService } from '../../core/services/form/form.service';
import { Schedule, ScheduleDetail } from '../../core/models/schedule.model';
import { ScheduleService } from '../../core/services/schedule/schedule.service';
import { Permission } from '../../core/models/permission';
// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';

declare var libraryVar: any;

@Component({
    selector: 'view-schedule',
    moduleId: module.id,
    templateUrl: 'view.schedule.component.html',
    // styleUrls: ['invite.doctor.component.css']
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})
export class ViewScheduleComponent implements OnInit {


    hours: any;
    minutes: any;

    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    userPermisiosns: Permission[] = []
    isLogin: any;

    schedule: Schedule = new Schedule()

    newUser: User = new User();
    userId: number = null;

    startDate: string = null;
    endDate: string = null;
    dateArray = new Array();

    isSpinner = false;

    viewSchedulePermission = false;

    isSubmitted: boolean = false;

    private ngUnsubscribe: Subject<any> = new Subject();

    formScheduleDetail: FormGroup;

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private _mappingService: MappingService,
        private _utilityService: UtilityService,
        private _scheduleService: ScheduleService,
        private _formService: FormService,
        private route: ActivatedRoute, private _router: Router,
        private _formBuilder: FormBuilder,
        private datePipe: DatePipe
    ) {
        this.currentURL = window.location.href;

        this.formScheduleDetail = _formBuilder.group({

            'startDate': [null, Validators.compose([Validators.required])],
            'endDate': [null, Validators.compose([Validators.required])],
            'scheduleDetail': this._formBuilder.array([]),
        });
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.userPermisiosns = this._authService.getUserPermissions();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {

            // this.userId = id;
            // this.loadUserById();

            this.viewSchedulePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermisiosns, 'view_doctor_schedule');
            // this.viewSchedulePermission = this._utilityService.checkUserPermission(this.user, 'view_doctor_schedule');
            // this.viewSchedulePermission = true;

            if (this.viewSchedulePermission) {

            }
            else {

                if (this.user.role.roleCode == "patient" || this.user.role.roleCode == "super_admin") {

                }
                else {
                    // this._router.navigateByUrl('permission');
                }

            }
        }

    }

    dateChanged(event, type) {
        console.log('event', event.value);
        console.log('type', type);
        if (type == 'startDate') {
            // this.schedule.startDate = this.datePipe.transform(this.schedule.startDate, 'yyyy-MM-dd');
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.schedule.startDate);
        }
        else if (type == 'endDate') {
            // this.schedule.endDate = this.datePipe.transform(this.schedule.endDate, 'yyyy-MM-dd');
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.schedule.endDate);
        }
    }

    onlogOut() {

        let redirectUrl = 'login';
        this._authService.logoutUser();

        this.isUser = this._authService.getUser();
        if (this.isUser) {
            return;
        } else {
            this._router.navigate([redirectUrl]);
        }
    }


}
