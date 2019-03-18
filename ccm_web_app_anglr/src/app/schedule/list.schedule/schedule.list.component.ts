import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
// import { ScriptService } from '../core/services/script.service';
// import { UtilityService } from '../core/services/general/utility.service';
// import { MessagingService } from '../messaging.service';
// import { DashboardService } from '../core/services/general/dashboard.service';
// import { Dashboard } from '../core/models/dashboard';
import { Message, MessageTypes } from '../../core/models/message';
// import { SetupService } from '../../core/services/setup/setup.service';
import { UserService } from '../../core/services/user/user.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { DoctorScheduleService } from '../../core/services/doctor/doctor.schedule.service';
import { Permission } from '../../core/models/permission';
import { Schedule } from '../../core/models/schedule.model';
// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';

declare var libraryVar: any;

@Component({
    selector: 'schedule-list',
    moduleId: module.id,
    templateUrl: 'schedule.list.component.html',
    // styleUrls: ['invite.doctor.component.css']
})
export class ScheduleListComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    userPermissions: Permission[] = [];
    isLogin: any;

    doctorId: number = null;
    searchKeyword: string = null;
    roleCode: string = null;

    scheduleList: Schedule[] = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    isSpinner = false;
    filter: string = "";

    pageEvent: PageEvent;
    pageIndex: number = 0;
    pageSize: number = 5; // by default
    length: number = 0;
    pageSizeOptions = [5, 10, 25, 50];
    // pageSizeOptions = [10];
    upperLimit = 0;

    listPagePermission = false;
    addPermission = false;
    updatePermission = false;
    deletePermission = false;

    isSubmitted: boolean = false;

    display = 'none';

    constructor(@Inject('IAuthService') private _authService: IAuthService,
        public dialog: MatDialog,
        private _uiService: UIService,
        // public _messaging: MessagingService,
        private _userService: UserService,
        private _doctorScheduleService: DoctorScheduleService,
        private _mappingService: MappingService,
        private _utilityService: UtilityService,
        private route: ActivatedRoute, private _router: Router) {
        this.currentURL = window.location.href;
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.userPermissions = this._authService.getUserPermissions();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);


        this.roleCode = "doctor";

        this.doctorId = this.user.id;

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {

            this.listPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'doctor_schedule_list_page');
            // this.listPagePermission = this._utilityService.checkUserPermission(this.user, 'doctor_schedule_list_page');
            // this.listPagePermission = true;

            if (this.listPagePermission) {
                this.addPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'add_doctor_schedule');
                // this.addPermission = this._utilityService.checkUserPermission(this.user, 'add_doctor_schedule');
                // this.addPermission = true;
                this.updatePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'update_doctor_schedule_detail');
                // this.updatePermission = this._utilityService.checkUserPermission(this.user, 'update_doctor_schedule');
                // this.updatePermission = true;

                this.loadScheduleList();
            }
            else {
                this._router.navigateByUrl('permission');
            }
        }

    }

    search() {

        this.searchKeyword = this.searchKeyword ? this.searchKeyword.trim() : this.searchKeyword;

        // if(this.searchKeyword){
        this.pageIndex = 0;
        // this.pageChangeEvent();
        this.loadScheduleList();
        // }

    }

    refreshList() {
        // if (this.userListPermission) {
        this.isSpinner = true;
        this.filter = "";
        this.searchKeyword = "";
        // this.dataSource.filter = null;
        this.loadScheduleList();
        // }
    }

    pageChangeEvent(event?: PageEvent): PageEvent {

        // console.log("getServerData event", event);

        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadScheduleList();

        return event;
    }

    loadScheduleList() {
        const msg = new Message();
        this.length = 0;
        this.scheduleList = [];
        // this.dataSource = new MatTableDataSource<User>(this.scheduleList);
        if (this.listPagePermission) {
            this.isSpinner = true;

            // this._uiService.showSpinner();

            this._doctorScheduleService.getDoctorScheduleListCount(this.doctorId).subscribe(
                (res) => {
                    // this._uiService.hideSpinner();
                    this.length = res.json().data;

                    this._doctorScheduleService.getDoctorScheduleListPagination(this.doctorId, this.pageIndex, this.pageSize).subscribe(
                        (res) => {
                            // this.scheduleList = res.json();
                            // this._uiService.hideSpinner();
                            let array = res.json().data || [];
                            // console.log('res list:', array);
                            var sList = [];
                            for (let i = 0; i < array.length; i++) {
                                let s = this._mappingService.mapSchedule(array[i]);
                                sList.push(s);
                            }
                            this.scheduleList = sList;

                            // this.dataSource = new MatTableDataSource<User>(this.scheduleList);
                            // this.dataSource.paginator = this.paginator;
                            console.log('schedule List:', this.scheduleList);

                            if (this.scheduleList.length == 0) {
                                msg.msg = 'No Schedule Found';
                                msg.msgType = MessageTypes.Information;
                                msg.autoCloseAfter = 400;
                                this._uiService.showToast(msg, 'info');
                            }
                            this.isSpinner = false;
                        },
                        (err) => {
                            console.log(err);
                            // this._uiService.hideSpinner();
                            // this.dataSource = new MatTableDataSource<User>(this.scheduleList);
                            this._authService.errStatusCheck(err);
                            this.isSpinner = false;
                        }
                    );

                },
                (err) => {
                    console.log(err);
                    this._uiService.hideSpinner();
                    this._authService.errStatusCheckResponse(err);
                    this.isSpinner = false;
                }
            );
        }
        else {
            this.isSpinner = false;
            let msg = this._utilityService.permissionMsg();
            this._uiService.showToast(msg, '');
        }
    }

    nevigate(type) {

        if (type == "add") {
            this._router.navigate(["/schedule/add"]);
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
