import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { User } from '../../../core/models/user';
import { IAuthService } from '../../../core/services/auth/iauth.service';
import { UIService } from '../../../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
// import { ScriptService } from '../core/services/script.service';
// import { UtilityService } from '../core/services/general/utility.service';
// import { MessagingService } from '../messaging.service';
// import { DashboardService } from '../core/services/general/dashboard.service';
// import { Dashboard } from '../core/models/dashboard';
import { Message, MessageTypes } from '../../../core/models/message';
// import { SetupService } from '../../core/services/setup/setup.service';
import { UserService } from '../../../core/services/user/user.service';
import { MappingService } from '../../../core/services/mapping/mapping.service';
import { UtilityService } from '../../../core/services/general/utility.service';
import { AppointmentService } from '../../../core/services/schedule/appointment.service';
import { Appointment } from '../../../core/models/appointment';
import { ConfirmationDialogComponent } from '../../../shared/dialogs/confirmationDialog.component';
import { ViewAppointmentDialogeComponent } from '../../../shared/appointment.dialoge/view.appointment.dialoge.component';
// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';

declare var libraryVar: any;

@Component({
    selector: 'patient-accepted-request-list',
    moduleId: module.id,
    templateUrl: 'patient.accepted.request.list.component.html',
    // styleUrls: ['invite.doctor.component.css']
})
export class PatientAcceptedRequestListComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    isLogin: any;


    email: string = "";
    mobileNo: string = "";
    type: string = "doctor_patient";
    userId: number = null;
    searchKeyword: string = null;

    status: string = null;

    appointmentList: Appointment[] = [];

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
    viewPermission = false;
    acceptPermission = false;
    rejectPermission = false;
    cancelPermission = false;

    isSubmitted: boolean = false;

    display = 'none';

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialog: MatDialog,
        private _uiService: UIService,
        // public _messaging: MessagingService,
        // private _userService: UserService,
        private _appointmentService: AppointmentService,
        private _mappingService: MappingService,
        private _utilityService: UtilityService,
        private route: ActivatedRoute, private _router: Router
    ) {
        this.currentURL = window.location.href;
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);

        this.status = "accepted";

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {

            // this.listPagePermission = this._utilityService.checkUserPermission(this.user, 'appointment_list_page');
            this.listPagePermission = true;

            if (this.listPagePermission) {
                // this.viewPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                this.viewPermission = true;
                // this.acceptPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                // this.acceptPermission = true;
                // this.rejectPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                // this.rejectPermission = true;
                // this.cancelPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                this.cancelPermission = true;

                this.loadAppointmentList();
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
        this.loadAppointmentList();
        // }

    }

    refreshList() {
        // if (this.userListPermission) {
        this.isSpinner = true;
        this.filter = "";
        this.searchKeyword = "";
        // this.dataSource.filter = null;
        this.loadAppointmentList();
        // }
    }

    pageChangeEvent(event?: PageEvent): PageEvent {

        // console.log("getServerData event", event);

        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadAppointmentList();

        return event;
    }

    loadAppointmentList() {
        const msg = new Message();
        this.length = 0;
        this.appointmentList = [];
        // this.dataSource = new MatTableDataSource<User>(this.userList);
        if (this.listPagePermission) {
            this.isSpinner = true;

            // this._uiService.showSpinner();

            this._appointmentService.getAppointmentListCount(null, this.status, this.searchKeyword).subscribe(
                (res) => {
                    // this._uiService.hideSpinner();
                    this.length = res.json().data;

                    this._appointmentService.getAppointmentPagination(this.pageIndex, this.pageSize, null, this.status, this.searchKeyword).subscribe(
                        (res) => {
                            // this.userList = res.json();
                            // this._uiService.hideSpinner();
                            let array = res.json().data || [];
                            // console.log('res list:', array);
                            var uList = [];
                            for (let i = 0; i < array.length; i++) {
                                let u = this._mappingService.mapAppointment(array[i]);
                                uList.push(u);
                            }
                            this.appointmentList = uList;

                            // this.dataSource = new MatTableDataSource<User>(this.userList);
                            // this.dataSource.paginator = this.paginator;
                            // console.log('user list:', this.userList);

                            if (this.appointmentList.length == 0) {
                                msg.msg = 'No Appointment Found';
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


    resetForm() {
        this.email = null;
        this.display = 'block';
    }

    onCloseHandled(result) {
        this.display = 'none';
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

    openViewDialog(appointment: Appointment) {
        const dialogRef = this.dialog.open(ViewAppointmentDialogeComponent, {
            width: '400px',
            // data: { message: msg, title: title, type: this.perFormAction.code, form: form }
            data: {
                appointment: appointment
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('dialog close', result);
        });
    }

    confirmDialog(appointment: Appointment, btn, index) {
        let msg = "";
        let title = "";
        let type = "";

        if (btn === 'accept') {
            title = 'Accept Request';
            msg = 'Are you sure you want to accept ' + appointment.appointmentNumber + ' appoitment request ?';
            type = "accept";
        }
        else if (btn === 'reject') {
            title = 'Reject Request';
            msg = 'Are you sure you want to reject ' + appointment.appointmentNumber + ' appoitment request ?';
            type = "reject";

        }
        else if (btn === 'cancel') {
            title = 'Cancel Request';
            msg = 'Are you sure you want to cancel ' + appointment.appointmentNumber + ' appoitment request ?';
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
                this.changeRequestStatus(appointment.id, "accepted", null);
            }
            if (result && result.status && btn === 'reject') {
                // this.rejectRequest(user, index);
                // this.changeRequestStatus(appointment.id, btn, result.reason);
                this.changeRequestStatus(appointment.id, "rejected", result.reason);
                // this.approveRequest(user, null);
            }
            if (result && result.status && btn === 'cancel') {
                this.cancelRequest(appointment.id, result.reason);
            }
        });
    }

    changeRequestStatus(appointmentId, status, reason) {
        const msg = new Message();
        // this._userService.deleteUser(userId)

        this._appointmentService.appointmentRequestAction(appointmentId, status, reason).subscribe(
            (res) => {

                this.isSubmitted = false;
                msg.msg = res.json().message ? res.json().message : 'Request Status updated successfully';
                // msg.msg = 'You have successfully added an activity';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this._router.navigate([this.currentURL]);
            },
            (err) => {
                console.log(err);
                this.isSubmitted = false;
                this._authService.errStatusCheckResponse(err);
            });
    }

    cancelRequest(appointmentId, reason) {
        const msg = new Message();
        this._uiService.showSpinner();
        // this._userService.deleteUser(userId)

        this._appointmentService.appointmentRequestCancel(appointmentId, reason).subscribe(
            (res) => {

                this.isSubmitted = false;
                this._uiService.hideSpinner();
                msg.msg = res.json().message ? res.json().message : 'Request Status updated successfully';
                // msg.msg = 'You have successfully added an activity';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                // this._router.navigate([this.currentURL]);
            },
            (err) => {
                console.log(err);
                this.isSubmitted = false;
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            });
    }

}
