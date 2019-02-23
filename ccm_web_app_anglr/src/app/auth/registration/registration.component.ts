import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

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


@Component({
    moduleId: module.id,
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.css']
})
export class RegistrationComponent implements OnInit {

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

    isMatchPass = true;

    isDesignationValid = true;
    isDepartmentValid = true;
    isRoleValid = true;
    isCountryValid = true;
    isRegionValid = true;
    isCityValid = true;
    isBranchValid = true;

    roleCtrl: FormControl;
    countryCtrl: FormControl;
    regionCtrl: FormControl;
    cityCtrl: FormControl;
    branchCtrl: FormControl;

    filteredDesignations: any;
    filteredDepartments: any;
    filteredRoles: any;
    filteredCountries: any;
    filteredRegions: any;
    filteredCities: any;
    filteredBranches: any;

    roles: Role[] = [];
    countries: Country[] = [];
    regions: Region[] = [];
    cities: City[] = [];
    branches: Branch[] = [];

    user: User = new User();
    userForm: User = new User();
    successResponse: any;
    errorResponse: any;
    //  disable: boolean = false
    avialableSapId = true;
    avialableEmail = true;

    signin: boolean;
    isSubmitted = false;

    formRegister: FormGroup;

    // passwordMatcher(password, confirmPassword) {
    //     if (password != confirmPassword) {
    //         this.formRegister.controls.confirmPassword.setErrors({ matchPassword: true });
    //         this.isMatchPass = false;
    //     }
    //     else {
    //         this.isMatchPass = true;
    //         this.formRegister.controls.confirmPassword;
    //     }
    //     console.log("test", this.isMatchPass);

    // };

