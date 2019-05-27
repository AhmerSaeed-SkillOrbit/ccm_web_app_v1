import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ISubscription } from "rxjs/Subscription";

import { User } from '../../../core/models/user';
import { Message, MessageTypes } from '../../../core/models/message';
import { Permission } from '../../../core/models/permission';
// import { Notifications } from '../../core/models/notification/notification';
// import { Sidebar } from '../../core/models/nav/sidebar';

import { UIService } from '../../../core/services/ui/ui.service';
// import { NotificationService } from '../../core/services/general/notification.service';
import { IAuthService } from '../../../core/services/auth/iauth.service';
import { RoutingInfoService } from '../../../core/services/routInfo/route.info.service';
import { UtilityService } from '../../../core/services/general/utility.service';
import { FileService } from '../../../core/services/file/file.service';
import { MappingService } from '../../../core/services/mapping/mapping.service';
// import { ScriptService } from '../../core/services/script.service';
// import { DashboardService } from '../../core/services/general/dashboard.service';




@Component({
    selector: 'sidebar',
    moduleId: module.id,
    templateUrl: 'sidebar.component.html',
    // styleUrls: ['../header/header.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

    isLogin: any;
    // notif: Notifications = new Notifications();
    countNotif: number;
    user: User = new User();
    userPermissions: Permission[] = [];
    // script = new ScriptService();
    showNav: boolean;
    private updateInfo: ISubscription;

    isUser: User = new User();
    entityType: string;
    redirectUrl: string;
    profilePic: any;

    // navigation: {
    //     sidebar: Sidebar;
    // };
    navShow = false;
    expandedIndex = -1;
    logo: any;
    overAllUnreadStatus = false;

    adminListPagePermission = false;
    facilitatorListPagePermission = false;
    doctorListPagePermission = false;
    patientListPagePermission = false;
    supportStaffListPagePermission = false;
    pendingInvitationListPagePermission = false;
    inviteFacilitatorPagePermission = false;



    rolePermissionPagePermission = false;

    addDoctorSchedulePagePermission = false;
    doctorScheduleListPagePermission = false;
    viewDoctorSchedulePagePermission = false;

    pendingRequestListPagePermission = false;
    acceptedRequestListPagePermission = false;
    rejectedRequestListPagePermission = false;

    forumFeedPagePermission = false;

    ticketListPagePermission = false;

    ccmPlanPatientPermission = false;

    fileUploadListPagePermission = false;

    reportPRPermission = false;
    reportPIPermission = false;
    reportPCCPermission = false;
    reportPTPermission = false;

    selectedFile: File = null;

    // @ViewChild('myInput') myInputVariable: ElementRef;
    @ViewChild('clickToUpload') myInputVariable: ElementRef;

    sidebar: boolean;

    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        private _utilityService: UtilityService,
        private _fileService: FileService,
        private _mappingService: MappingService,
        private route: ActivatedRoute, private _router: Router,
        // private _notifService: NotificationService
    ) {
        this.sidebar = true;
        // this.script.loadScript('commetchat')
        //     .then(data => {
        //         console.log('script loaded ', data);
        //     }).catch(error => console.log(error));
    }


    ngOnInit(): void {
        // To get Social CxN logo

        // this._uiService.platformSettings().subscribe(
        //     (res) => {
        //         this.logo = res.logo.original;
        //     });

        this.user = this._authService.getUser();

        this.checkAndSetPermission();
        console.log("user", this.user);
        // this.profilePic = this.user.profilePic.thumbnails.square;

        console.log('this.profilePic ', this.profilePic);

        this._authService.loginUserStatusChanged.subscribe(
            (user) => {
                this.user = user;
                this.checkAndSetPermission();
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

        this.user = this._authService.getUser();
        console.log("user", this.user);

        // this.profilePic = this.user.profilePic.thumbnails.square ? this.user.profilePic.thumbnails.square : null;
        console.log('this.profilePic ', this.profilePic);

        if (this.isLogin) {
            // for updating notifications count on every 10 seconds

            // this.updateInfo = Observable.interval(1000 * 1500000).subscribe(x => {
            //     this.getNotifications();
            // });

        }

        // this.getNotifications();
        // this.getChatMessagesStatus();
    }

    checkAndSetPermission() {
        this.userPermissions = this._authService.getUserPermissions();

        // this.adminListPagePermission = this._utilityService.checkUserPermission(this.user, 'super_admin_list_page');
        this.adminListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'super_admin_list_page');
        // this.adminListPagePermission = true;
        // this.facilitatorListPagePermission = this._utilityService.checkUserPermission(this.user, 'facilitator_list_page');
        this.facilitatorListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'facilitator_list_page');
        // this.facilitatorListPagePermission = true;
        // this.doctorListPagePermission = this._utilityService.checkUserPermission(this.user, 'doctor_list_page');
        this.doctorListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'doctor_list_page');
        // this.doctorListPagePermission = true;
        // this.patientListPagePermission = this._utilityService.checkUserPermission(this.user, 'patient_list_page');
        this.patientListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'patient_list_page');
        // this.patientListPagePermission = true;
        // this.supportStaffListPagePermission = this._utilityService.checkUserPermission(this.user, 'support_staff_list_page');
        this.supportStaffListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'support_staff_list_page');
        // this.supportStaffListPagePermission = true;

        // this.pendingInvitationListPagePermission = this._utilityService.checkUserPermission(this.user, 'view_patient_pending_invitation');
        this.pendingInvitationListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_patient_pending_invitation');
        // this.pendingInvitationListPagePermission = true;

        // this.inviteFacilitatorPagePermission = this._utilityService.checkUserPermission(this.user, 'invite_facilitator');
        this.inviteFacilitatorPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'invite_facilitator');
        // this.inviteFacilitatorPagePermission = true;


        // this.rolePermissionPagePermission = this._utilityService.checkUserPermission(this.user, 'role_list_page');
        this.rolePermissionPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'role_list_page');
        // this.rolePermissionPagePermission = true;

        // <-- Scheduler Management Permissions -->

        // this.addDoctorSchedulePagePermission = this._utilityService.checkUserPermission(this.user, 'add_doctor_schedule');
        this.addDoctorSchedulePagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'add_doctor_schedule');
        // this.addDoctorSchedulePagePermission = true;
        // this.viewDoctorSchedulePagePermission = this._utilityService.checkUserPermission(this.user, 'view_doctor_schedule');
        this.doctorScheduleListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'doctor_schedule_list_page');
        // this.doctorScheduleListPagePermission = true;
        this.viewDoctorSchedulePagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_doctor_schedule');
        // this.viewDoctorSchedulePagePermission = true;

        // <-- /Scheduler Management Permissions -->


        // <-- Appointment Management Permissions -->

        // this.pendingRequestListPagePermission = this._utilityService.checkUserPermission(this.user, 'appointment_request_list_page');
        this.pendingRequestListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'appointment_request_list_page');
        // this.pendingRequestListPagePermission = true;
        // this.acceptedRequestListPagePermission = this._utilityService.checkUserPermission(this.user, 'appointment_accept_list_page');
        this.acceptedRequestListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'appointment_accept_list_page');
        // this.acceptedRequestListPagePermission = true;
        // this.rejectedRequestListPagePermission = this._utilityService.checkUserPermission(this.user, 'appointment_reject_list_page');
        this.rejectedRequestListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'appointment_reject_list_page');
        // this.rejectedRequestListPagePermission = true;

        // <-- /Appointment Management Permissions -->

        // this.forumFeedPagePermission = this._utilityService.checkUserPermission(this.user, 'view_forum_topic_feed');
        this.forumFeedPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_forum_topic_feed');
        // this.forumFeedPagePermission = true;

        // this.ticketListPagePermission = this._utilityService.checkUserPermission(this.user, 'ticket_list_page');
        this.ticketListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'ticket_list_page');
        // this.ticketListPagePermission = true;

        // this.ccmPlanPatientPermission = this._utilityService.checkUserPermission(this.user, 'ccm_plan_list_page_patient');
        this.ccmPlanPatientPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'ccm_plan_list_page_patient');
        // this.ccmPlanPatientPermission = true;

        // this.fileUploadListPagePermission = this._utilityService.checkUserPermission(this.user, 'general_file_list_page');
        this.fileUploadListPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'general_file_list_page');
        // this.fileUploadListPagePermission = true;

        // <-- /Report Management Permissions -->

        // this.reportPRPermission = this._utilityService.checkUserPermission(this.user, 'view_report_patient_registered');
        this.reportPRPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_report_patient_registered');
        // this.reportPRPermission = true;

        // this.reportPIPermission = this._utilityService.checkUserPermission(this.user, 'view_report_patient_invitation');
        this.reportPIPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_report_patient_invitation');
        // this.reportPIPermission = true;

        // this.reportPCCPermission = this._utilityService.checkUserPermission(this.user, 'view_report_ccm_cpt_code');
        this.reportPCCPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_report_ccm_cpt_code');
        // this.reportPCCPermission = true;

        // this.reportPTPermission = this._utilityService.checkUserPermission(this.user, 'view_report_patient_type');
        this.reportPTPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_report_patient_type');
        // this.reportPTPermission = true;

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

    onNotifClick(event) {
        console.log('event', event);
        this.getNotifications();
    }

    onProfileClick() {

    }

    onProfileViewClick() {

    }

    onChangePasswordClick() {
        this._router.navigateByUrl('user/change-password');
    }

    onlogOut() {
        // this.entityType = this._authService.getUser().entityType;
        // console.log('entity type:', this.entityType);

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

    expandRow(index: number): void {
        this.expandedIndex = index === this.expandedIndex ? -1 : index;
    }

    showMsg(event) {
        console.log('Show msg has been clicked');
        const msg = new Message();
        msg.title = 'Testing';
        msg.msg = 'Test message';
        msg.onOkBtnClick = () => {
            alert('Msg-ok has been clicked');
        };
        msg.onCancelBtnClick = () => {
            alert('Msg-cancel has been clicked');
        };
        this._uiService.showMsgBox(msg);
    }

    getProfile() {
    }

    changeProfilePic(event) {
        console.log("changeProfilePic");
        console.log(event);

        this.selectedFile = <File>event.target.files[0];
        this.onUpload();

    }

    onUpload() {
        const msg = new Message();

        this._fileService.uploadProfilePic(this.selectedFile, this.user.id).subscribe(
            (res) => {
                console.log('Image upload response', res);
                this.profilePic = res.json().data.documentUrl;

                msg.msg = 'Your picture has saved successfully.';
                msg.msgType = MessageTypes.Information;
                this._uiService.showToast(msg, 'info');
                msg.autoCloseAfter = 400;
                this.myInputVariable.nativeElement.value = "";

                const user = this._authService.getUser();
                let fileUpload = this._mappingService.mapFileUpload(res.json().data);
                user.profilePicture = fileUpload;
                // user.profilePicture = res.json().data;
                this._authService.storeUser(user);
                // window.location.reload();
            },
            (err) => {
                console.log('err', err);
                this.myInputVariable.nativeElement.value = "";
                this._authService.errStatusCheckResponse(err);
            }
        );

    }

    navigate(path) {
        // this._router.navigate([{ outlets: { primary: path, sidemenu: path } }],
        //     { relativeTo: this.route });
        this._router.navigateByUrl(path);
        this.showNav = !this.showNav;
    }

    getHome() {
        this._router.navigate(['home']);
    }
}
