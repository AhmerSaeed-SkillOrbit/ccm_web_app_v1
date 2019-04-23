import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
// import { ScriptService } from '../core/services/script.service';
import { UtilityService } from '../../core/services/general/utility.service';
// import { MessagingService } from '../messaging.service';
// import { DashboardService } from '../core/services/general/dashboard.service';
// import { Dashboard } from '../core/models/dashboard';
import { Message, MessageTypes } from '../../core/models/message';
import { SetupService } from '../../core/services/setup/setup.service';
import { InviteDialogComponent } from '../invite.dialoge/invite.dialog.component';
import { UserService } from '../../core/services/user/user.service';
import { Permission } from '../../core/models/permission';
// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';

declare var libraryVar: any;

@Component({
    selector: 'invite-facilitator',
    moduleId: module.id,
    templateUrl: 'invite.facilitator.component.html',
    // styleUrls: ['invite.facilitator.component.css']
})
export class InviteFacilitatorComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    userPermissions: Permission[] = [];
    // entityType: string;
    redirectUrl: string;
    redirectUrl2: string;
    isLogin: any;
    showPaymentMessage = false;
    message;
    subscriptionAmount: number;
    subscription: any;
    // influencerProfile = new InfluencerProfile();
    // easyPay = new EasyPay();

    email: string = "";
    countryCode: string = "";
    mobileNo: string = "";
    type: string = "";
    userId: number = null;

    listPagePermission = false;
    invitePermission = false;

    isSubmitted: boolean = false;

    constructor(@Inject('IAuthService') private _authService: IAuthService,
        public dialog: MatDialog,
        private _uiService: UIService,
        // public _messaging: MessagingService,
        private _userService: UserService,
        private _setupService: SetupService,
        private _utilityService: UtilityService,
        private route: ActivatedRoute, private _router: Router) {
        this.currentURL = window.location.href;
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.userPermissions = this._authService.getUserPermissions();
        console.log('this.user', this.user);

        this.userId = this.user.id;
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);


        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {

            if (this.user.role.roleCode == "doctor" || this.user.roleCode == "doctor") {
                this.type = "doctor_facilitator";
            }

            // this.invitePermission = this._utilityService.checkUserPermission(this.user, 'invite_facilitator');
            this.invitePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'invite_facilitator');
            // this.invitePermission = true;
        }

        // this.loadDashboard(this.user.entityType);
        // this.loadRoles();

    }

    loadRoles() {
        // this._uiService.showSpinner();
        this._setupService.getRoles().subscribe(
            (res) => {
                console.log("res", res);
                // this._uiService.hideSpinner();
            },
            (err) => {
                console.log("err", err);
                // this._uiService.hideSpinner();
            }
        );
    }

    openInviteDialog() {

        let dialog = this.dialog.open(InviteDialogComponent, {
            maxWidth: "700px",
            minWidth: "550px",
            // width: "550px",
            // height: '465px',
            // data: this.id,
            data: {
                user: this.user,
                type: this.type,
                // type: "doctor_facilitator",
                // type: "doctor_patient",
                // type: "superadmin_doctor",
            },
        });
        dialog.afterClosed().subscribe((result) => {
            console.log("result", result);
            if (result) {
                // this.refreshList();
            }
        })
    }

    sendInvite() {

        const msg = new Message();
        this.isSubmitted = true;

        if (this.email) {

            this._userService.sendInvite(this.email, this.mobileNo, this.countryCode, this.type, this.userId).subscribe(
                (res) => {

                    this.isSubmitted = false;
                    msg.msg = res.json().message ? res.json().message : 'Invitation send successfully';
                    // msg.msg = 'You have successfully added an activity';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                },
                (err) => {
                    console.log(err);
                    this.isSubmitted = false;
                    this._authService.errStatusCheckResponse(err);
                });
        }
        else {
            this.isSubmitted = false;
            msg.msg = 'Email is required';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
        }
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
