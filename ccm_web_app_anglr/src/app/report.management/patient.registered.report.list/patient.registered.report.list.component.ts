import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatDialog, MatTableDataSource, MatPaginator, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

import { Message, MessageTypes } from '../../core/models/message';
import { User } from '../../core/models/user';
import { CcmPlan, CcmPlanItem, CcmPlanItemGoal } from '../../core/models/user.ccm.plan';
import { Permission } from '../../core/models/permission';

import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { CcmPlanService } from '../../core/services/ccm.plan/ccm.plan.service';
import { ForumService } from '../../core/services/forum/forum.service';
import { SetupService } from '../../core/services/setup/setup.service';
import { UserService } from '../../core/services/user/user.service';
import { PatientRecordService } from '../../core/services/patient/patient.record.service';

import { ConfirmationDialogComponent } from '../../shared/dialogs/confirmationDialog.component';
import { ViewAppointmentDialogeComponent } from '../../shared/appointment.dialoge/view.appointment.dialoge.component';


declare var libraryVar: any;

@Component({
    selector: 'patient-registered-report-list',
    moduleId: module.id,
    templateUrl: 'patient.registered.report.list.component.html',
    // styleUrls: ['../ccm.plan.component.css']
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})
export class PatientRegisteredReportListComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    isLogin: any;

    userPermissions: Permission[] = [];

    userId: number = null;

    patientId: number = null;
    patient: User = new User();

    searchKeyword: string = null;
    startDate: string = null;
    endDate: string = null;

    status: string = null;

    ccmPlanList: CcmPlan[] = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    isSpinner = false;
    filter: string = "";

    pageEvent: PageEvent;
    pageIndex: number = 0;
    pageSize: number = 25; // by default
    length: number = 0;
    pageSizeOptions = [5, 10, 25, 50];
    // pageSizeOptions = [10];
    upperLimit = 0;

    listPagePaitentPermission = false;
    listPagePermission = false;
    addPermission = false;
    updatePermission = false;
    summaryPermission = false;

    reviewHistoryPermission = false;
    takeReviewPermission = false;

    isSubmitted: boolean = false;

    private _sub: Subscription;

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialog: MatDialog,
        private _uiService: UIService,
        // public _messaging: MessagingService,
        private _userService: UserService,
        private _patientRecordService: PatientRecordService,
        private _setupService: SetupService,
        private _ccmPlanService: CcmPlanService,
        private _mappingService: MappingService,
        private _utilityService: UtilityService,
        private datePipe: DatePipe,
        private route: ActivatedRoute, private _router: Router
    ) {
        this.currentURL = window.location.href;
        const paId = this.route.snapshot.params['paId'];

        this.patientId = paId;
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.userPermissions = this._authService.getUserPermissions();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);

        this.status = "accepted";

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {

            // this.listPagePermission = this._utilityService.checkUserPermission(this.user, 'ccm_plan_list_page');
            this.listPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'ccm_plan_list_page');
            // this.listPagePermission = true;

            // this.llistPagePaitentPermission = this._utilityService.checkUserPermission(this.user, 'ccm_plan_list_page');
            this.listPagePaitentPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'ccm_plan_list_page_patient');
            // this.listPagePaitentPermission = true;

            if (this.listPagePermission || this.listPagePaitentPermission) {
                // this.addPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                this.addPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'create_ccm_plan');
                // this.addPermission = true;
                // this.updatePermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                this.updatePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'update_ccm_plan');
                // this.updatePermission = true;
                // this.summaryPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                this.summaryPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'ccm_plan_summary_page');
                // this.summaryPermission = true;

                // this.reviewHistoryPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                this.reviewHistoryPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'ccm_plan_review_history');
                // this.reviewHistoryPermission = true;
                // this.takeReviewPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                this.takeReviewPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'take_ccm_plan_review');
                // this.takeReviewPermission = true;

                // this.loadUserById();
                this.loadGeneralInfo();
                this.loadCCMPlanList();

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
        this.loadCCMPlanList();
        // }

    }

    reset() {
        this.searchKeyword = null;
        this.startDate = null;
        this.endDate = null;

        this.refreshList();
    }

    refreshList() {
        // if (this.userListPermission) {
        this.isSpinner = true;
        this.filter = "";
        this.searchKeyword = "";

        // this.priority = null;
        // this.type = null;
        // this.trackStatus = null;

        // this.dataSource.filter = null;
        this.loadCCMPlanList();
        // }
    }

    pageChangeEvent(event?: PageEvent): PageEvent {

        // console.log("getServerData event", event);

        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadCCMPlanList();

        return event;
    }

    dateChanged(event, type) {
        console.log('event', event.value);
        console.log('type', type);
        if (type == 'startDate') {
            this.startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
            this.endDate = null;
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.startDate);
        }
        if (type == 'endDate') {
            this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.endDate);
        }

        if (this.startDate && this.endDate) {
            this.pageIndex = 0;
            this.loadCCMPlanList();
        }

    }

    loadUserById() {
        // this._uiService.showSpinner();

        this._userService.getUserById(this.patientId).subscribe(
            (res) => {
                // this._uiService.hideSpinner();

                const user = res.data;
                console.log('u Object', user);
                // this.newUser = user;
                this.patient = this._mappingService.mapUser(user);
                console.log('newUser', this.patient);
                // this.userId = this.user.id;
            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadGeneralInfo() {
        this._uiService.showSpinner();

        this._patientRecordService.getGeneralInfo(this.patientId).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                const user = res.json().data;
                // console.log('u Object', user);
                // this.newUser = user;
                this.patient = this._mappingService.mapUser(user);
                console.log('patient general info', this.patient);
                // this.userId = this.user.id;
            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadCCMPlanList() {
        const msg = new Message();
        this.length = 0;
        this.ccmPlanList = [];
        // this.dataSource = new MatTableDataSource<User>(this.userList);
        if (this.listPagePermission || this.listPagePaitentPermission) {
            this.isSpinner = true;

            // this._uiService.showSpinner();

            this._ccmPlanService.getCcmPlanListCount(this.patientId, this.searchKeyword, this.startDate, this.endDate).subscribe(
                (res) => {
                    // this._uiService.hideSpinner();
                    this.length = res.json().data;

                    this._ccmPlanService.getCcmPlanListPagination(this.patientId, this.pageIndex, this.pageSize, this.searchKeyword, this.startDate, this.endDate).subscribe(
                        (res) => {
                            // this.userList = res.json();
                            // this._uiService.hideSpinner();
                            let array = res.json().data || [];
                            // console.log('res list:', array);
                            var uList = [];
                            for (let i = 0; i < array.length; i++) {
                                let u = this._mappingService.mapCcmPlan(array[i]);
                                uList.push(u);
                            }
                            this.ccmPlanList = uList;

                            // this.dataSource = new MatTableDataSource<User>(this.userList);
                            // this.dataSource.paginator = this.paginator;
                            // console.log('user list:', this.userList);

                            if (this.ccmPlanList.length == 0) {
                                msg.msg = 'No Plan Found';
                                msg.msgType = MessageTypes.Information;
                                msg.autoCloseAfter = 400;
                                this._uiService.showToast(msg, 'info');
                            }
                            this.isSpinner = false;
                        },
                        (err) => {
                            console.log(err);
                            // this._uiService.hideSpinner();
                            // this.dataSource = new MatTableDataSource<User>(this.userList);
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

    confirmDialog(ccmPlan: CcmPlan, btn, index) {
        let msg = "";
        let title = "";
        let type = "";

        if (btn === 'accept') {
            title = 'Accept Request';
            // msg = 'Are you sure you want to Accept this Appointment? Appointment No: ' + ccmPlan.planNumber + '';
            type = "accept";
        }
        else if (btn === 'reject') {
            title = 'Reject Request';
            // msg = 'Are you sure you want to Reject this Appointment? Appointment No: ' + ccmPlan.planNumber + '';
            type = "reject";

        }
        else if (btn === 'cancel') {
            title = 'Cancel Request';
            msg = 'Are you sure you want to Cancel this Appointment? Appointment No: ' + ccmPlan.planNumber + '';
            type = "cancel";

        }
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '400px',
            // data: { message: msg, title: title, type: this.perFormAction.code, form: form }
            data: { message: msg, title: title, type: type }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('dialog close', result);

            if (result && result.status && btn === 'accept') {
                // this.approveRequest(user, index);
                // this.approveRequest(user, result.reason);
                // this.changeRequestStatus(appointment.id, btn, null);
                // this.changeRequestStatus(appointment.id, "accepted", null);
            }
            if (result && result.status && btn === 'reject') {
                // this.rejectRequest(user, index);
                // this.changeRequestStatus(appointment.id, btn, result.reason);
                // this.changeRequestStatus(appointment.id, "rejected", result.reason);
                // this.approveRequest(user, null);
            }
            if (result && result.status && btn === 'cancel') {
                // this.cancelRequest(appointment.id, result.reason);
            }
        });
    }

    replaceText(text) {
        return this._utilityService.replaceConfigText(text);
    }

    nevigateTo(data, type) {

        console.log("nevigateTo data", data);

        if (type == "form") {
            this._router.navigate(['/ccm/plan/form', this.patientId]);
            // this._router.navigate([url]).then(result => {
            //     console.log("nevigateTo navigate ", result);
            //     window.open(url, '_blank');
            // });
            // window.open(url, "_blank");
            // window.open(FlowRouter.url("/ticket/t/discussion", data.id), '_blank')

        }

        if (type == "ticket-discussion") {
            let url = "/ticket/t/discussion/" + data.id
            this._router.navigate(['/ticket/t/discussion', data.id]);
            // this._router.navigate([url]).then(result => {
            //     console.log("nevigateTo navigate ", result);
            //     window.open(url, '_blank');
            // });
            // window.open(url, "_blank");
            // window.open(FlowRouter.url("/ticket/t/discussion", data.id), '_blank')

        }

    }

    ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

}