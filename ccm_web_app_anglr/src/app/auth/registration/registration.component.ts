import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs';

import { AuthService } from '../../core/services/auth/auth.service';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { UserService } from '../../core/services/user/user.service';

import { Message, MessageTypes } from '../../core/models/message';
import { User } from '../../core/models/user';
import { Role } from '../../core/models/role';
import { Country } from '../../core/models/country';
import { Region } from '../../core/models/region';
import { City } from '../../core/models/city';
import { Branch } from '../../core/models/branch';




import { Config } from '../../config/config';
import { SetupService } from '../../core/services/setup/setup.service';
import { UtilityService } from '../../core/services/general/utility.service';


@Component({
    moduleId: module.id,
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.css']
})
export class RegistrationComponent implements OnInit {

    private _sub: Subscription;

    // patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    tooltipEmail = Config.pattern.email.tooltip;
    patternEmail = Config.pattern.email.regex;   // 42101-1234567-1

    // patternSapId = /^(?=.*\d)(?=.*[a-zA-Z])([a-zA-Z0-9])+$/;
    tooltipSapId = Config.pattern.sapId.tooltip;
    patternSapId = Config.pattern.sapId.regex;

    // passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,20}$/;
    tooltipPassword = Config.pattern.password.tooltip;
    patternPassword = Config.pattern.password.regex;

    phide = true;
    cphide = true;

    token: string = "";
    type: string = "";

    isMatchPass = true;

    isRoleValid = true;
    isCountryValid = true;
    isRegionValid = true;
    isCityValid = true;
    isBranchValid = true;

    roles: Role[] = [];
    countries: Country[] = [];
    regions: Region[] = [];
    cities: City[] = [];
    branches: Branch[] = [];

    user: User = new User();

    successResponse: any;
    errorResponse: any;
    //  disable: boolean = false
    avialableSapId = true;
    avialableEmail = true;

    signin: boolean;

    invitationAccepted = false;
    tokenVerified = false;
    tokenVerifying = false;
    isSubmitted = false;

    formRegister: FormGroup;

    MatchPassword(AC: AbstractControl) {
        const password = AC.get('password').value; // to get value in input tag
        const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (confirmPassword) {
            if (password != confirmPassword) {
                console.log('false');
                AC.get('confirmPassword').setErrors({ matchPassword: true });
            } else {
                console.log('true');
                AC.get('confirmPassword').setErrors(null);
                return null;
            }
        }
    }

    constructor(
        // private _authServices: AuthService,
        @Inject('IAuthService') private _authServices: IAuthService,
        private _router: Router,
        private route: ActivatedRoute,
        private _uiServices: UIService,
        private _utilityServices: UtilityService,
        private _userService: UserService,
        private _setupService: SetupService,
        private fb: FormBuilder
    ) {

        this.formRegister = fb.group({

            'firstName': [this.user.firstName, Validators.compose([Validators.required])],
            'lastName': [this.user.lastName, Validators.compose([Validators.required])],
            'email': [this.user.email, Validators.compose([Validators.required, Validators.email])],
            // 'password': [this.user.password, Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern(this.patternPassword)])],
            'password': [this.user.password, Validators.compose([Validators.required])],
            'confirmPassword': [this.user.confirmPassword, Validators.compose([Validators.required])],
        }, {
                validator: this.MatchPassword // your validation method

                // validator: this.passwordMatcher // your validation method
            }
        );

    }


    ngOnInit(): void {
        // this._authServices.currentMessage.subscribe(value => this.signin = value)
        // let isLoggedIn = this._authServices.checkToken()
        // if (isLoggedIn) {
        //     this._router.navigate(['home']);
        // }


        this._sub = this.route.params.subscribe((params: any) => {

            console.log("test route");

            if (this.route.snapshot.queryParams['token']) {
                this.token = this.route.snapshot.queryParams['token'];
                this.type = this.route.snapshot.queryParams['type'];
                // this._uiServices.hideSpinner();
                // this._utilityServices
                this.checkToken();
            } else {
                this._router.navigate(['/login']);
                // this._uiServices.hideSpinner();
            }
        });

        // this.loadCountries();


    }

