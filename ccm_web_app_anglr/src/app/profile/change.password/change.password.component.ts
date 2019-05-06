import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Message, MessageTypes } from '../../core/models/message';

import { UserService } from '../../core/services/user/user.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { FormService } from '../../core/services/form/form.service';

import { Config } from '../../config/config';

declare var libraryVar: any;

@Component({
    selector: 'change-password',
    moduleId: module.id,
    templateUrl: 'change.password.component.html',
    // styleUrls: ['invite.doctor.component.css']
})
export class ChangePasswordComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    isLogin: any;

    userId: number = null;

    phide = true;
    nphide = true;
    cphide = true;

    currentPass: string = '';
    newPass: string = '';
    confirmPass: string = '';


    isSpinner = false;

    userEditPermission = false;

    isSubmitted: boolean = false;

    private ngUnsubscribe: Subject<any> = new Subject();

    @ViewChild('f') myForm;

    formRegister: FormGroup;

    passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,20}$/

    passwordMatcher = (control: AbstractControl): { [key: string]: boolean } => {
        const password = control.get('newPassword');
        const confirmPassword = control.get('confirmPassword');
        if (!password || !confirmPassword) return null;
        return password.value === confirmPassword.value ? null : { nomatch: true };
        // if (password != confirmPassword) {
        //     console.log('false');
        //     control.get('confirmPassword').setErrors({ MatchPassword: true })
        // } else {
        //     console.log('true');
        //     return null
        // }
    };

    matchPassword(AC: AbstractControl) {
        let password = AC.get('newPassword').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (confirmPassword) {
            if (password != confirmPassword) {
                console.log('false');
                AC.get('confirmPassword').setErrors({ matchPassword: true });
            } else {
                console.log('true');
                AC.get('confirmPassword').setErrors(null)
                return null
            }
        }

    }

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private _userService: UserService,
        private _mappingService: MappingService,
        private _utilityService: UtilityService,
        private _formService: FormService,
        private route: ActivatedRoute, private _router: Router,
        private fb: FormBuilder
    ) {
        this.currentURL = window.location.href;

        this.formRegister = fb.group({
            'currentPassword': [this.currentPass, Validators.compose([Validators.required])],
            'newPassword': [this.newPass, Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern(this.passwordPattern)])],
            'confirmPassword': [this.confirmPass, Validators.compose([Validators.required, this.passwordMatcher])],
        }
            , {
                validator: this.matchPassword // your validation method
                // validator: this.passwordMatcher // your validation method
            }
        );
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();

        // const id = this.route.snapshot.params['id'];

        // console.log('this.isLogin', this.isLogin);

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {


            // this.userEditPermission = this.utilityService.checkUserPermission(this.user, 'user_list');
            this.userEditPermission = true;

            // if (this.user.department.departmentCode == "admin") {
            //     this._router.navigate(['/home/admin']);
            // }
            // else {
            //     // this._router.navigate(['/home/other']);
            // }
        }

    }

    onCurrentPasswordFocusOut() {
        this.currentPass = (this.currentPass && this.currentPass.length > 0 ? this.currentPass.trim() : this.currentPass);
    }

    onNewPasswordFocusOut() {
        this.newPass = (this.newPass && this.newPass.length > 0 ? this.newPass.trim() : this.newPass);
    }

    onConfirmPasswordFocusOut() {
        this.confirmPass = (this.confirmPass && this.confirmPass.length > 0 ? this.confirmPass.trim() : this.confirmPass);
    }


    onSubmit() {
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.formRegister.invalid) {
            const msg = new Message();
            msg.title = '';
            msg.iconType = '';


            if (this.formRegister.controls['currentPassword'].hasError('required')) {
                msg.msg = 'Current Password is required.';
            } else if (this.formRegister.controls['newPassword'].hasError('required')) {
                msg.msg = 'New Password is required.';
            } else if (this.formRegister.controls['confirmPassword'].hasError('required')) {
                msg.msg = 'Confirm Password is required.';
            } else if (this.formRegister.controls['confirmPassword'].hasError('matchPassword')) {
                msg.msg = 'Confirm Password does not match.';
            }
            else {
                msg.msg = 'Validation failed.';
            }
            this._uiService.showToast(msg, '');

        }
        else if (this.formRegister.valid) {
            this.isSubmitted = true;
            // this.isSubmitStarted = true;
            const msg = new Message();

            this._userService.updateUserPassword(this.user.id, this.currentPass, this.newPass).subscribe(
                (res) => {
                    this.isSubmitted = false;

                    // this.currentPass = "";
                    // this.newPass = "";
                    // this.confirmPass = "";
                    this.myForm.resetForm();
                    // this.successMsg = res.json();
                    // this.successMsg = "Updated Successfully . Now you may login \n Redirecting...";

                    msg.msg = (res.json() ? res.json().message : 'Successfully Updated Password');
                    // msg.msg = 'Successfully Updated Password';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                },
                (err) => {
                    this.isSubmitted = false;
                    console.log("err ", err);
                    this._authService.errStatusCheck(err);
                }
            );

        } else {
            // console.log("asd")
            this._formService.validateAllFormFields(this.formRegister);
        }

    }


    onlogOut() {

        let redirectUrl = 'login';
        this._authService.logoutUser();

        this.isUser = this._authService.getUser();
        if (this.isUser) {
            return;
        } else {
            this._router.navigate([redirectUrl]);
        }
    }


}
