import { Component, OnInit, Inject, ViewChild } from '@angular/core';
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
import { MappingService } from '../../core/services/mapping/mapping.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

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
        supportStaffCount: 0,
        activeCcmPlan: 0,
        lastDoctorLoggedInHistory: [],
        lastFacilitatorLoggedInHistory: [],
        lastPatientLoggedInHistory: []
    };

    displayedColumnsDocHs = ['name', 'dateTime'];
    dataSourceDocHs = new MatTableDataSource<User>(this.dashboard.lastDoctorLoggedInHistory);
    @ViewChild('paginatorDocHs') paginatorDocHs: MatPaginator;
    isSpinnerDocHs = false;

    displayedColumnsFacHs = ['name', 'dateTime'];
    dataSourceFacHs = new MatTableDataSource<User>(this.dashboard.lastFacilitatorLoggedInHistory);
    @ViewChild('paginatorFacHs') paginatorFacHs: MatPaginator;
    isSpinnerFacHs = false;

    displayedColumnsPatHs = ['name', 'dateTime'];
    dataSourcePatHs = new MatTableDataSource<User>(this.dashboard.lastPatientLoggedInHistory);
    @ViewChild('paginatorPatHs') paginatorPatHs: MatPaginator;
    isSpinnerPatHs = false;

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
        private _mappingService: MappingService,
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
            if (this.user && this.user.role && this.user.role.roleCode == "super_admin") {
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
                this.dashboard.activeCcmPlan = data && data.ActiveCcmPlan ? data.ActiveCcmPlan : 0;

                const array = data && data.LastDoctorLoggedInHistory ? data.LastDoctorLoggedInHistory : [];
                var dList = [];
                for (let i = 0; i < array.length; i++) {
                    let d = this._mappingService.mapUser(array[i]);
                    dList.push(d);
                }
                this.dashboard.lastDoctorLoggedInHistory = dList;
                this.dataSourceDocHs = new MatTableDataSource<User>(this.dashboard.lastDoctorLoggedInHistory);

                const array1 = data && data.LastFacilitatorLoggedInHistory ? data.LastFacilitatorLoggedInHistory : [];
                var fList = [];
                for (let i = 0; i < array1.length; i++) {
                    let f = this._mappingService.mapUser(array1[i]);
                    fList.push(f);
                }
                this.dashboard.lastFacilitatorLoggedInHistory = fList;
                this.dataSourceFacHs = new MatTableDataSource<User>(this.dashboard.lastFacilitatorLoggedInHistory);

                const array2 = data && data.LastPatientLoggedInHistory ? data.LastPatientLoggedInHistory : [];
                var pList = [];
                for (let i = 0; i < array2.length; i++) {
                    let p = this._mappingService.mapUser(array2[i]);
                    pList.push(p);
                }
                this.dashboard.lastPatientLoggedInHistory = pList;
                this.dataSourcePatHs = new MatTableDataSource<User>(this.dashboard.lastPatientLoggedInHistory);
            },
            (err) => {
                console.log("err", err);
                // this._uiService.hideSpinner();
            }
        );
    }

    // navigateTo(id) {
    navigateTo(type) {
        // console.log('navigation type', type);

        if (type === 'admin') {
            this._router.navigateByUrl('um/list/admin');
        }
        if (type === 'facilitator') {
            this._router.navigateByUrl('um/list/facilitator');
        }
        if (type === 'patient') {
            this._router.navigateByUrl('um/list/patient');
        }
        if (type === 'doctor') {
            this._router.navigateByUrl('um/list/doctor');
        }
        if (type === 'supStaff') {
            this._router.navigateByUrl('um/list/supStaff');
        }
        if (type === 'activeCCMPlan') {
            this._router.navigateByUrl('um/list/patient');
        }

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