    loadCountries() {
        this._setupService.getCountries().subscribe(
            (res) => {
                // this.countries = res.json().genericBody.data.countries;
                this.countries = res.json().data;
            },
            (err) => console.log(err)
        );
    }

    loadRegions(countryId) {
        // this._setupService.getRegionsViaCountryId(this.user.countryId).subscribe(
        this._setupService.getRegionsViaCountryId(countryId).subscribe(
            (res) => {
                // this.regions = res.json().genericBody.data.regions;
                this.regions = res.json().data;
            },
            (err) => console.log(err)
        );
    }

    loadCities(regionId) {
        // this._setupService.getCitiesViaRegionId(this.user.regionId).subscribe(
        this._setupService.getCitiesViaRegionId(regionId).subscribe(
            (res) => {
                // this.cities = res.json().genericBody.data.cities;
                this.cities = res.json().data;
            },
            (err) => console.log(err)
        );
    }

    loadBranches(cityId) {
        // this._setupService.getBranchesViaCityId(this.user.cityId).subscribe(
        this._setupService.getBranchesViaCityId(cityId).subscribe(
            (res) => {
                // this.branches = res.json().genericBody.data.branches;
                this.branches = res.json().data;
            },
            (err) => console.log(err)
        );
    }



    onRoleFocusOut(roleId) {

        // if (this.userForm.userRolePermission.roleId !== +this.user.userRolePermission.roleId) {

        const role = this.roles.filter(r => r.id === +this.user.userRolePermission.roleId);
        // const role = this.roles.filter(r => r.roleId === +roleId);

        if (role.length === 0) {
            // this.isCountryValid = false;
            this.user.userRolePermission.roleId = null;
            // this.userForm.userRolePermission.roleId = this.user.userRolePermission.roleId;

            this.user.userRolePermission.roleName = null;
            // this.userForm.userRolePermission.roleName = this.user.userRolePermission.roleName;
            return;
        }
        // this.isCountryValid = true;
        this.user.userRolePermission.roleId = role[0].id;
        // this.userForm.userRolePermission.roleId = this.user.userRolePermission.roleId;

        this.user.userRolePermission.roleName = role[0].roleName;
        // this.userForm.userRolePermission.roleName = this.user.userRolePermission.roleName;
        // }
    }

    onCountryFocusOut(countryId) {

        // if (this.userForm.countryId !== +this.user.countryId) {
        const country = this.countries.filter(c => c.id === +this.user.countryId);
        // const country = this.countries.filter(c => c.countryId === +countryId);

        this.user.regionId = null;
        this.user.cityId = null;
        this.user.branchId = null;

        this.regions = [];
        this.cities = [];
        this.branches = [];

        if (country.length === 0) {
            // this.isCountryValid = false;
            this.user.countryId = null;
            // this.userForm.countryId = this.user.countryId;

            this.user.country = null;
            // this.userForm.country = this.user.country;
            return;
        }
        // this.isCountryValid = true;
        this.user.countryId = country[0].id;
        // this.userForm.countryId = this.user.countryId;

        // this.user.country = country[0].countryName;
        this.user.country = country[0];
        // this.userForm.country = this.user.country;

        this.loadRegions(this.user.countryId);
        // }
    }

    onRegionFocusOut(regionId) {

        // if (this.userForm.regionId !== +this.user.regionId) {
        const region = this.regions.filter(r => r.id === +this.user.regionId);
        // const region = this.regions.filter(r => r.regionId === +regionId);

        this.user.cityId = null;
        this.user.branchId = null;

        this.cities = [];
        this.branches = [];

        if (region.length === 0) {
            // this.isCountryValid = false;
            this.user.regionId = null;
            // this.userForm.regionId = this.user.regionId;

            this.user.region = null;
            // this.userForm.region = this.user.region;
            return;
        }
        // this.isCountryValid = true;
        this.user.regionId = region[0].id;
        // this.userForm.regionId = this.user.regionId;

        // this.user.region = region[0].regionName;
        this.user.region = region[0];
        // this.userForm.region = this.user.region;

        this.loadCities(this.user.regionId);
        // }
    }

