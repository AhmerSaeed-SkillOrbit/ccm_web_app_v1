import { Component, Input, OnInit, Inject, OnChanges, Output, EventEmitter, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';

import { Message, MessageTypes } from '../../core/models/message';
import { User } from '../../core/models/user';
import { Region } from '../../core/models/region';
import { Country } from '../../core/models/country';

import { UIService } from '../../core/services/ui/ui.service';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { FormService } from '../../core/services/form/form.service';
import { UserService } from '../../core/services/user/user.service';
import { MappingService } from '../../core/services/mapping/mapping.service';

import { Config } from '../../config/config';
import { SetupService } from '../../core/services/setup/setup.service';
import { Ticket, Type, Priority, TicketAssignee } from '../../core/models/ticket';
import { TicketService } from '../../core/services/ticket/ticket.service';


@Component({
    selector: 'login-history-dialoge',
    templateUrl: 'login.history.dialog.component.html',
})

export class LoginHistoryDialogComponent {

    user: User = new User();
    userList: User[] = [];

    isSubmitted = false;
    addPermission = false;
    buttonTooltip = "";

    loginHistoryList: User[] = [];

    // displayedColumnsHs = ['sNo', 'name', 'dateTime'];
    displayedColumnsHs = ['dateTime'];
    dataSourceHs = new MatTableDataSource<User>(this.loginHistoryList);
    @ViewChild(MatPaginator) paginatorHs: MatPaginator;
    isSpinnerHs = false;
    filterHs: string = "";
    pageEventHs: PageEvent;
    pageIndexHs: number = 0;
    pageSizeHs: number = 5; // by default
    lengthHs: number = 0;
    pageSizeOptions = [5, 10];
    // pageSizeOptions = [10];
    upperLimit = 0;

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialogRef: MatDialogRef<LoginHistoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _uiService: UIService,
        private utilityService: UtilityService,
        private _userService: UserService,
        private _setupService: SetupService,
        private _mappingService: MappingService,
        private fb: FormBuilder,
    ) {

        // this._uiService.showSpinner();

        this.user = this._authService.getUser();


        this.loadLoginHistoryList();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSourceHs.filter = filterValue;
    }

    refreshList() {
        this.isSpinnerHs = true;
        this.filterHs = "";
        this.dataSourceHs.filter = null;
        this.loadLoginHistoryList();
    }

    pageChangeEvent(event?: PageEvent): PageEvent {

        console.log("getServerData event", event);

        this.pageIndexHs = event.pageIndex;
        this.pageSizeHs = event.pageSize;
        this.loadLoginHistoryList();

        return event;
    }

    loadLoginHistoryList() {
        const msg = new Message();
        this.loginHistoryList = [];
        this.dataSourceHs = new MatTableDataSource<User>(this.loginHistoryList);

        // if (this.listPermission) {

        this.isSpinnerHs = true;

        this._userService.getUserLoginHistoryListCount(this.user.id).subscribe(
            (res) => {

                this.lengthHs = res.json().data;

                this._userService.getUserLoginHistoryListPagination(this.pageIndexHs, this.pageSizeHs, this.user.id).subscribe(
                    (res) => {
                        this.isSpinnerHs = false;
                        const array = res.json().data;
                        console.log('res user list:', res);
                        var bList = [];
                        for (let i = 0; i < array.length; i++) {
                            let u = this._mappingService.mapUser(array[i]);
                            bList.push(u);
                        }
                        this.loginHistoryList = bList;

                        this.dataSourceHs = new MatTableDataSource<User>(this.loginHistoryList);
                        // this.dataSource.paginator = this.paginator;

                        // if (this.loginHistoryList.length === 0) {
                        //     msg.msg = 'No History Data Found';
                        //     msg.msgType = MessageTypes.Information;
                        //     msg.autoCloseAfter = 400;
                        //     this._uiService.showToast(msg, 'info');
                        // }
                    },
                    (err) => {
                        console.log(err);
                        this.dataSourceHs = new MatTableDataSource<User>(this.loginHistoryList);
                        // this._authService.errStatusCheckResponse(err);
                        this.isSpinnerHs = false;
                    }
                );

            },
            (err) => {
                console.log(err);
                // this._authService.errStatusCheckResponse(err);
                this.isSpinnerHs = false;
            }
        );

        // }
        // else {
        //     this.isSpinnerHs = false;
        //     let msg = this._utilityService.permissionMsg();
        //     this._uiService.showToast(msg, '');
        // }
    }

    // onCancel
    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onYesClick(): void {
        this.dialogRef.close(true);
    }
}
