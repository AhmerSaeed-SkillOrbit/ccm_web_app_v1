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
import { FormService } from '../../core/services/form/form.service';
import { User } from '../../core/models/user';

@Component({
    templateUrl: 'invite.dialog.component.html',
    // styleUrls: ['../activity.detail.component.css']
})
export class InviteDialogComponent implements OnInit {

    title = "";

    email: string = "";
    countryCode: string = "+1";
    mobileNo: string = "";
    type: string = "";
    userId: number = null;

    user: User = new User();

    inviteForm: FormGroup;

    invitePermission = false;

    isSubmitted: boolean = false;
    buttonTooltip = "";

    constructor(
        public dialogRef: MatDialogRef<InviteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        private _utilityService: UtilityService,
        private _formService: FormService,
        private _userService: UserService,
        // private _router: Router, 
        private fb: FormBuilder,
        private _mappingService: MappingService,
    ) {
        // this.cities = data.cities;

        console.log("data in madal ", data);
        this.type = data.type;
        this.user = data.user || new User();
        this.userId = this.user.id;

        if (this.type == "superadmin_doctor") {
            this.title = "Doctor";
        }
        else if (this.type == "doctor_patient") {
            this.title = "Patient";
        }
        // this.project = data.project || new Project();

        // this.invitePermission = this.utilityService.checkUserPermission(this.user, 'add_admin');
        this.invitePermission = true;
        this.buttonTooltip = this._utilityService.getUserPermissionTooltipMsg(this.invitePermission, this.isSubmitted, "Submit");

        this.inviteForm = fb.group({
            'email': [this.email, Validators.compose([Validators.required, Validators.email])],
            'phoneCode': [this.email, Validators.compose([Validators.required])],
            'mobileNumber': [this.mobileNo, Validators.compose([Validators.required])]
        });


    }

    ngOnInit() {

    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    sentInvite() {

        let result = false;
        const msg = new Message();
        this.isSubmitted = true;
        if (this.invitePermission) {
            if (this.inviteForm.valid) {
                if (this.email) {

                    this._userService.sendInvite(this.email, this.mobileNo, this.countryCode, this.type, this.userId).subscribe(
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
            else {
                // console.log("asd")
                this._formService.validateAllFormFields(this.inviteForm);
            }
        }
        else {
            let msg = this._utilityService.permissionMsg();
            this._uiService.showToast(msg, '');
        }
    }

}