    onCityFocusOut(cityId) {

        // if (this.userForm.cityId !== +this.user.cityId) {

        const city = this.cities.filter(ct => ct.id === +this.user.cityId);

        this.user.branchId = null;
        this.branches = [];

        if (city.length === 0) {
            // this.isCountryValid = false;
            this.user.cityId = null;
            // this.userForm.cityId = this.user.cityId;

            this.user.city = null;
            // this.userForm.city = this.user.city;
            return;
        }
        // this.isCountryValid = true;
        this.user.cityId = city[0].id;
        // this.userForm.cityId = this.user.cityId;

        // this.user.city = city[0].cityName;
        this.user.city = city[0];
        // this.userForm.city = this.user.city;

        this.loadBranches(this.user.cityId);
        // }
    }

    onBranchFocusOut() {
        const branch = this.branches.filter(b => b.id === +this.user.branchId);

        if (branch.length === 0) {
            // this.isCountryValid = false;
            this.user.branchId = null;
            // this.userForm.branchId = this.user.branchId;

            this.user.branch = null;
            // this.userForm.branch = this.user.branch;
            return;
        }
        // this.isCountryValid = true;
        this.user.branchId = branch[0].id;
        // this.userForm.branchId = this.user.branchId;

        // this.user.branch = branch[0].branchName;
        this.user.branch = branch[0];
        // this.userForm.branch = this.user.branch;
    }

    checkToken() {

        const msg = new Message();
        // this._uiServices.showSpinner();
        this.tokenVerifying = true;

        this._authServices.verifyToken(this.token, this.type).subscribe(
            (res) => {
                this.tokenVerifying = false;
                this.tokenVerified = true;

                this.invitationAccepted = true;

                // setTimeout(function () {
                //     console.log("test verified")
                //     this.invitationAccepted = true;
                //     console.log("test invitationAccepted", this.invitationAccepted)
                //     // this.logoutUser(); 
                // }, 5000);

                // this._uiServices.hideSpinner();
                // this._authServices.storeUser(this.userForm);

                msg.msg = res.json() ? res.json().message : 'Token Verify Successfully';
                // msg.msg = 'You have successfully signed up';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiServices.showToast(msg, 'info');

            },
            (err) => {
                console.log(err);
                this.tokenVerifying = false;
                // this._uiServices.hideSpinner();
                // this.isSubmitted = false;
                this._authServices.errStatusCheckResponse(err);
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
            } else if (this.formRegister.controls['email'].hasError('required')) {
                msg.msg = 'Email is required.';
            } else if (this.formRegister.controls['email'].hasError('email')) {
                msg.msg = 'Invalid email address.';
            } else if (this.formRegister.controls['email'].hasError('pattern')) {
                msg.msg = 'Invalid email address.';
            } else if (this.formRegister.controls['password'].hasError('required')) {
                msg.msg = 'Password is required.';
            } else if (this.formRegister.controls['confirmPassword'].hasError('required')) {
                msg.msg = 'Confirm Password is required.';
            } else if (this.formRegister.controls['confirmPassword'].hasError('matchPassword')) {
                msg.msg = 'Confirm Password does not match.';
            } else {
                msg.msg = 'Validation failed.';
            }
            this._uiServices.showToast(msg, '');

        }
        else if (this.formRegister.valid) {
            this.isSubmitted = true;
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._authServices.register(this.user, this.token, this.type).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    // this._authServices.storeUser(this.userForm);

                    msg.msg = res.json() ? res.json().message : 'You have successfully signed up';
                    // msg.msg = 'You have successfully signed up';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiServices.showToast(msg, 'info');

                    // this._router.navigate(['/verification']);
                    this._router.navigate(['/login']);
                },
                (err) => {
                    console.log(err);
                    this.isSubmitted = false;
                    this._authServices.errStatusCheckResponse(err);
                }
            );
        } else {
            // console.log("asd")
            this.validateAllFormFields(this.formRegister);
        }

    }

    validateAllFormFields(formGroup: FormGroup) {         //{1}
        Object.keys(formGroup.controls).forEach(field => {  //{2}
            const control = formGroup.get(field);             //{3}
            if (control instanceof FormControl) {             //{4}
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        //{5}
                this.validateAllFormFields(control);            //{6}
            }
        });
    }

    ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

}
