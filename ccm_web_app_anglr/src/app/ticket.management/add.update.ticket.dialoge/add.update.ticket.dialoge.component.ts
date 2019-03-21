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
import { Ticket, Type, Priority } from '../../core/models/ticket';
import { TicketService } from '../../core/services/ticket/ticket.service';


@Component({
    selector: 'add-update-ticket-dialoge',
    templateUrl: 'add.update.ticket.dialog.component.html',
})

export class AddUpdateTicketDialogeComponent {

    tooltipSapId = Config.pattern.sapId.tooltip;
    patternSapId = Config.pattern.sapId.regex;

    tooltipCNIC = Config.pattern.cnic.tooltip;
    patternCNIC = Config.pattern.cnic.regex;   // 42101-1234567-1

    form: FormGroup;

    isSubmited = false;


    user: User = new User();

    fieldType: string = "add";
    ticketId: number = null;
    newTicket: Ticket = new Ticket();

    ticketPriorities: Priority[] = [];
    ticketTypes: Type[] = [];

    isSubmitted = false;
    addPermission = false;
    buttonTooltip = "";

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialogRef: MatDialogRef<AddUpdateTicketDialogeComponent>,
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

        this.fieldType = data.fieldType || this.fieldType;

        console.log("data", data);
        if (data && data.ticket && data.ticket.id) {
            this.ticketId = data.ticket.id;
            this.loadTicketDetail();
        }

        // this.addPermission = this.utilityService.checkUserPermission(this.user, 'add_admin');
        this.addPermission = true;
        this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");

        this.form = fb.group({

            'title': [this.newTicket.title, Validators.compose([Validators.required])],
            'description': [this.newTicket.description, Validators.compose([Validators.required])],
            'priority': [this.newTicket.priority, Validators.compose([Validators.required])],
            'type': [this.newTicket.type, Validators.compose([])],
            'otherType': [this.newTicket.otherType, Validators.compose([])]
        });

        this.loadPriority();
        this.loadType();
    }

    loadPriority() {
        // this._uiService.showSpinner();
        this._setupService.getPriorityList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get priorities', res.json().data);

                // let array = res.json().data || [];
                // var uList = [];
                // for (let i = 0; i < array.length; i++) {
                //     let u = this._mappingService.mapTicket(array[i]);
                //     uList.push(u);
                // }
                // this.ticketPriorities = uList;

                let array = res.json().data || null;
                var pList = [];
                if (array) {
                    for (let key in array) {
                        let p: Priority = new Priority();
                        p.name = array[key];
                        p.code = key;
                        pList.push(p);
                        // console.log('key: ' + key + ',  value: ' + array[key]);
                    }
                }

                this.ticketPriorities = pList;
                console.log('ticketPriorities: ' + this.ticketPriorities);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
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

    loadTicketDetail() {
        // this._uiService.showSpinner();
        this._setupService.getTypeList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get ticket', res.json().data);
                this.newTicket = this._mappingService.mapTicket(res.json().data);

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
            if (this.form.valid) {

                this.isSubmitted = true;
                this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");

                this._ticketService.createTicket(this.newTicket).subscribe(
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
