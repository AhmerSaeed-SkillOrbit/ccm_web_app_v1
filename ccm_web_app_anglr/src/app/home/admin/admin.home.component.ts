import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { ScriptService } from '../core/services/script.service';
// import { UtilityService } from '../core/services/general/utility.service';
// import { MessagingService } from '../messaging.service';
// import { DashboardService } from '../core/services/general/dashboard.service';
// import { Dashboard } from '../core/models/dashboard';
import { Message, MessageTypes } from '../../core/models/message';
import { SetupService } from '../../core/services/setup/setup.service';
import { DashboardService } from '../../core/services/dashboard/dashboard.service';
// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';

declare var libraryVar: any;

@Component({
    selector: 'admin-home',
    moduleId: module.id,
    templateUrl: 'admin.home.component.html',
    // styleUrls: ['home.component.css']
})
export class AdminHomeComponent implements OnInit {
    files: any;

    // dashboard: Dashboard = new Dashboard();
    dashboard = {
        adminCount: 0,
        facilitatorCount: 0,
        patientCount: 0,
        doctorCount: 0,
        supportStaffCount: 0
    };

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
    // influencerProfile = new InfluencerProfile();
    // easyPay = new EasyPay();

    constructor(@Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        // public _messaging: MessagingService,
        private _dashboardService: DashboardService,
        // private _utility: UtilityService,
        private route: ActivatedRoute, private _router: Router) {
        this.currentURL = window.location.href;
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);



        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {
            if (this.user && this.user.roleCode == "super_admin") {
                // this._router.navigate(['/home/admin']);
            }
            else {
                this._router.navigate(['/home/other']);
            }
        }

        this.loadDashboard();

    }

    loadDashboard() {
        // this._uiService.showSpinner();
        this._dashboardService.getDashboardSuperAdmin().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                let data = res.json().data;
                this.dashboard.adminCount = data && data.SuperAdmin ? data.SuperAdmin : 0;
                this.dashboard.facilitatorCount = data && data.Facilitator ? data.Facilitator : 0;
                this.dashboard.patientCount = data && data.Patient ? data.Patient : 0;
                this.dashboard.doctorCount = data && data.Doctor ? data.Doctor : 0;
                this.dashboard.supportStaffCount = data && data.SupportStaff ? data.SupportStaff : 0;
            },
            (err) => {
                console.log("err", err);
                // this._uiService.hideSpinner();
            }
        );
    }

    navigateTo(id) {
        // console.log('navigation ID', id);

        // if (this.user.entityType === 'brand' ) {
        //     this._router.navigateByUrl('brand/campaign/details/' + id);
        // } else if (this.user.entityType === 'influencer' ) {
        //     // this._router.navigate(['influencer/campaign/details/'],id);
        //     this._router.navigateByUrl('influencer/campaign/details/' + id);

        // } else if (this.user.entityType === 'digital_agency' ) {
        //     this._router.navigateByUrl('da/campaign/details/' + id);
        // } else if (this.user.entityType === 'influencer_agent' ) {
        //     this._router.navigateByUrl('ia/campaign/details/' + id);
        // }

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
