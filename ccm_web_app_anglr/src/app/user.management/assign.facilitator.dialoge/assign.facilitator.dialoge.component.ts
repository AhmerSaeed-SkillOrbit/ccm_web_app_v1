import { Component, Input, OnInit, Inject, OnChanges, Output, EventEmitter, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

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


@Component({
    selector: 'assign-facilitator-dialoge',
    templateUrl: 'assign.facilitator.dialog.component.html',
})

export class AssignFacilitatorDialogeComponent {

    tooltipSapId = Config.pattern.sapId.tooltip;
    patternSapId = Config.pattern.sapId.regex;

    tooltipCNIC = Config.pattern.cnic.tooltip;
    patternCNIC = Config.pattern.cnic.regex;   // 42101-1234567-1

    isSubmited = false;
    user: User = new User();

    doctorId: number = null;
    doctorUser: User = new User();
    isSubmitted = false;

    assignPermission = false;
    buttonTooltip = "";

    roleCode: string = null;
    assocFacilitatorList: User[] = [];

    isSpinner = false;
    facilitatorList: User[] = [];

    filter: string = "";
    // displayedColumns = ['sNo', 'facilitatorName', 'action'];
    displayedColumns = ['sNo', 'facilitatorName'];
    dataSource = new MatTableDataSource<User>(this.facilitatorList);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    selection = new SelectionModel<User>(true, []);

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialogRef: MatDialogRef<AssignFacilitatorDialogeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _uiService: UIService,
        private utilityService: UtilityService,
        private _userService: UserService,
        private _mappingService: MappingService,
        private _formService: FormService,
        private fb: FormBuilder,
    ) {

        // this._uiService.showSpinner();
        this.roleCode = "facilitator";

        this.user = this._authService.getUser();
        console.log("data", data);
        if (data && data.doctor && data.doctor.id) {
            this.doctorId = data.doctor.id;
            this.doctorUser = data.doctor;
            this.loadAssociatedFacilitator();
        }

        // this.addPermission = this.utilityService.checkUserPermission(this.user, 'add_admin');
        this.assignPermission = true;
        this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.assignPermission, this.isSubmitted, "Submit");


        this.loadFacilitatorUserList();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    refreshFacilitatorUserList() {
        console.log("refreshFacilitatorUserList");
        // if (this.viewRolePermissionListPermission) {
        this.isSpinner = true;
        this.filter = "";
        this.dataSource.filter = null;

        // this.loadPermissionList(this.role);
        // this.loadPermissionListViaOffsetLimit(this.role, 1, 5);
        // }
    }

    loadAssociatedFacilitator() {
        // this._uiService.showSpinner();
        this._userService.getAssociatedFacilitatorAll(this.doctorId).subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                // console.log('get assoc facilitator', res.json().data);
                let array = res.json().data || [];
                console.log('assoc facilitator list:', array);
                var uList = [];
                for (let i = 0; i < array.length; i++) {
                    let u = this._mappingService.mapUser(array[i]);
                    uList.push(u);
                }
                this.assocFacilitatorList = uList;

                if (this.dataSource.data.length > 0 && this.assocFacilitatorList.length > 0) {

                    this.dataSource.data.forEach(row => {
                        this.assocFacilitatorList.forEach(row1 => {
                            if (row1.id == row.id) {
                                this.selection.select(row);
                            }
                        })
                    })

                }

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadFacilitatorUserList_bk() {
        const msg = new Message();
        // this.length = 0;
        this.facilitatorList = [];
        this.dataSource = new MatTableDataSource<User>(this.facilitatorList);
        // if (this.listPagePermission) {
        this.isSpinner = true;

        // this._uiService.showSpinner();


        this._userService.getUsersListAll().subscribe(
            (res) => {
                // this.userList = res.json();
                // this._uiService.hideSpinner();
                let array = res.json().data || [];
                console.log('facilitator list:', array);
                var uList = [];
                for (let i = 0; i < array.length; i++) {
                    if (array[i].RoleCodeName == "facilitator") {
                        let u = this._mappingService.mapUser(array[i]);
                        uList.push(u);
                    }

                }
                this.facilitatorList = uList;

                this.dataSource = new MatTableDataSource<User>(this.facilitatorList);
                this.dataSource.paginator = this.paginator;
                // console.log('user list:', this.userList);

                if (this.dataSource.data.length > 0 && this.assocFacilitatorList.length > 0) {

                    this.dataSource.data.forEach(row => {
                        this.assocFacilitatorList.forEach(row1 => {
                            if (row1.id == row.id) {
                                this.selection.select(row);
                            }
                        })
                    })

                }

                if (this.facilitatorList.length == 0) {
                    msg.msg = 'No Facilitator Found';
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


        // }
        // else {
        //     this.isSpinner = false;
        //     let msg = this._utilityService.permissionMsg();
        //     this._uiService.showToast(msg, '');
        // }
    }

    loadFacilitatorUserList() {
        const msg = new Message();
        // this.length = 0;
        this.facilitatorList = [];
        this.dataSource = new MatTableDataSource<User>(this.facilitatorList);
        // if (this.listPagePermission) {
        this.isSpinner = true;

        // this._uiService.showSpinner();


        this._userService.getUserListViaRole(this.roleCode).subscribe(
            (res) => {
                // this.userList = res.json();
                // this._uiService.hideSpinner();
                let array = res.json().data || [];
                console.log('facilitator list:', array);
                var uList = [];
                for (let i = 0; i < array.length; i++) {
                    let u = this._mappingService.mapUser(array[i]);
                    uList.push(u);
                }
                this.facilitatorList = uList;

                this.dataSource = new MatTableDataSource<User>(this.facilitatorList);
                this.dataSource.paginator = this.paginator;
                // console.log('user list:', this.userList);

                if (this.dataSource.data.length > 0 && this.assocFacilitatorList.length > 0) {

                    this.dataSource.data.forEach(row => {
                        this.assocFacilitatorList.forEach(row1 => {
                            if (row1.id == row.id) {
                                this.selection.select(row);
                            }
                        })
                    })

                }

                if (this.facilitatorList.length == 0) {
                    msg.msg = 'No Facilitator Found';
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


        // }
        // else {
        //     this.isSpinner = false;
        //     let msg = this._utilityService.permissionMsg();
        //     this._uiService.showToast(msg, '');
        // }
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    onSubmit() {
        const msg = new Message;
        // this._uiService.showSpinner();

        console.log("this.selection.selected : ", this.selection.selected);

        if (this.assignPermission) {

            this.isSubmitted = true;
            this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.assignPermission, this.isSubmitted, "Submit");

            this._userService.assignFacilitator(this.doctorUser, this.selection.selected).subscribe(
                (res) => {
                    console.log(res);
                    // this._uiService.hideSpinner();
                    this.isSubmitted = false;
                    this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.assignPermission, this.isSubmitted, "Submit");
                    msg.msg = res.json().message ? res.json().message : 'successfully assign facilitator.';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                    this.dialogRef.close(true);
                },
                (err) => {
                    console.log(err);
                    this.isSubmitted = false;
                    this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.assignPermission, this.isSubmitted, "Submit");
                    // this._uiService.hideSpinner();
                    this._authService.errStatusCheckResponse(err);
                }
            );

        }
        else {
            let msg = this.utilityService.permissionMsg();
            this._uiService.showToast(msg, '');
        }
    }

    // onCancel
    onNoClick(): void {
        this.dialogRef.close(false);
    }
}
