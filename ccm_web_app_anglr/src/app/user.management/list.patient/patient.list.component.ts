import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';

import { User } from '../../core/models/user';
import { Message, MessageTypes } from '../../core/models/message';

import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
// import { UtilityService } from '../core/services/general/utility.service';
import { UserService } from '../../core/services/user/user.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { UtilityService } from '../../core/services/general/utility.service';

import { InviteDialogComponent } from '../invite.dialoge/invite.dialog.component';
import { AddUpdateUserDialogeComponent } from '../add.update.user.dialoge/add.update.user.dialoge.component';
import { LoginHistoryDialogComponent } from '../../shared/login.history.dialog/login.history.dialog.component';

declare var libraryVar: any;

@Component({
    selector: 'patient-list',
    moduleId: module.id,
    templateUrl: 'patient.list.component.html',
    // styleUrls: ['invite.doctor.component.css']
})
export class PatientListComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    isLogin: any;


    email: string = "";
    countryCode: string = "";
    mobileNo: string = "";
    type: string = "doctor_patient";
    userId: number = null;
    searchKeyword: string = null;

    roleId: number = null;
    roleCode: string = null;

    newUser: User = new User();
    userList: User[] = [];

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

    listPagePermission = false;
    addPermission = false;
    invitePermission = false;
    updatePermission = false;
    viewProfilePermission = false;
    deletePermission = false;

    isSubmitted: boolean = false;

    display = 'none';

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialog: MatDialog,
        private _uiService: UIService,
        // public _messaging: MessagingService,
        private _userService: UserService,
        private _mappingService: MappingService,
        private _utilityService: UtilityService,
        private route: ActivatedRoute, private _router: Router
    ) {
        this.currentURL = window.location.href;

        this.newUser.roleId = 5;
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);

        this.roleId = 5;
        this.roleCode = "patient";

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {

            this.listPagePermission = this._utilityService.checkUserPermission(this.user, 'patient_list_page');
            // this.listPagePermission = true;

            if (this.listPagePermission) {
                this.addPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                // this.addPermission = true;
                this.invitePermission = this._utilityService.checkUserPermission(this.user, 'invite_patient');
                // this.invitePermission = true;
                this.updatePermission = this._utilityService.checkUserPermission(this.user, 'update_patient');
                // this.addPermission = true;
                this.viewProfilePermission = this._utilityService.checkUserPermission(this.user, 'view_patient_profile');
                // this.viewPermission = true;
                this.deletePermission = this._utilityService.checkUserPermission(this.user, 'delete_patient');
                // this.addPermission = true;

                this.loadUserList();
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
        this.loadUserList();
        // }

    }

    refreshList() {
        // if (this.userListPermission) {
        this.isSpinner = true;
        this.filter = "";
        this.searchKeyword = "";
        // this.dataSource.filter = null;
        this.loadUserList();
        // }
    }

    pageChangeEvent(event?: PageEvent): PageEvent {

        // console.log("getServerData event", event);

        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadUserList();

        return event;
    }

    loadUserList() {
        const msg = new Message();
        this.length = 0;
        this.userList = [];
        // this.dataSource = new MatTableDataSource<User>(this.userList);
        if (this.listPagePermission) {
            this.isSpinner = true;

            // this._uiService.showSpinner();

            this._userService.getUsersListCount(this.searchKeyword, this.roleCode).subscribe(
                (res) => {
                    // this._uiService.hideSpinner();
                    this.length = res.json().data;

                    this._userService.getUsersListPagination(this.pageIndex, this.pageSize, this.searchKeyword, this.roleCode).subscribe(
                        (res) => {
                            // this.userList = res.json();
                            // this._uiService.hideSpinner();
                            let array = res.json().data || [];
                            // console.log('res list:', array);
                            var uList = [];
                            for (let i = 0; i < array.length; i++) {
                                let u = this._mappingService.mapUser(array[i]);
                                uList.push(u);
                            }
                            this.userList = uList;

                            // this.dataSource = new MatTableDataSource<User>(this.userList);
                            // this.dataSource.paginator = this.paginator;
                            // console.log('user list:', this.userList);

                            if (this.userList.length == 0) {
                                msg.msg = 'No Users Found';
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

    openInviteDialog() {

        let dialog = this.dialog.open(InviteDialogComponent, {
            maxWidth: "700px",
            minWidth: "550px",
            // width: "550px",
            // height: '465px',
            // data: this.id,
            data: {
                type: this.type,
                user: this.user,
            },
        });
        dialog.afterClosed().subscribe((result) => {
            console.log("result", result);
            if (result) {
                // this.refreshList();
            }
        })
    }

    resetForm() {
        this.email = null;
        this.display = 'block';
    }

    onCloseHandled(result) {
        this.display = 'none';
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

    openAddUpdateDialog() {

        let dialog = this.dialog.open(AddUpdateUserDialogeComponent, {
            maxWidth: "700px",
            minWidth: "550px",
            // width: "550px",
            // height: '465px',
            // data: this.id,
            data: {
                user: null,
                roleId: this.roleId,
                roleCode: this.roleCode,
            },
        });
        dialog.afterClosed().subscribe((result) => {
            console.log("result", result);
            if (result) {
                this.refreshList();
            }
        })
    }

    openLoginHistoryDialog() {

        let dialog = this.dialog.open(LoginHistoryDialogComponent, {
            width: "550px",
            height: '465px',
            // data: this.id,
            data: {
                user: this.user,
                type: "doctor_patient",
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

    userDelete(userId) {
        const msg = new Message();
        console.log('delete user');
        console.log(userId);
        // this._userService.deleteUser(userId)

        this._userService.deleteUser(userId).subscribe(
            (res) => {

                this.isSubmitted = false;
                msg.msg = res.json().message ? res.json().message : 'Patient deleted successfully';
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

}
