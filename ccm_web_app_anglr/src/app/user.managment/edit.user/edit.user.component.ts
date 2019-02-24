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
// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';

declare var libraryVar: any;

@Component({
    selector: 'edit-user',
    moduleId: module.id,
    templateUrl: 'edit.user.component.html',
    // styleUrls: ['invite.doctor.component.css']
})
export class EditUserComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    isLogin: any;


    newUser: User = new User();
    userId: number = null;

    isSpinner = false;

    userEditPermission = false;

    isSubmitted: boolean = false;

    private ngUnsubscribe: Subject<any> = new Subject();

    formRegister: FormGroup;

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

            'firstName': [this.newUser.firstName, Validators.compose([Validators.required])],
            'lastName': [this.newUser.lastName, Validators.compose([Validators.required])],
            'email': [this.newUser.email, Validators.compose([])],
            'mobileNumber': [this.newUser.mobileNumber, Validators.compose([])],
            'telephoneNumber': [this.newUser.phoneNumber, Validators.compose([])],
            'officeAddress': [this.newUser.officeAddress, Validators.compose([])],
            'residentialAddress': [this.newUser.residentialAddress, Validators.compose([])],
            'gender': [this.newUser.gender, Validators.compose([])],
            'functionalTitle': [this.newUser.functionalTitle, Validators.compose([])],
            'age': [this.newUser.age, Validators.compose([])],
            'ageGroup': [this.newUser.ageGroup, Validators.compose([])],
        });
        this.formRegister.get('email').disable();
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        console.log('this.user', this.user);
        this.isLogin = this._authService.isLoggedIn();
        const id = this.route.snapshot.params['id'];
        // console.log('this.isLogin', this.isLogin);

        if (!this.isLogin) {
            // this._router.navigateByUrl('login');
        } else {

            this.userId = id;
            this.loadUserById();

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

    loadUserById() {
        this._uiService.showSpinner();

        this._userService.getUserById(this.userId).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                const user = res.data;
                console.log('u Object', user);
                // this.newUser = user;
                this.newUser = this._mappingService.mapUser(user);
                console.log('newUser', this.newUser);
                // this.userId = this.user.id;
            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            }
        );
    }


    onSubmit() {
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.formRegister.invalid) {
            const msg = new Message();
            msg.title = '';
            msg.iconType = '';


            if (this.formRegister.controls['firstName'].hasError('required')) {
                msg.msg = 'First Name is required.';
            } else if (this.formRegister.controls['lastName'].hasError('required')) {
                msg.msg = 'Last Name is required.';
            } else {
                msg.msg = 'Validation failed.';
            }
            this._uiService.showToast(msg, '');

        }
        else if (this.formRegister.valid) {
            this.isSubmitted = true;
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._userService.updateUser(this.newUser).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    // this._authServices.storeUser(this.userForm);

                    msg.msg = res.json() ? res.json().message : 'Record Updated Successfully';
                    // msg.msg = 'You have successfully signed up';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');

                },
                (err) => {
                    console.log(err);
                    this.isSubmitted = false;
                    this._authService.errStatusCheckResponse(err);
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
