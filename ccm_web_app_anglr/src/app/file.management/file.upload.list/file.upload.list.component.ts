import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatDialog, MatTableDataSource, MatPaginator, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

import { Message, MessageTypes } from '../../core/models/message';
import { User } from '../../core/models/user';
import { GenericFileUpload } from '../../core/models/genericFileUpload';
import { Role } from '../../core/models/role';


import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { FileService } from '../../core/services/file/file.service';



import { ConfirmationDialogComponent } from '../../shared/dialogs/confirmationDialog.component';
import { ViewAppointmentDialogeComponent } from '../../shared/appointment.dialoge/view.appointment.dialoge.component';
import { ForumService } from '../../core/services/forum/forum.service';
import { SetupService } from '../../core/services/setup/setup.service';
import { Permission } from '../../core/models/permission';


declare var libraryVar: any;

@Component({
    selector: 'file-upload-list',
    moduleId: module.id,
    templateUrl: 'file.upload.list.component.html',
    // styleUrls: ['../file.upload.component.css']
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})
export class FileUploadListComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    isLogin: any;

    userPermissions: Permission[] = [];

    userId: number = null;

    searchKeyword: string = null;
    roleId: number = null;
    dateFrom: string = null;
    dateTo: string = null;

    status: string = null;

    fileUploadList: GenericFileUpload[] = [];

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
    updatePermission = false;
    deletePermission = false;
    viewPermission = false;

    roleList: Role[] = []

    isSubmitted: boolean = false;

    private _sub: Subscription;

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialog: MatDialog,
        private _uiService: UIService,
        // public _messaging: MessagingService,
        // private _userService: UserService,
        private _setupService: SetupService,
        private _fileService: FileService,
        private _mappingService: MappingService,
        private _utilityService: UtilityService,
        private datePipe: DatePipe,
        private route: ActivatedRoute, private _router: Router
    ) {
        this.currentURL = window.location.href;

    }

    ngOnInit(): void {

        this.user = this._authService.getUser();

        this.userPermissions = this._authService.getUserPermissions();

        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);

        this.status = "accepted";

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {

            // this.listPagePermission = this._utilityService.checkUserPermission(this.user, 'general_file_list_page');
            this.listPagePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'general_file_list_page');
            // this.listPagePermission = true;

            if (this.listPagePermission) {
                // this.addPermission = this._utilityService.checkUserPermission(this.user, 'upload_general_file');
                this.addPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'upload_general_file');
                // this.addPermission = true;

                // this.updatePermission = this._utilityService.checkUserPermission(this.user, 'update_general_file');
                this.updatePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'update_general_file');
                // this.updatePermission = true;
                
                // this.deletePermission = this._utilityService.checkUserPermission(this.user, 'delete_general_file');
                this.deletePermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'delete_general_file');
                // this.deletePermission = true;
                
                // this.viewPermission = this._utilityService.checkUserPermission(this.user, 'view_general_file');
                this.viewPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'view_general_file');
                // this.viewPermission = true;

                this.loadRoleList();
                this.loadFileUploadedList();

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
        this.loadFileUploadedList();
        // }

    }

    reset() {
        this.searchKeyword = null;
        this.roleId = null;
        this.dateFrom = null;
        this.dateTo = null;

        this.refreshList();
    }

    refreshList() {
        // if (this.userListPermission) {
        this.isSpinner = true;
        this.filter = "";
        this.searchKeyword = "";

        // this.priority = null;
        // this.type = null;
        // this.trackStatus = null;

        // this.dataSource.filter = null;
        this.loadFileUploadedList();
        // }
    }

    pageChangeEvent(event?: PageEvent): PageEvent {

        // console.log("getServerData event", event);

        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadFileUploadedList();

        return event;
    }

    dateChanged(event, type) {
        console.log('event', event.value);
        console.log('type', type);
        if (type == 'dateFrom') {
            this.dateFrom = this.datePipe.transform(this.dateFrom, 'yyyy-MM-dd');
            this.dateTo = null;
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.dateFrom);
        }
        if (type == 'dateTo') {
            this.dateTo = this.datePipe.transform(this.dateTo, 'yyyy-MM-dd');
            // this.projectActivityForm.projectActivityDate = this.datePipe.transform(this.projectActivityForm.projectActivityDate, 'yyyy-MM-dd h:mm:ss a');
            console.log('event', this.dateTo);
        }

        if (this.dateFrom && this.dateTo) {
            this.pageIndex = 0;
            this.loadFileUploadedList();
        }

    }

    onRoleChange() {
        this.loadFileUploadedList();
    }

    loadRoleList() {

        const msg = new Message();

        this._setupService.getRoles().subscribe(
            (res) => {

                let array = res.json().data || [];
                // console.log('res list:', array);
                var uList = [];
                for (let i = 0; i < array.length; i++) {
                    let u = this._mappingService.mapRole(array[i]);
                    uList.push(u);
                }
                this.roleList = uList;

                // if (this.roleList.length == 0) {
                //     msg.msg = 'No Roles Found';
                //     msg.msgType = MessageTypes.Information;
                //     msg.autoCloseAfter = 400;
                //     this._uiService.showToast(msg, 'info');
                // }
            },
            (err) => {
                console.log(err);
                // this._authService.errStatusCheckResponse(err);
                // this.isSpinner = false;
            }
        )
    }

    loadFileUploadedList() {
        const msg = new Message();
        this.length = 0;
        this.fileUploadList = [];
        // this.dataSource = new MatTableDataSource<User>(this.userList);
        if (this.listPagePermission) {
            this.isSpinner = true;

            // this._uiService.showSpinner();

            this._fileService.getGeneralFileListCount(this.searchKeyword, this.roleId, this.dateFrom, this.dateTo).subscribe(
                (res) => {
                    // this._uiService.hideSpinner();
                    this.length = res.json().data;

                    this._fileService.getGeneralFileListPagination(this.pageIndex, this.pageSize, this.searchKeyword, this.roleId, this.dateFrom, this.dateTo).subscribe(
                        (res) => {
                            // this.userList = res.json();
                            // this._uiService.hideSpinner();
                            let array = res.json().data || [];
                            // console.log('res list:', array);
                            var uList = [];
                            for (let i = 0; i < array.length; i++) {
                                let u = this._mappingService.mapGenericFileUpload(array[i]);
                                uList.push(u);
                            }
                            this.fileUploadList = uList;

                            // this.dataSource = new MatTableDataSource<User>(this.userList);
                            // this.dataSource.paginator = this.paginator;
                            // console.log('user list:', this.userList);

                            if (this.fileUploadList.length == 0) {
                                msg.msg = 'No File Found';
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

    confirmDialog(fileUpload: GenericFileUpload, btn, index) {
        let msg = "";
        let title = "";
        let type = "";

        if (btn === 'delete') {
            title = 'Delete File';
            msg = 'Are you sure you want to Remove this File?';
            type = "remove";
        }
        else if (btn === 'accept') {
            title = 'Accept Request';
            // msg = 'Are you sure you want to Accept this Appointment? Appointment No: ' + ccmPlan.planNumber + '';
            type = "accept";
        }
        else if (btn === 'reject') {
            title = 'Reject Request';
            // msg = 'Are you sure you want to Reject this Appointment? Appointment No: ' + ccmPlan.planNumber + '';
            type = "reject";

        }
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '400px',
            // data: { message: msg, title: title, type: this.perFormAction.code, form: form }
            data: { message: msg, title: title, type: type }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('dialog close', result);

            if (result && result.status && btn === 'delete') {
                this.fileDelete(fileUpload.id);
            }
            if (result && result.status && btn === 'accept') {
                // this.approveRequest(user, index);
                // this.approveRequest(user, result.reason);
                // this.changeRequestStatus(appointment.id, btn, null);
                // this.changeRequestStatus(appointment.id, "accepted", null);
            }
            if (result && result.status && btn === 'reject') {
                // this.rejectRequest(user, index);
                // this.changeRequestStatus(appointment.id, btn, result.reason);
                // this.changeRequestStatus(appointment.id, "rejected", result.reason);
                // this.approveRequest(user, null);
            }
            if (result && result.status && btn === 'cancel') {
                // this.cancelRequest(appointment.id, result.reason);
            }
        });
    }

    replaceText(text) {
        return this._utilityService.replaceConfigText(text);
    }

    nevigateTo(data, type) {

        console.log("nevigateTo data", data);

        if (type == "form") {
            let url = "/file/upload/fu/form/";
            this._router.navigate(['/file/upload/fu/form']);

        }
        else if (type == "form-test") {
            let url = "/file/upload/fu/form/"
            this._router.navigate(['/file/upload/fu/form', data.id]);
        }

    }

    onNavigate(url) {
        console.log("test");
        window.open(url, "_blank");
    }

    fileDelete(fileUploadId) {
        const msg = new Message();
        console.log('delete file');
        console.log(fileUploadId);
        // this._userService.deleteUser(userId)

        this._uiService.showSpinner();
        this._fileService.removeGenericFile(fileUploadId).subscribe(
            (res) => {

                this.isSubmitted = false;

                this._uiService.hideSpinner();

                msg.msg = res.json().message ? res.json().message : 'File deleted successfully';
                // msg.msg = 'You have successfully added an activity';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                // this._router.navigate([this.currentURL]);
                this.refreshList();
            },
            (err) => {
                console.log(err);
                this.isSubmitted = false;
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            });
    }

    ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

}