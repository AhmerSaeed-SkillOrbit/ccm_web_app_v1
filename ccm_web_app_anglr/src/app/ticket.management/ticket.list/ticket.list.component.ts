import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatDialog, MatTableDataSource, MatPaginator, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Message, MessageTypes } from '../../core/models/message';
import { User } from '../../core/models/user';
import { Ticket } from '../../core/models/ticket';

import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { TicketService } from '../../core/services/ticket/ticket.service';



import { ConfirmationDialogComponent } from '../../shared/dialogs/confirmationDialog.component';
import { ViewAppointmentDialogeComponent } from '../../shared/appointment.dialoge/view.appointment.dialoge.component';
import { AddUpdateTicketDialogeComponent } from '../add.update.ticket.dialoge/add.update.ticket.dialoge.component';
import { ForumService } from '../../core/services/forum/forum.service';

declare var libraryVar: any;

@Component({
    selector: 'ticket-list',
    moduleId: module.id,
    templateUrl: 'ticket.list.component.html',
    // styleUrls: ['../ticket.component.css']
})
export class TicketListComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    isLogin: any;

    userId: number = null;
    searchKeyword: string = null;

    status: string = null;

    ticketList: Ticket[] = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    isSpinner = false;
    filter: string = "";

    pageEvent: PageEvent;
    pageIndex: number = 0;
    pageSize: number = 5; // by default
    length: number = 0;
    pageSizeOptions = [5, 10, 25, 50];
    // pageSizeOptions = [10];
    upperLimit = 0;

    listPagePermission = false;
    addPermission = false;
    viewPermission = false;
    acceptPermission = false;
    rejectPermission = false;
    cancelPermission = false;

    isSubmitted: boolean = false;

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialog: MatDialog,
        private _uiService: UIService,
        // public _messaging: MessagingService,
        // private _userService: UserService,
        private _ticketService: TicketService,
        private _mappingService: MappingService,
        private _utilityService: UtilityService,
        private route: ActivatedRoute, private _router: Router
    ) {
        this.currentURL = window.location.href;
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);

        this.status = "accepted";

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {

            // this.listPagePermission = this._utilityService.checkUserPermission(this.user, 'appointment_list_page');
            this.listPagePermission = true;

            if (this.listPagePermission) {
                // this.addPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                this.addPermission = true;
                // this.viewPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                this.viewPermission = true;
                // this.acceptPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                // this.acceptPermission = true;
                // this.rejectPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                // this.rejectPermission = true;
                // this.cancelPermission = this._utilityService.checkUserPermission(this.user, 'add_patient');
                this.cancelPermission = true;

                this.loadTicketList();
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
        this.loadTicketList();
        // }

    }

    refreshList() {
        // if (this.userListPermission) {
        this.isSpinner = true;
        this.filter = "";
        this.searchKeyword = "";
        // this.dataSource.filter = null;
        this.loadTicketList();
        // }
    }

    pageChangeEvent(event?: PageEvent): PageEvent {

        // console.log("getServerData event", event);

        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadTicketList();

        return event;
    }

    loadTicketList() {
        const msg = new Message();
        this.length = 0;
        this.ticketList = [];
        // this.dataSource = new MatTableDataSource<User>(this.userList);
        if (this.listPagePermission) {
            this.isSpinner = true;

            // this._uiService.showSpinner();

            this._ticketService.getTicketListCount().subscribe(
                (res) => {
                    // this._uiService.hideSpinner();
                    this.length = res.json().data;

                    this._ticketService.getTicketListPagination(this.pageIndex, this.pageSize).subscribe(
                        (res) => {
                            // this.userList = res.json();
                            // this._uiService.hideSpinner();
                            let array = res.json().data || [];
                            // console.log('res list:', array);
                            var uList = [];
                            for (let i = 0; i < array.length; i++) {
                                let u = this._mappingService.mapTicket(array[i]);
                                uList.push(u);
                            }
                            this.ticketList = uList;

                            // this.dataSource = new MatTableDataSource<User>(this.userList);
                            // this.dataSource.paginator = this.paginator;
                            // console.log('user list:', this.userList);

                            if (this.ticketList.length == 0) {
                                msg.msg = 'No Ticket Found';
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
                this.refreshList();
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

    openViewDialog(ticket: Ticket) {
        const dialogRef = this.dialog.open(ViewAppointmentDialogeComponent, {
            width: '400px',
            // data: { message: msg, title: title, type: this.perFormAction.code, form: form }
            data: {
                ticket: ticket
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('dialog close', result);
        });
    }

    confirmDialog(ticket: Ticket, btn, index) {
        let msg = "";
        let title = "";
        let type = "";

        if (btn === 'accept') {
            title = 'Accept Request';
            // msg = 'Are you sure you want to accept ' + appointment.appointmentNumber + ' appoitment request ?';
            msg = 'Are you sure you want to Accept this Appointment? Appointment No: ' + ticket.title + '';
            type = "accept";
        }
        else if (btn === 'reject') {
            title = 'Reject Request';
            // msg = 'Are you sure you want to reject ' + appointment.appointmentNumber + ' appoitment request ?';
            msg = 'Are you sure you want to Reject this Appointment? Appointment No: ' + ticket.title + '';
            type = "reject";

        }
        else if (btn === 'cancel') {
            title = 'Cancel Request';
            // msg = 'Are you sure you want to cancel ' + appointment.appointmentNumber + ' appoitment request ?';
            msg = 'Are you sure you want to Cancel this Appointment? Appointment No: ' + ticket.title + '';
            type = "cancel";

        }
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '400px',
            // data: { message: msg, title: title, type: this.perFormAction.code, form: form }
            data: { message: msg, title: title, type: type }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('dialog close', result);

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

        if (type == "ticket-discussion") {
            let url = "/ticket/t/discussion/" + data.id
            this._router.navigate(['/ticket/t/discussion', data.id]);
            // this._router.navigate([url]).then(result => {
            //     console.log("nevigateTo navigate ", result);
            //     window.open(url, '_blank');
            // });
            // window.open(url, "_blank");
            // window.open(FlowRouter.url("/ticket/t/discussion", data.id), '_blank')

        }

    }

}


@Component({
    selector: 'delete-reply-ticket',
    templateUrl: '../delete.html',
    // styleUrls: ['../../campaign.component.css']
})

export class DeleteReplyTicket {
    fieldType: string;
    id: number;
    returnType: string = "none";
    constructor(
        public dialogRef: MatDialogRef<DeleteReplyTicket>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _uiService: UIService,
        private _router: Router,
        // private _setupService: AdminSetupService
        private _forumService: ForumService,
        private _ticketService: TicketService,
    ) {
        this.fieldType = data.type;
        this.id = data.id;
        // console.log('data', this.fieldType);

    }

    onNoClick(): void {
        this.dialogRef.close(this.returnType);
    }

    onYesClick(field) {

        if (field === 'comment') {
            this._forumService.deleteComment(this.id).subscribe(
                (res) => {
                    this.returnType = "success";
                    this.dialogRef.close(this.returnType);
                    const msg = new Message();
                    msg.msg = 'You have deleted comment successfully';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                },
                (err) => {
                    this.returnType = "error";
                    this.dialogRef.close(this.returnType);
                    console.log(err);
                    // const msg = new Message();
                    // msg.msg = 'Sorry, an error has occured';
                    // msg.msgType = MessageTypes.Error;
                    // msg.autoCloseAfter = 400;
                    // this._uiService.showToast(msg, '');

                    const msg = new Message();
                    const msgContent = err.json() && err.json().genericResponse && err.json().genericResponse.genericBody.message ? err.json().genericResponse.genericBody.message : "Sorry, an error has occured";
                    msg.msg = msgContent;
                    msg.msgType = MessageTypes.Error;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, '');
                });
        }
        else if (field === 'forum') {
            this._forumService.deleteForumTopic(this.id).subscribe(
                (res) => {
                    this.returnType = "success";
                    this.dialogRef.close(this.returnType);
                    const msg = new Message();
                    msg.msg = 'You have deleted topic successfully';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                },
                (err) => {
                    this.returnType = "error";
                    this.dialogRef.close(this.returnType);
                    console.log(err);
                    // const msg = new Message();
                    // msg.msg = 'Sorry, an error has occured';
                    // msg.msgType = MessageTypes.Error;
                    // msg.autoCloseAfter = 400;
                    // this._uiService.showToast(msg, '');

                    const msg = new Message();
                    const msgContent = err.json() && err.json().genericResponse && err.json().genericResponse.genericBody.message ? err.json().genericResponse.genericBody.message : "Sorry, an error has occured";
                    msg.msg = msgContent;
                    msg.msgType = MessageTypes.Error;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, '');
                });
        }
        else if (field === 'reply') {
            this._ticketService.deleteReply(this.id).subscribe(
                (res) => {
                    this.returnType = "success";
                    this.dialogRef.close(this.returnType);
                    const msg = new Message();
                    msg.msg = 'You have deleted reply successfully';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                },
                (err) => {
                    this.returnType = "error";
                    this.dialogRef.close(this.returnType);
                    console.log(err);
                    // const msg = new Message();
                    // msg.msg = 'Sorry, an error has occured';
                    // msg.msgType = MessageTypes.Error;
                    // msg.autoCloseAfter = 400;
                    // this._uiService.showToast(msg, '');

                    const msg = new Message();
                    const msgContent = err.json() && err.json().genericResponse && err.json().genericResponse.genericBody.message ? err.json().genericResponse.genericBody.message : "Sorry, an error has occured";
                    msg.msg = msgContent;
                    msg.msgType = MessageTypes.Error;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, '');
                });
        }
        else {
            this.dialogRef.close(this.returnType);
        }

    }
}