import { Component, OnInit, Inject, OnDestroy, trigger, transition } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubscription } from "rxjs/Subscription";

import { User } from '../../../core/models/user';
import { Message } from '../../../core/models/message';

import { UIService } from '../../../core/services/ui/ui.service';
import { IAuthService } from '../../../core/services/auth/iauth.service';
import { RoutingInfoService } from '../../../core/services/routInfo/route.info.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'secure-header',
    moduleId: module.id,
    templateUrl: 'header.component.html',
    // styleUrls: ['header.component.css'],

})
export class HeaderComponent implements OnInit, OnDestroy {
    showNav: boolean;
    isLogin: any;
    // notif: Notifications = new Notifications();
    countNotif: number;
    user: User = new User();
    // script = new ScriptService();

    private updateInfo: ISubscription;

    isUser: User = new User();
    entityType: string;
    redirectUrl: string;
    profilePic = 'assets/img/user.png';


    // navigation: {
    //     sidebar: Sidebar;
    // };
    navShow = false;
    logo: any;
    overAllUnreadStatus = false;

    // expandedIndex = -1;
    expandedIndex = 1;
    expandedIndexLevelOne = -1;
    // permission: SidebarPermissions = new SidebarPermissions();
    permission: any;
    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        private route: ActivatedRoute, private _router: Router,
        // private _notifService: NotificationService
    ) {
        // this.script.loadScript('commetchat')
        //     .then(data => {
        //         console.log('script loaded ', data);
        //     }).catch(error => console.log(error));
        this.sidebar = true;

    }
    ngOnInit(): void {
        // To get Social CxN logo

        // this._uiService.platformSettings().subscribe(
        //     (res) => {
        //         this.logo = res.logo.original;
        //     });

        this.user = this._authService.getUser();

        console.log('sidebar user', this.user);

        if (this.user && this.user.profilePicture) {

            this.profilePic = this.user.profilePicture.documentUrl;

            // this.permission = this._authService.getSidebarPermissions();
            // console.log('sidebar permissions', this.permission);

        }

        this._authService.loginUserStatusChanged.subscribe(
            (user) => {
                this.user = user;
            },
            (error) => console.error(error),
            () => console.log('Login state has been marked completed!')
        );

        // this._uiService.navigationService().subscribe(
        //     (res) => {
        //         console.log('Response nav:', res);
        //         if (res.navigations.sidebar.length > 0) {
        //             this.navigation = res.navigations;
        //             console.log('this.sidebarMenu', this.navigation);
        //             console.log('this.sidebar', this.navigation.sidebar);
        //         }

        //     },
        //     (error) => console.error(error),
        // );

        this.isLogin = this._authService.isLoggedIn();

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        }

        if (this.isLogin) {
            // for updating notifications count on every 10 seconds
            this.updateInfo = Observable.interval(1000 * 1500000).subscribe(x => {
                this.getNotifications();
                this.getChatMessagesStatus();
            });

        }

        this.getNotifications();
        this.getChatMessagesStatus();
    }

    getNotifications() {
        const post = {
            offsetValue: 0,
            limitValue: 10
        };
        // this._notifService.getNotifications(post).subscribe(
        //     (res) => {
        //         this.notif = res;
        //         console.log('Notification response:', this.notif);
        //         if (this.notif.notification.totalUnread > 0) {
        //             this.countNotif = this.notif.notification.totalUnread;
        //         }
        //     },
        //     (error) => console.error(error)
        // );
    }

    getChatMessagesStatus() {

    }

    onNotifClick(event) {
        this.getNotifications();
    }




    sidebar: boolean;
    sidetoggle() {

        this.sidebar = !this.sidebar;
    }
    onProfileViewClick() {
    }

    onChangePasswordClick() {
        this._router.navigateByUrl('user/change-password');
    }

    onProfileClick() {
        this._router.navigateByUrl('user/view/profile');
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

    ngOnDestroy(): void {
        // this.updateInfo.unsubscribe();
    }



    getProfile() {

    }


    navigate(path) {
        // this._router.navigate([{ outlets: { primary: path, sidemenu: path } }],
        //     { relativeTo: this.route });
        this._router.navigateByUrl(path);
        this.showNav = !this.showNav;
    }

    expandRow_old(index: number): void {
        this.expandedIndex = index === this.expandedIndex ? -1 : index;
    }

    expandRow(index: number, index1: number): void {
        if (index && (!index1 || index1 == -1)) {
            this.expandedIndex = index === this.expandedIndex ? -1 : index;
            if (this.expandedIndex == -1) {
                this.expandedIndexLevelOne = -1;
            }
        }
        else if (index && (index1 || index1 !== -1)) {

            this.expandedIndexLevelOne = index1 === this.expandedIndexLevelOne ? -1 : index1;

        }
        else {
            this.expandedIndex = index === this.expandedIndex ? -1 : index;
            this.expandedIndexLevelOne = index1 === this.expandedIndexLevelOne ? -1 : index1;
        }

    }
}
