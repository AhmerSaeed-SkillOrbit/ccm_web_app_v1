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
import { ForumService } from '../../core/services/general/forum.service';
import { Forum } from '../../core/models/forum';


@Component({
    selector: 'add-update-forum-dialoge',
    templateUrl: 'add.update.forum.dialog.component.html',
})

export class AddUpdateForumDialogeComponent {


    formRegister: FormGroup;

    user: User = new User();

    forumId: number = null;
    forum: Forum = new Forum();
    isSubmitted = false;
    addPermission = false;
    buttonTooltip = "";
    type: string = "Add";

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialogRef: MatDialogRef<AddUpdateForumDialogeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _uiService: UIService,
        private utilityService: UtilityService,
        private _userService: UserService,
        private _forumService: ForumService,
        private _mappingService: MappingService,
        private _formService: FormService,
        private fb: FormBuilder,
    ) {

        // this._uiService.showSpinner();

        this.user = this._authService.getUser();
        console.log("data", data);

        this.type = data.type || this.type;
        if (data && data.forum && data.forum.id) {
            this.forumId = data.forum.id;
            this.forum = this.utilityService.deepCopy(data.forum);
            // this.loadForumDetail();
        }

        // this.addPermission = this.utilityService.checkUserPermission(this.user, 'add_admin');
        this.addPermission = true;
        this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");

        this.formRegister = fb.group({

            'title': [this.forum.title, Validators.compose([Validators.required])],
            'description': [this.forum.description, Validators.compose([])]
        });

        // this.loadCountries();
    }

    loadForumDetail() {
        // this._uiService.showSpinner();
        // this._forumService.getUserById(this.forumId).subscribe(
        //     (res) => {
        //         // this._uiService.hideSpinner();
        //         console.log('get user', res.json().data);
        //         this.newUser = this._mappingService.mapUser(res.json().data);

        //     },
        //     (err) => {
        //         console.log(err);
        //         // this._uiService.hideSpinner();
        //         this._authService.errStatusCheckResponse(err);
        //     }
        // );
    }

    onSubmit() {
        const msg = new Message;
        // this._uiService.showSpinner();

        if (this.addPermission) {
            if (this.formRegister.valid) {

                if (this.forum && this.forum.id && this.forum != null) {

                    this.isSubmitted = true;
                    this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");

                    this._forumService.updateForumTopic(this.forum).subscribe(
                        (res) => {
                            console.log(res);
                            // this._uiService.hideSpinner();
                            this.isSubmitted = false;
                            this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");
                            msg.msg = res.json().message ? res.json().message : 'Forum Topic updated successfully.';
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

                    this.isSubmitted = true;
                    this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");

                    this._forumService.createForumTopic(this.forum).subscribe(
                        (res) => {
                            console.log(res);
                            // this._uiService.hideSpinner();
                            this.isSubmitted = false;
                            this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");
                            msg.msg = res.json().message ? res.json().message : 'Forum Topic added successfully.';
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


            }
            else {
                // console.log("asd")
                this._formService.validateAllFormFields(this.formRegister);
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
