import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatDialog, MatPaginator } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

// import { ScriptService } from '../core/services/script.service';
// import { UtilityService } from '../core/services/general/utility.service';
// import { MessagingService } from '../messaging.service';
// import { DashboardService } from '../core/services/general/dashboard.service';
// import { Dashboard } from '../core/models/dashboard';
import { Message, MessageTypes } from '../../core/models/message';
import { Permission } from '../../core/models/permission';

// import { SetupService } from '../../core/services/setup/setup.service';
import { InviteDialogComponent } from '../invite.dialoge/invite.dialog.component';
import { UserService } from '../../core/services/user/user.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { FormService } from '../../core/services/form/form.service';
import { AddUpdateUserDialogeComponent } from '../add.update.user.dialoge/add.update.user.dialoge.component';
import { ConfirmationDialogComponent } from '../../shared/dialogs/confirmationDialog.component';

// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';

declare var libraryVar: any;

@Component({
    selector: 'facilitator-list',
    moduleId: module.id,
    templateUrl: 'facilitator.list.component.html',
    // styleUrls: ['invite.doctor.component.css']
})
export class FacilitatorListComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    isLogin: any;

    userPermissions: Permission[] = [];

    email: string = "";
    countryCode: string = "";
    mobileNo: string = "";
    type: string = "doctor_facilitator";
    userId: number = null;
    searchKeyword: string = null;

    roleId: number = null;
    roleCode: string = null;

    newUser: User = new User();
    userList: User[] = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('myInput') myInputVariable: ElementRef;

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
    bulkUploadPermission = false;

    isSubmitted: boolean = false;

    formRegister: FormGroup;

    display = 'none';
    file: any;

    constructor(@Inject('IAuthService') private _authService: IAuthService,
        public dialog: MatDialog,
        private _uiService: UIService,
        private _formService: FormService,
        private _userService: UserService,
        private _mappingService: MappingService,
        private _utilityService: UtilityService,
        private route: ActivatedRoute, private _router: Router,
        private fb: FormBuilder
    ) {
        this.currentURL = window.location.href;

        this.formRegister = fb.group({

            'firstName': [this.newUser.firstName, Validators.compose([Validators.required])],
            'lastName': [this.newUser.lastName, Validators.compose([Validators.required])],
            'email': [this.newUser.email, Validators.compose([Validators.required])],
            'mobileNumber': [this.newUser.mobileNumber, Validators.compose([])],
            'telephoneNumber': [this.newUser.phoneNumber, Validators.compose([])],
            'officeAddress': [this.newUser.officeAddress, Validators.compose([])],
            'residentialAddress': [this.newUser.residentialAddress, Validators.compose([])],
            'gender': [this.newUser.gender, Validators.compose([])],
            'functionalTitle': [this.newUser.functionalTitle, Validators.compose([])],
            'age': [this.newUser.age, Validators.compose([])],
            'ageGroup': [this.newUser.ageGroup, Validators.compose([])],
        });

        this.newUser.roleId = 3;
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.userPermissions = this._authService.getUserPermissions();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);


        this.roleId = 3;
        this.roleCode = "facilitator";

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {

            // this.listPagePermission = this._utilityService.checkUserPermission(this.user, 'facilitator_list_page');
            this.listPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'facilitator_list_page');
            // this.listPagePermission = true;

            if (this.listPagePermission) {
                // this.addPermission = this._utilityService.checkUserPermission(this.user, 'add_facilitator');
                this.addPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'add_facilitator');
                // this.addPermission = true;

                // this.invitePermission = this._utilityService.checkUserPermission(this.user, 'invite_facilitator');
                this.invitePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'invite_facilitator');
                // this.invitePermission = true;

                // this.updatePermission = this._utilityService.checkUserPermission(this.user, 'update_facilitator');
                this.updatePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'update_facilitator');
                // this.updatePermission = true;

                // this.viewProfilePermission = this._utilityService.checkUserPermission(this.user, 'view_facilitator_profile');
                this.viewProfilePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_facilitator_profile');
                // this.viewProfilePermission = true;

                // this.deletePermission = this._utilityService.checkUserPermission(this.user, 'delete_facilitator');
                this.deletePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'delete_facilitator');
                // this.deletePermission = true;

                // this.bulkUploadPermission = this._utilityService.checkUserPermission(this.user, 'upload_bulk_facilitator');
                this.bulkUploadPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'upload_bulk_facilitator');
                // this.bulkUploadPermission = true;

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

    public changeListener(files: FileList) {

        this.file = files.item(0);
    }

    clickBulkUpload() {
        const msg = new Message();
        if (this.bulkUploadPermission) {

            if (this.file) {

                this._uiService.showSpinner();

                this._userService.addBulkUser(this.file, "facilitator").subscribe(
                    (res) => {
                        this._uiService.hideSpinner();

                        this.myInputVariable.nativeElement.value = "";
                        this.file = null;

                        msg.msg = res.json() ? res.json().message : 'Record Updated Successfully';
                        // msg.msg = 'You have successfully signed up';
                        msg.msgType = MessageTypes.Information;
                        msg.autoCloseAfter = 400;
                        this._uiService.showToast(msg, 'info');

                        this.refreshList();

                    },
                    (err) => {
                        console.log(err);
                        this._uiService.hideSpinner();
                        this._authService.errStatusCheckResponse(err);
                    }
                );

            }
            else {
                msg.msg = 'Please Select File';
                msg.msgType = MessageTypes.Error;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, '');
            }

        }
        else {
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
                user: this.user,
                // type: this.type,
                type: "doctor_facilitator",
            },
        });
        dialog.afterClosed().subscribe((result) => {
            console.log("result", result);
            if (result) {
                // this.refreshList();
            }
        })
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

    resetForm() {
        this.formRegister.reset();
        this.display = 'block';
    }

    onCloseHandled(result) {
        this.display = 'none';

        if (result) {

        }
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

                    this.onCloseHandled(true);
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

    onSubmitAddUser() {
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;
        console.log("onSubmitAddUser newUser", this.newUser);

        if (this.formRegister.invalid) {
            const msg = new Message();
            msg.title = '';
            msg.iconType = '';


            if (this.formRegister.controls['firstName'].hasError('required')) {
                msg.msg = 'First Name is required.';
            } else if (this.formRegister.controls['lastName'].hasError('required')) {
                msg.msg = 'Last Name is required.';
            } else {
                msg.msg = 'Validation failed.';
            }
            this._uiService.showToast(msg, '');

        }
        else if (this.formRegister.valid) {
            this.isSubmitted = true;
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._userService.addUser(this.newUser).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    // this._authServices.storeUser(this.userForm);

                    msg.msg = res.json() ? res.json().message : 'Record Successfully Submitted';
                    // msg.msg = 'You have successfully signed up';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');

                    this.onCloseHandled(true);
                },
                (err) => {
                    console.log(err);
                    this.isSubmitted = false;
                    this._authService.errStatusCheckResponse(err);
                }
            );
        } else {
            // console.log("asd")
            this._formService.validateAllFormFields(this.formRegister);
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

    confirmDialog(user: User, btn, index) {
        let msg;
        let title;
        if (btn === 'delete') {
            title = 'Delete User';
            msg = 'Are you sure you want to delete ' + user.firstName + ' ?';
        }
        else if (btn === 'activate') {
            title = 'Activate User';
            msg = 'Are you sure you want to activate ' + user.firstName + ' ?';
        }
        else if (btn === 'deactivate') {
            title = 'Deactivate User';
            msg = 'Are you sure you want to deactivate ' + user.firstName + ' ?';
        }
        else if (btn === 'block') {
            title = 'Block User';
            msg = 'Are you sure you want to block ' + user.firstName + ' ?';
        }
        else if (btn === 'unblock') {
            title = 'Unblock User';
            msg = 'Are you sure you want to unblock ' + user.firstName + ' ?';
        }
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '400px',
            data: { message: msg, title: title }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('dialog close', result);
            if (result && result.status && btn === 'delete') {
                this.userDelete(user);
            }
            if (result && btn === 'activate') {
                // this.activateUser(user);
            }
            if (result && btn === 'deactivate') {
                // this.deActivateUser(user);
            }
            if (result && btn === 'block') {
                // this.blockUser(user, index);
            }
            if (result && btn === 'unblock') {
                // this.unBlockUser(user, index);
            }
        });
    }


    userDelete(user) {
        const msg = new Message();
        console.log('delete user');
        console.log(user);

        this._userService.deleteUser(user.id).subscribe(
            (res) => {

                this.isSubmitted = false;
                msg.msg = res.json().message ? res.json().message : 'Facilitator deleted successfully';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');

                this.refreshList();
                // this._router.navigate([this.currentURL]);
            },
            (err) => {
                console.log(err);
                this.isSubmitted = false;
                this._authService.errStatusCheckResponse(err);
            });
    }


}
