import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { projection } from '@angular/core/src/render3';

import { Message, MessageTypes } from '../../core/models/message';

import { UIService } from '../../core/services/ui/ui.service';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { UtilityService } from '../../core/services/general/utility.service';

import { Config } from '../../config/config';
import { UserService } from '../../core/services/user/user.service';

@Component({
    templateUrl: 'invite.dialog.component.html',
    // styleUrls: ['../activity.detail.component.css']
})
export class InviteDialogComponent implements OnInit {

    title = "Invite";

    email: string = "";
    type: string = "";
    userId: number = null;


    isSubmitted: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<InviteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        private _utilityService: UtilityService,
        private _userService: UserService,
        // private _router: Router, 
        private fb: FormBuilder,
        private _mappingService: MappingService,
    ) {
        // this.cities = data.cities;

        console.log("data in madal ", data);

        // this.project = data.project || new Project();


    }

    ngOnInit() {

    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onYesClick() {

        let result = false;
        const msg = new Message();
        this.isSubmitted = true;

        if (this.email) {

            this._userService.sendInvite(this.email, this.type, this.userId).subscribe(
                (res) => {

                    this.isSubmitted = false;
                    msg.msg = res.json().message ? res.json().message : 'Invitation send successfully';
                    // msg.msg = 'You have successfully added an activity';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                    this.dialogRef.close(true);
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

}