    // private validateAreEqual(fieldControl: FormControl) {
    //     return fieldControl.value === this.formRegister.get("Password").value ? null : {
    //         NotEqual: true
    //     };
    // }

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
        private _uiServices: UIService,
        private _userService: UserService,
        private _setupService: SetupService,
        private fb: FormBuilder
    ) {

        this.formRegister = fb.group({
            // 'name': [null, Validators.required],
            // 'description': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
            // 'validate': '',
            // 'credentials': new FormControl(this.user.credentials, [Validators.required]),

            'sapId': [this.user.sapId, Validators.compose([Validators.required, Validators.pattern(this.patternSapId)])],
            // 'firstName': [this.user.firstName, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            // 'lastName': [this.user.lastName, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'firstName': [this.user.firstName, Validators.compose([Validators.required])],
            'lastName': [this.user.lastName, Validators.compose([Validators.required])],
            // 'email': [this.user.email, Validators.compose([Validators.required, Validators.email, Validators.pattern(this.patternEmail)])],
            'email': [this.user.email, Validators.compose([Validators.required, Validators.email])],
            // 'title': new FormControl(this.user.title, [Validators.required]),
            // 'mobileNumber': new FormControl(this.user.mobileNumber, [Validators.required, Validators.pattern(this.phonePattern)]),

            'password': [this.user.password, Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern(this.patternPassword)])],
            // 'confirmPassword': [this.user.confirmPassword, Validators.compose([Validators.required, this.passwordMatcher])],
            // 'confirmPassword': [this.user.confirmPassword, Validators.compose([Validators.required])],
            'confirmPassword': [this.user.confirmPassword, Validators.compose([Validators.required])],

            // 'roleId': [this.user.userRolePermission.roleId, Validators.compose([Validators.required])],

            'countryId': [this.user.countryId, Validators.compose([Validators.required])],
            'regionId': [this.user.regionId, Validators.compose([Validators.required])],
            'cityId': [this.user.cityId, Validators.compose([Validators.required])],
            'branchId': [this.user.branchId, Validators.compose([Validators.required])],
        }, {
                validator: this.MatchPassword // your validation method

                // validator: this.passwordMatcher // your validation method
            }
        );

        this.roleCtrl = new FormControl();
        this.filteredRoles = this.roleCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterRoles(name));
        this.countryCtrl = new FormControl();
        this.filteredCountries = this.countryCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterCountries(name));

        this.regionCtrl = new FormControl();
        this.filteredRegions = this.regionCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterRegions(name));

        this.cityCtrl = new FormControl();
        this.filteredCities = this.cityCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterCities(name));

        this.branchCtrl = new FormControl();
        this.filteredBranches = this.branchCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterBranches(name));

    }


    filterRoles(val: string) {
        if (val && val !== '') {
            return this.roles.filter(r => r.roleName.toLowerCase().indexOf(val.toLowerCase()) === 0);
        } else {
            return this.roles;
        }
    }

    filterCountries(val: string) {
        if (val && val !== '') {
            return this.countries.filter(c => c.countryName.toLowerCase().indexOf(val.toLowerCase()) === 0);
        } else {
            return this.countries;
        }
    }

    filterRegions(val: string) {
        if (val && val !== '') {
            return this.regions.filter(r => r.regionName.toLowerCase().indexOf(val.toLowerCase()) === 0);
        } else {
            return this.regions;
        }
    }

    filterCities(val: string) {
        if (val && val !== '') {
            return this.cities.filter(ct => ct.cityName.toLowerCase().indexOf(val.toLowerCase()) === 0);
        } else {
            return this.cities;
        }
    }

    filterBranches(val: string) {
        if (val && val !== '') {
            return this.branches.filter(b => b.branchName.toLowerCase().indexOf(val.toLowerCase()) === 0);
        } else {
            return this.branches;
        }
    }

    signinroute() {
        // this._authServices.signinstatus(true)
        // this._router.navigate(['login']);
        // this.router.navigate(['/login']);
    }

    ngOnInit(): void {
        // this._authServices.currentMessage.subscribe(value => this.signin = value)
        // let isLoggedIn = this._authServices.checkToken()
        // if (isLoggedIn) {
        //     this._router.navigate(['home']);
        // }

        this.loadCountries();


    }



    // loadRoles(departmentId) {
    //     // console.log("test load role", departmentId)
    //     // this._adminSetupService.getRolesViaDepartmentId(this.user.departmentId).subscribe(
    //     this._adminSetupService.getRolesViaDepartmentId(departmentId).subscribe(
    //         (res) => {
    //             // this.roles = res.json().genericBody.data.roles;
    //             this.roles = res.json();

    //             this.filterRoles('');
    //         },
    //         (err) => console.log(err)
    //     );
    // }

    loadCountries() {
        this._setupService.getCountries().subscribe(
            (res) => {
                // this.countries = res.json().genericBody.data.countries;
                this.countries = res.json().data;
                this.filterCountries('');
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
                // console.log('test111', res.json());
                this.filterRegions('');
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

                this.filterCities('');
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

                this.filterBranches('');
            },
            (err) => console.log(err)
        );
    }

    onSapIdFocusOut() {

        // this.userForm.sapId = this.user.sapId
        // if (this.userForm.sapId !== this.user.sapId) {

        this.userForm.sapId = this.user.sapId = (this.user.sapId && this.user.sapId.length > 0 ? this.user.sapId.trim() : this.user.sapId);
        // this.formRegister.controls['sapId'].updateValueAndValidity();
        this.formRegister.get('sapId').updateValueAndValidity();

        setTimeout(() => {

            if (this.user.sapId && this.user.sapId.length > 0 && this.formRegister.controls['sapId'].valid) {
                // this._authServices.checkSapIdAvailability(this.user.email, this.role)
                this._authServices.checkSapIdAvailability(this.user.sapId)
                    .subscribe(
                        // () => this.isEmailAvailable = true,
                        // (err) => this.isEmailAvailable = false
                        (res) => {
                            if (res.json().data) {
                                console.log('sap id is available');
                            } else {
                                console.log('sap id is not available');
                                this.formRegister.controls.sapId.setErrors({ notAvailable: true });
                            }
                        },
                        (err) => {
                            let msg;
                            msg = this._authServices.errStatusCheckResponse(err);
                            // console.log("msg",msg);
                            // this._uiServices.showToast(msg, '');
                            // this.formRegister.controls.email.setErrors({ notAvailable: true });
                            // this.formRegister.controls['email'].setErrors({ notAvailable: true });
                            if (err.status == 404) {

                            } else {
                                // msg = this._authServices.errStatusCheck(err);
                                // this._uiServices.showToast(msg);
                            }
                            // console.log(this.formRegister.controls['email'])
                        }
                    );
            }

        }, 500);

        // }
    }

    onFirstNameFocusOut() {
        this.userForm.firstName = this.user.firstName = (this.user.firstName && this.user.firstName.length > 0 ? this.user.firstName.trim() : this.user.firstName);
    }

    onLastNameFocusOut() {
        this.userForm.lastName = this.user.lastName = (this.user.lastName && this.user.lastName.length > 0 ? this.user.lastName.trim() : this.user.lastName);
    }

    onEmailFocusOut() {

        // this.userForm.email = this.user.email
        // if (this.userForm.email !== this.user.email) {
        this.userForm.email = this.user.email = (this.user.email && this.user.email.length > 0 ? this.user.email.trim() : this.user.email);
        // this.formRegister.controls['email'].updateValueAndValidity();
        this.formRegister.get('email').updateValueAndValidity();

        setTimeout(() => {

            if (this.user.email && this.user.email.length > 0 && this.formRegister.controls['email'].valid) {
                // console.log('test -- 1');
                // this._authServices.checkEmailAvailability(this.user.email, this.role)
                this._authServices.checkEmailAvailability(this.user.email, '')
                    .subscribe(
                        // () => this.isEmailAvailable = true,
                        // (err) => this.isEmailAvailable = false
                        (res) => {
                            if (res.json().data) {
                                console.log('email is available');
                            } else {
                                console.log('email is not available');
                                this.formRegister.controls.email.setErrors({ notAvailable: true });
                            }
                        },
                        (err) => {
                            console.log(err);
                            this._authServices.errStatusCheckResponse(err);
                        }
                    );
            }

        }, 500);

        // }
    }

    onPasswordFocusOut() {
        this.userForm.password = this.user.password;

        // if (this.user.password && this.user.confirmPassword) {
        //     // this.MatchPassword;
        //     this.passwordMatcher(this.user.password, this.user.confirmPassword);
        // }
        // else {
        //     this.isMatchPass = true;
        // }

    }

    onConfirmPasswordFocusOut() {
        this.userForm.confirmPassword = this.user.confirmPassword;

        // if (this.user.password && this.user.confirmPassword) {
        //     // this.MatchPassword;
        //     this.passwordMatcher(this.user.password, this.user.confirmPassword);
        // }
        // else {
        //     this.isMatchPass = true;
        // }
    }


    onRoleFocusOut(roleId) {

        if (this.userForm.userRolePermission.roleId !== +this.user.userRolePermission.roleId) {

            const role = this.roles.filter(r => r.id === +this.user.userRolePermission.roleId);
            // const role = this.roles.filter(r => r.roleId === +roleId);

            if (role.length === 0) {
                // this.isCountryValid = false;
                this.user.userRolePermission.roleId = null;
                this.userForm.userRolePermission.roleId = this.user.userRolePermission.roleId;

                this.user.userRolePermission.roleName = null;
                this.userForm.userRolePermission.roleName = this.user.userRolePermission.roleName;
                return;
            }
            // this.isCountryValid = true;
            this.user.userRolePermission.roleId = role[0].id;
            this.userForm.userRolePermission.roleId = this.user.userRolePermission.roleId;

            this.user.userRolePermission.roleName = role[0].roleName;
            this.userForm.userRolePermission.roleName = this.user.userRolePermission.roleName;
        }
    }

    onCountryFocusOut(countryId) {

        if (this.userForm.countryId !== +this.user.countryId) {
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
                this.userForm.countryId = this.user.countryId;

                this.user.country = null;
                this.userForm.country = this.user.country;
                return;
            }
            // this.isCountryValid = true;
            this.user.countryId = country[0].id;
            this.userForm.countryId = this.user.countryId;

            // this.user.country = country[0].countryName;
            this.user.country = country[0];
            this.userForm.country = this.user.country;

            this.loadRegions(this.user.countryId);
        }
    }

    onRegionFocusOut(regionId) {

        if (this.userForm.regionId !== +this.user.regionId) {
            const region = this.regions.filter(r => r.id === +this.user.regionId);
            // const region = this.regions.filter(r => r.regionId === +regionId);

            this.user.cityId = null;
            this.user.branchId = null;

            this.cities = [];
            this.branches = [];

            if (region.length === 0) {
                // this.isCountryValid = false;
                this.user.regionId = null;
                this.userForm.regionId = this.user.regionId;

                this.user.region = null;
                this.userForm.region = this.user.region;
                return;
            }
            // this.isCountryValid = true;
            this.user.regionId = region[0].id;
            this.userForm.regionId = this.user.regionId;

            // this.user.region = region[0].regionName;
            this.user.region = region[0];
            this.userForm.region = this.user.region;

            this.loadCities(this.user.regionId);
        }
    }

    onCityFocusOut(cityId) {

        if (this.userForm.cityId !== +this.user.cityId) {

            const city = this.cities.filter(ct => ct.id === +this.user.cityId);

            this.user.branchId = null;
            this.branches = [];

            if (city.length === 0) {
                // this.isCountryValid = false;
                this.user.cityId = null;
                this.userForm.cityId = this.user.cityId;

                this.user.city = null;
                this.userForm.city = this.user.city;
                return;
            }
            // this.isCountryValid = true;
            this.user.cityId = city[0].id;
            this.userForm.cityId = this.user.cityId;

            // this.user.city = city[0].cityName;
            this.user.city = city[0];
            this.userForm.city = this.user.city;

            this.loadBranches(this.user.cityId);
        }
    }

    onBranchFocusOut() {
        const branch = this.branches.filter(b => b.id === +this.user.branchId);

        if (branch.length === 0) {
            // this.isCountryValid = false;
            this.user.branchId = null;
            this.userForm.branchId = this.user.branchId;

            this.user.branch = null;
            this.userForm.branch = this.user.branch;
            return;
        }
        // this.isCountryValid = true;
        this.user.branchId = branch[0].id;
        this.userForm.branchId = this.user.branchId;

        // this.user.branch = branch[0].branchName;
        this.user.branch = branch[0];
        this.userForm.branch = this.user.branch;
    }

    onSubmit() {
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        if (this.formRegister.valid) {
            this.isSubmitted = true;
            // this.isSubmitStarted = true;
            const msg = new Message();
            this._authServices.register(this.userForm).subscribe(
                (res) => {
                    // this.onSubmitFinished.emit();
                    // this.isSubmitStarted = false;
                    this.isSubmitted = false;
                    this._authServices.storeUser(this.userForm);
                    // console.log("success");
                    msg.msg = res.json() ? res.json().message : 'You have successfully signed up';
                    // msg.msg = 'You have successfully signed up';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiServices.showToast(msg, 'info');

                    this._router.navigate(['/verification']);
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

    // scrollTo(selector, parentSelector, horizontal) {
    //     scrollTo(
    //         selector,       // scroll to this
    //         parentSelector, // scroll within (null if window scrolling)
    //         horizontal,     // is it horizontal scrolling
    //         0               // distance from top or left
    //     );
    // }

}
