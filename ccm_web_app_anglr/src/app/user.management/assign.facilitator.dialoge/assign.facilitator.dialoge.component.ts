import { Component, Input, OnInit, Inject, OnChanges, Output, EventEmitter, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { PageEvent, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

    userId: number = null;
    newUser: User = new User();
    isSubmitted = false;
    addPermission = false;
    buttonTooltip = "";

    facilitatorList: User[] = [];

    displayedColumns = ['sNo', 'facilitatorName', 'action'];
    dataSourceTwo = new MatTableDataSource<User>(this.facilitatorList);

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

        this.user = this._authService.getUser();
        console.log("data", data);
        // if (data && data.user && data.user.id) {
        //     this.userId = data.user.id;
        //     this.loadUserDetail();
        // }

        // this.newUser.roleId = 1;
        this.newUser.roleId = data.roleId;
        // this.newUser.roleCode = "superadmin_doctor";
        // this.newUser.roleCode = data.roleCode;
        this.newUser.role.roleCode = data.roleCode;

        // this.addPermission = this.utilityService.checkUserPermission(this.user, 'add_admin');
        this.addPermission = true;
        this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");


        // this.loadCountries();
    }

    loadUserDetail() {
        // this._uiService.showSpinner();
        this._userService.getUserById(this.userId).subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get user', res.json().data);
                this.newUser = this._mappingService.mapUser(res.json().data);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            }
        );
    }

    onSubmit() {
        const msg = new Message;
        // this._uiService.showSpinner();

        if (this.addPermission) {

            this.isSubmitted = true;
            this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");

            this._userService.addUser(this.newUser).subscribe(
                (res) => {
                    console.log(res);
                    // this._uiService.hideSpinner();
                    this.isSubmitted = false;
                    this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");
                    msg.msg = res.json().message ? res.json().message : 'User added successfully.';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                    this.dialogRef.close(true);
                },
                (err) => {
                    console.log(err);
                    this.isSubmitted = false;
                    this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");
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
