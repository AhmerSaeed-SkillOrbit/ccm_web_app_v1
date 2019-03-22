import { Component, Input, OnInit, Inject, OnChanges, Output, EventEmitter, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { PageEvent } from '@angular/material';
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
import { SetupService } from '../../core/services/setup/setup.service';
import { Ticket, Type, Priority, TicketAssignee } from '../../core/models/ticket';
import { TicketService } from '../../core/services/ticket/ticket.service';


@Component({
    selector: 'assign-ticket-dialoge',
    templateUrl: 'assign.ticket.dialog.component.html',
})

export class AssignTicketDialogeComponent {

    tooltipSapId = Config.pattern.sapId.tooltip;
    patternSapId = Config.pattern.sapId.regex;

    tooltipCNIC = Config.pattern.cnic.tooltip;
    patternCNIC = Config.pattern.cnic.regex;   // 42101-1234567-1

    form: FormGroup;

    isSubmited = false;

    user: User = new User();
    userList: User[] = [];

    ticketId: number = null;
    ticket: Ticket = new Ticket();
    newTicketAssignee: TicketAssignee = new TicketAssignee();

    ticketPriorities: Priority[] = [];
    ticketTypes: Type[] = [];

    isSubmitted = false;
    addPermission = false;
    buttonTooltip = "";

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialogRef: MatDialogRef<AssignTicketDialogeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _uiService: UIService,
        private utilityService: UtilityService,
        private _userService: UserService,
        private _ticketService: TicketService,
        private _setupService: SetupService,
        private _mappingService: MappingService,
        private _formService: FormService,
        private fb: FormBuilder,
    ) {

        // this._uiService.showSpinner();

        this.user = this._authService.getUser();

        // this.newTicket = data.ticket || this.newTicket;

        console.log("data", data);
        if (data && data.ticket && data.ticket.id) {
            this.ticketId = data.ticket.id;
            this.ticket = this.utilityService.deepCopy(data.ticket);
        }

        // this.addPermission = this.utilityService.checkUserPermission(this.user, 'add_admin');
        this.addPermission = true;
        this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");

        this.form = fb.group({

            'assignTo': [this.newTicketAssignee.assignToId, Validators.compose([Validators.required])],
            'description': [this.newTicketAssignee.assignByDescription, Validators.compose([Validators.required])]
        });

        this.loadSupportStaff();
    }

    loadSupportStaff() {
        const msg = new Message();
        this.userList = [];
        // this.isSpinner = true;

        // this._uiService.showSpinner();

        this._userService.getUserListViaRole("support_staff").subscribe(
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

                // if (this.userList.length == 0) {
                //     msg.msg = 'No Users Found';
                //     msg.msgType = MessageTypes.Information;
                //     msg.autoCloseAfter = 400;
                //     this._uiService.showToast(msg, 'info');
                // }
                // this.isSpinner = false;

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
                // this.isSpinner = false;
            }
        );
    }

    loadType() {
        // this._uiService.showSpinner();
        this._setupService.getTypeList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get type', res.json().data);

                // let array = res.json().data || [];
                // var uList = [];
                // for (let i = 0; i < array.length; i++) {
                //     let u = this._mappingService.mapTicket(array[i]);
                //     uList.push(u);
                // }
                // this.ticketTypes = uList;

                let array = res.json().data || null;
                var tList = [];
                if (array) {
                    for (let key in array) {
                        let t: Type = new Type();
                        t.name = array[key];
                        t.code = key;
                        tList.push(t);
                        // console.log('key: ' + key + ',  value: ' + array[key]);
                    }
                }

                this.ticketTypes = tList;

                console.log('ticketTypes: ' + this.ticketTypes);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    onPrioritySelect(event) {
        // this.employee.regionId = null;
        // this.loadRegions(event.value);


    }


    onDescriptionFocusOut() {

    }

    onSubmit() {
        const msg = new Message;
        // this._uiService.showSpinner();

        if (this.addPermission) {
            if (this.form.valid) {

                this.isSubmitted = true;
                this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");

                this._ticketService.assignTicket(this.newTicketAssignee, this.ticket).subscribe(
                    (res) => {
                        console.log(res);
                        // this._uiService.hideSpinner();
                        this.isSubmitted = false;
                        this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");
                        msg.msg = res.json().message ? res.json().message : 'Ticket assigned successfully.';
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
                console.log("this.form", this.form)
                this._formService.validateAllFormFields(this.form);
            }
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
