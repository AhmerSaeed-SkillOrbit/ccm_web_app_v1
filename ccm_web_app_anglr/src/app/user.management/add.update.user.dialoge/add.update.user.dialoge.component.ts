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


@Component({
    selector: 'add-update-user-dialoge',
    templateUrl: 'add.update.user.dialog.component.html',
})

export class AddUpdateUserDialogeComponent {

    tooltipSapId = Config.pattern.sapId.tooltip;
    patternSapId = Config.pattern.sapId.regex;

    tooltipCNIC = Config.pattern.cnic.tooltip;
    patternCNIC = Config.pattern.cnic.regex;   // 42101-1234567-1

    formRegister: FormGroup;

    isSubmited = false;
    regions: Region[] = [];
    countries: Country[] = [];

    user: User = new User();

    userId: number = null;
    newUser: User = new User();
    isSubmitted = false;
    addPermission = false;
    buttonTooltip = "";

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialogRef: MatDialogRef<AddUpdateUserDialogeComponent>,
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
        if (data && data.user && data.user.id) {
            this.userId = data.user.id;
            this.loadUserDetail();
        }

        // this.newUser.roleId = 1;
        this.newUser.roleId = data.roleId;
        // this.newUser.roleCode = "superadmin_doctor";
        // this.newUser.roleCode = data.roleCode;
        this.newUser.role.roleCode = data.roleCode;

        // this.addPermission = this.utilityService.checkUserPermission(this.user, 'add_admin');
        this.addPermission = true;
        this.buttonTooltip = this.utilityService.getUserPermissionTooltipMsg(this.addPermission, this.isSubmitted, "Submit");

        this.formRegister = fb.group({

            'firstName': [this.newUser.firstName, Validators.compose([Validators.required])],
            'lastName': [this.newUser.lastName, Validators.compose([Validators.required])],
            'email': [this.newUser.email, Validators.compose([Validators.required, Validators.email])],
            'mobileNumber': [this.newUser.mobileNumber, Validators.compose([])],
            'telephoneNumber': [this.newUser.phoneNumber, Validators.compose([])],
            'officeAddress': [this.newUser.officeAddress, Validators.compose([])],
            'residentialAddress': [this.newUser.residentialAddress, Validators.compose([])],
            'gender': [this.newUser.gender, Validators.compose([])],
            'functionalTitle': [this.newUser.functionalTitle, Validators.compose([])],
            'age': [this.newUser.age, Validators.compose([])],
            'ageGroup': [this.newUser.ageGroup, Validators.compose([])],
        });

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

    cnicFunction(event) {
        console.log("cnicFunction");

        if (event.keyCode == 8 || event.keyCode == 9
            || event.keyCode == 27 || event.keyCode == 13
            || (event.keyCode == 65 && event.ctrlKey === true))
            return;
        // if ((event.keyCode < 48 || event.keyCode > 57))
        if ((event.keyCode < 48) || (event.keyCode > 57 && event.keyCode < 96) || (event.keyCode > 105))
            event.preventDefault();

        var length = this.newUser.cnic ? this.newUser.cnic.length : 0;

        if (length == 5 || length == 13)
            this.newUser.cnic = this.newUser.cnic + '-';
        // $(this).val($(this).val() + '-');

    }

    onSubmit() {
        const msg = new Message;
        // this._uiService.showSpinner();

        if (this.addPermission) {
            if (this.formRegister.valid) {

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
