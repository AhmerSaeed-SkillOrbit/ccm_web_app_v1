import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
// import { ScriptService } from '../core/services/script.service';
import { UtilityService } from '../../core/services/general/utility.service';
// import { MessagingService } from '../messaging.service';
// import { DashboardService } from '../core/services/general/dashboard.service';
// import { Dashboard } from '../core/models/dashboard';
import { Message, MessageTypes } from '../../core/models/message';
import { SetupService } from '../../core/services/setup/setup.service';
import { UserService } from '../../core/services/user/user.service';
import { AddUpdateTicketDialogeComponent } from '../../shared/add.update.ticket.dialoge/add.update.ticket.dialoge.component';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { DashboardService } from '../../core/services/dashboard/dashboard.service';
// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';

declare var libraryVar: any;

@Component({
    selector: 'other-home',
    moduleId: module.id,
    templateUrl: 'other.home.component.html',
    // styleUrls: ['home.component.css']
})
export class OtherHomeComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    // entityType: string;
    redirectUrl: string;
    redirectUrl2: string;
    isLogin: any;
    showPaymentMessage = false;
    message;
    subscriptionAmount: number;
    subscription: any;


    assocDoctor: User = new User();
    // influencerProfile = new InfluencerProfile();
    // easyPay = new EasyPay();

    doctorDashboard = {
        registeredPatient: 0,
        pendingInvitation: 0,
        associatedFacilitator: 0,
        activeCcmPlan: 0,
        pendingAppointment: 0,
        doctorLoggedInHistory: []
    };

    facilitatorDashboard = {
        totalReviewsOnGoals: 0,
        associatedDoctor: 0,
        activeCcmPlan: 0,
        loggedInHistory: []
    };

    supportStaffDashboard = {
        ticketCreated: 0,
        ticketResponded: 0,
        ticketClosed: 0,
    };

    patientDashboard = {
        upcomingAppointment: 0,
        activeCcmPlan: 0,
        loggedInHistory: []
    };

    loginHistoryList: User[] = [];

    // displayedColumnsHs = ['sNo', 'name', 'dateTime'];
    displayedColumnsHs = ['dateTime'];
    dataSourceHs = new MatTableDataSource<User>(this.loginHistoryList);
    @ViewChild(MatPaginator) paginatorHs: MatPaginator;
    isSpinnerHs = false;
    filterHs: string = "";
    pageEventHs: PageEvent;
    pageIndexHs: number = 0;
    pageSizeHs: number = 10; // by default
    lengthHs: number = 0;
    pageSizeOptions = [5, 10, 25, 50, 100];
    // pageSizeOptions = [10];
    upperLimit = 0;


    constructor(@Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        public dialog: MatDialog,
        // public _messaging: MessagingService,
        private _userService: UserService,
        private _dashboardService: DashboardService,
        private _setupService: SetupService,
        private _utilityService: UtilityService,
        private _mappingService: MappingService,
        private route: ActivatedRoute, private _router: Router) {
        this.currentURL = window.location.href;
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        console.log('in component this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);



        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
            return;
        } else {

            if (this.user && this.user.role && this.user.role.roleCode == "super_admin") {
                this._router.navigate(['/home/admin']);
                return;
            }
            if (this.user && this.user.role && this.user.role.roleCode == "doctor") {
                this.loadDoctorDashboard();
            }
            if (this.user && this.user.role && this.user.role.roleCode == "facilitator") {
                this.loadFacilitatorDashboard();
            }
            if (this.user && this.user.role && this.user.role.roleCode == "support_staff") {
                this.loadSupportStaffDashboard();
            }
            if (this.user && this.user.role && this.user.role.roleCode == "patient") {
                this.loadAssociatedDoctor();
                this.loadPatientDashboard();
            }
            else {
                // this._router.navigate(['/home/other']);
            }
        }

        // if (this.user.role.roleCode == "patient") {
        //     this.loadAssociatedDoctor();
        // }

        this.loadLoginHistoryList();


    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSourceHs.filter = filterValue;
    }

    refreshList() {
        this.isSpinnerHs = true;
        this.filterHs = "";
        this.dataSourceHs.filter = null;
        this.loadLoginHistoryList();
    }

    pageChangeEvent(event?: PageEvent): PageEvent {

        console.log("getServerData event", event);

        this.pageIndexHs = event.pageIndex;
        this.pageSizeHs = event.pageSize;
        this.loadLoginHistoryList();

        return event;
    }

    loadDoctorDashboard() {
        // this._uiService.showSpinner();
        this._dashboardService.getDashboardDoctor().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                let data = res.json().data;
                this.doctorDashboard.registeredPatient = data && data.RegisteredPatient ? data.RegisteredPatient : 0;
                this.doctorDashboard.pendingInvitation = data && data.PendingInvitation ? data.PendingInvitation : 0;
                this.doctorDashboard.associatedFacilitator = data && data.AssociatedFacilitator ? data.AssociatedFacilitator : 0;
                this.doctorDashboard.activeCcmPlan = data && data.ActiveCcmPlan ? data.ActiveCcmPlan : 0;
                this.doctorDashboard.pendingAppointment = data && data.PendingAppointment ? data.PendingAppointment : 0;
            },
            (err) => {
                console.log("err", err);
                // this._uiService.hideSpinner();
            }
        );
    }

    loadFacilitatorDashboard() {
        // this._uiService.showSpinner();
        this._dashboardService.getDashboardFacilitator().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                let data = res.json().data;
                this.facilitatorDashboard.totalReviewsOnGoals = data && data.TotalReviewsOnGoals ? data.TotalReviewsOnGoals : 0;
                this.facilitatorDashboard.associatedDoctor = data && data.AssociatedDoctor ? data.AssociatedDoctor : 0;
                this.facilitatorDashboard.activeCcmPlan = data && data.ActiveCcmPlan ? data.ActiveCcmPlan : 0;
            },
            (err) => {
                console.log("err", err);
                // this._uiService.hideSpinner();
            }
        );
    }

    loadSupportStaffDashboard() {
        // this._uiService.showSpinner();
        this._dashboardService.getDashboardSuportStaff().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                let data = res.json().data;
                this.supportStaffDashboard.ticketCreated = data && data.TicketCreated ? data.TicketCreated : 0;
                this.supportStaffDashboard.ticketResponded = data && data.TicketResponded ? data.TicketResponded : 0;
                this.supportStaffDashboard.ticketClosed = data && data.TicketClosed ? data.TicketClosed : 0;
            },
            (err) => {
                console.log("err", err);
                // this._uiService.hideSpinner();
            }
        );
    }

    loadPatientDashboard() {
        // this._uiService.showSpinner();
        this._dashboardService.getDashboardPatient().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                let data = res.json().data;
                // this.patientDashboard.upcomingAppointment = data && data.UpcomingAppointment ? data.UpcomingAppointment : 0;
                this.patientDashboard.activeCcmPlan = data && data.ActiveCcmPlan ? data.ActiveCcmPlan : 0;
            },
            (err) => {
                console.log("err", err);
                // this._uiService.hideSpinner();
            }
        );
    }

    loadLoginHistoryList() {
        const msg = new Message();
        this.loginHistoryList = [];
        this.dataSourceHs = new MatTableDataSource<User>(this.loginHistoryList);

        // if (this.listPermission) {

        this.isSpinnerHs = true;

        this._userService.getUserLoginHistoryListCount(this.user.id).subscribe(
            (res) => {

                this.lengthHs = res.json().data;

                this._userService.getUserLoginHistoryListPagination(this.pageIndexHs, this.pageSizeHs, this.user.id).subscribe(
                    (res) => {
                        this.isSpinnerHs = false;
                        const array = res.json().data;
                        console.log('res user list:', res);
                        var bList = [];
                        for (let i = 0; i < array.length; i++) {
                            let u = this._mappingService.mapUser(array[i]);
                            bList.push(u);
                        }
                        this.loginHistoryList = bList;

                        this.dataSourceHs = new MatTableDataSource<User>(this.loginHistoryList);
                        // this.dataSource.paginator = this.paginator;

                        // if (this.loginHistoryList.length === 0) {
                        //     msg.msg = 'No History Data Found';
                        //     msg.msgType = MessageTypes.Information;
                        //     msg.autoCloseAfter = 400;
                        //     this._uiService.showToast(msg, 'info');
                        // }
                    },
                    (err) => {
                        console.log(err);
                        this.dataSourceHs = new MatTableDataSource<User>(this.loginHistoryList);
                        // this._authService.errStatusCheckResponse(err);
                        this.isSpinnerHs = false;
                    }
                );

            },
            (err) => {
                console.log(err);
                // this._authService.errStatusCheckResponse(err);
                this.isSpinnerHs = false;
            }
        );

        // }
        // else {
        //     this.isSpinnerHs = false;
        //     let msg = this._utilityService.permissionMsg();
        //     this._uiService.showToast(msg, '');
        // }
    }


    loadAssociatedDoctor() {
        // this._uiService.showSpinner();
        this._userService.getPatientAssociatedDoctor(this.user.id).subscribe(
            (res) => {
                // this._uiService.hideSpinner();

                let data = res.json().data;
                if (data) {
                    this.assocDoctor.id = data.DoctorId;
                    this.assocDoctor.userId = data.DoctorId;
                    this.assocDoctor.firstName = data.DoctorFirstName;
                    this.assocDoctor.lastName = data.DoctorLastName;
                    this.assocDoctor.functionalTitle = data.DoctorFunctionalTitle;
                }

                console.log('assocDoctor', this.assocDoctor);
            },
            (err) => {
                // this._uiService.hideSpinner();
            }
        );
    }

    nevigate(type) {

        if (type == 'view-doctor-schedule') {
            this._router.navigateByUrl('schedule/view/' + this.assocDoctor.id);
        }
        // else if (this.user.entityType === 'influencer_agent') {
        //     this._router.navigateByUrl('ia/campaign/details/' + id);
        // }

    }

    openAddUpdateDialog(ticket, type) {

        let dialog = this.dialog.open(AddUpdateTicketDialogeComponent, {
            maxWidth: "700px",
            minWidth: "550px",
            // width: "550px",
            // height: '465px',
            // data: this.id,
            data: {
                fieldType: type,
                ticket: ticket
            },
        });
        dialog.afterClosed().subscribe((result) => {
            console.log("result", result);
            if (result) {
                this._router.navigateByUrl('ticket/t/list');
            }
        })
    }


    onlogOut() {

        this.redirectUrl = 'login';
        this._authService.logoutUser();

        this.isUser = this._authService.getUser();
        if (this.isUser) {
            return;
        } else {
            this._router.navigate([this.redirectUrl]);
        }
    }


}
