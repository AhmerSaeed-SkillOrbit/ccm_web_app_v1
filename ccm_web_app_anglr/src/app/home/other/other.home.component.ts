import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
// import { ScriptService } from '../core/services/script.service';
// import { UtilityService } from '../core/services/general/utility.service';
// import { MessagingService } from '../messaging.service';
// import { DashboardService } from '../core/services/general/dashboard.service';
// import { Dashboard } from '../core/models/dashboard';
import { Message, MessageTypes } from '../../core/models/message';
import { SetupService } from '../../core/services/setup/setup.service';
import { UserService } from '../../core/services/user/user.service';
import { AddUpdateTicketDialogeComponent } from '../../shared/add.update.ticket.dialoge/add.update.ticket.dialoge.component';
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

    constructor(@Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        public dialog: MatDialog,
        // public _messaging: MessagingService,
        private _userService: UserService,
        private _setupService: SetupService,
        // private _utility: UtilityService,
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
            else {
                // this._router.navigate(['/home/other']);
            }
        }

        if (this.user.role.roleCode == "patient") {
            this.loadAssociatedDoctor();
        }


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
