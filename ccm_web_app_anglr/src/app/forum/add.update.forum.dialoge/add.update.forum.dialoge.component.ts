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
import { ForumService } from '../../core/services/forum/forum.service';
import { ForumFeed } from '../../core/models/forum';
import { SetupService } from '../../core/services/setup/setup.service';
import { Tag } from '../../core/models/tag';


@Component({
    selector: 'add-update-forum-dialoge',
    templateUrl: 'add.update.forum.dialog.component.html',
})

export class AddUpdateForumDialogeComponent {


    formRegister: FormGroup;

    user: User = new User();

    forumId: number = null;
    forum: ForumFeed = new ForumFeed();
    tag: Tag = new Tag();
    tagList: Tag[] = [];
    isSubmitted = false;
    isAddNewTag = false;
    addPermission = false;
    addTagPermission = false;
    buttonTooltip = "";
    type: string = "Add";

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialogRef: MatDialogRef<AddUpdateForumDialogeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _uiService: UIService,
        private utilityService: UtilityService,
        private _userService: UserService,
        private _setupService: SetupService,
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

        // this.addTagPermission = this.utilityService.checkUserPermission(this.user, 'add_admin');
        this.addTagPermission = true;
        // this.addPermission = this.utilityService.checkUserPermission(this.user, 'add_admin');
        this.addPermission = true;
        this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");

        this.formRegister = fb.group({

            'title': [this.forum.title, Validators.compose([Validators.required])],
            'description': [this.forum.description, Validators.compose([])]
        });

        // this.loadCountries();
        this.loadTags();
    }

    loadTags() {
        // console.log("loadLC");
        // if (this.branchListPermission) {

        this._setupService.getTags().subscribe(
            (res) => {
                console.log("res", res);

                this.tagList = [];


                let array = res.json().data;
                // console.log('res list:', array);

                var rtList = [];

                for (let i = 0; i < array.length; i++) {
                    let u = this._mappingService.mapTag(array[i]);
                    rtList.push(u);
                }
                this.tagList = rtList;
                setTimeout(() => {
                    this.checkTagSelect();
                }, 10);



                // if (this.lcUsers.length == 0) {
                //     msg.msg = 'No Branchs Found';
                //     msg.msgType = MessageTypes.Information;
                //     msg.autoCloseAfter = 400;
                //     this._uiService.showToast(msg, 'info');
                // }
                // this.isSpinner = false;
            },
            (err) => {
                console.log(err);
            }
        );
        // }
    }

    checkTagSelect() {
        console.log("checkTagSelect");
        // console.log("this.contract.contractTagIds", this.forum.contractTagIds);
        console.log("this.forum.tagIds", this.forum.tagIds);
        console.log("this.tagList", this.tagList);


        this.forum.tagIds.forEach(element => {
            this.tagList.forEach((element1, index) => {
                if (element == element1.id) {
                    console.log("match");
                    this.tagList[index].isSelected = true;
                }

            });
        });
        console.log("this.tagList", this.tagList);
    }

    addTag() {
        console.log("addTag");
        const msg = new Message();

        // if (this.isAddNewTag == true) {

        if (this.addTagPermission) {

            if (this.tag.name && this.tag.name != "" && this.tag.name != null) {
                this.isAddNewTag = true;

                this._setupService.addTag(this.tag).subscribe(
                    (res) => {
                        console.log("res", res);
                        this.isAddNewTag = false;
                        this.tag = new Tag();

                        // console.log("success");
                        // msg.msg = res.json() ? res.json().message : "Tag successfully Submitted.";
                        // msg.msgType = MessageTypes.Information;
                        // msg.autoCloseAfter = 400;
                        // this._uiService.showToast(msg, 'info');
                        this.loadTags();
                    },
                    (err) => {
                        this.isAddNewTag = false;
                        console.log("err", err);
                        this._authService.errStatusCheckResponse(err);
                    }
                );
            }
            else {
                msg.msg = "Field is empty.";

                // this.advisoryForm.id = res.json() ? res.json().data : 0;
                msg.msgType = MessageTypes.Error;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, '');
            }
        }
        else {
            let msg = this.utilityService.permissionMsg();
            this._uiService.showToast(msg, '');
        }

        // } else {
        //     this.loadTags();
        // }
    }

    onClickTag(tag: Tag) {

        // if (!this.isAssignQueryFormDisabled) {
        tag.isSelected = !tag.isSelected;
        if (tag.isSelected) {
            this.forum.tagIds.push(tag.id);
            this.forum.tags.push(tag);
        }
        else {
            let indexId = this.forum.tagIds.findIndex(rtId => rtId === tag.id);
            let index = this.forum.tags.findIndex(rt => rt.id === tag.id);
            // console.log("indexId", indexId);
            // console.log("index", index);

            this.forum.tagIds.splice(indexId, 1);
            this.forum.tags.splice(index, 1);
        }
        // }


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
