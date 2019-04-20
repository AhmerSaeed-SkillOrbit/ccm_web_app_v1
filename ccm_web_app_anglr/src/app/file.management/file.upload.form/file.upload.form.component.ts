import { Component, Input, OnInit, Inject, OnChanges, Output, EventEmitter, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, FormArray } from "@angular/forms";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';

// import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';

import { Message, MessageTypes } from '../../core/models/message';
import { User } from '../../core/models/user';

import { UIService } from '../../core/services/ui/ui.service';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { Region } from '../../core/models/region';
import { Country } from '../../core/models/country';
import { GenericFileUpload } from '../../core/models/genericFileUpload';

import { SetupService } from '../../core/services/setup/setup.service';
import { LogService } from '../../core/services/log/log.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { FormService } from '../../core/services/form/form.service';
import { FileService } from '../../core/services/file/file.service';
import { Config } from '../../config/config';
import { UserService } from '../../core/services/user/user.service';

// import { ReportService } from '../../core/services/report/report.service';


@Component({
    selector: 'file-upload-form',
    templateUrl: 'file.upload.form.component.html',
    // styleUrls: [],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})
export class FileUploadFormComponent implements OnInit, OnChanges, OnDestroy {

    user: User = new User;
    // country = new CountryInfo();
    isLogin: boolean;
    private ngUnsubscribe: Subject<any> = new Subject();

    addPermission = false;
    updatePermission = false;

    isSubmitted = false;
    isSpinner = false;

    fileUploadId: number = null;
    fileUpload: GenericFileUpload = new GenericFileUpload();
    selectedFile: File = null;

    fileUploadFormGroup: FormGroup;


    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private _utilityService: UtilityService,
        private _mappingService: MappingService,
        private route: ActivatedRoute, private _router: Router,
        private _setupService: SetupService,
        private _userService: UserService,
        // private _router: Router,
        private _formService: FormService,
        private _formBuilder: FormBuilder,
        private _fileService: FileService,
        private datePipe: DatePipe,
        public dialog: MatDialog,
    ) {

        const id = this.route.snapshot.params['id'];

        this.fileUploadId = id;

        this.fileUploadFormGroup = this._formBuilder.group({
            'file': ["", Validators.compose([Validators.required])],
            'purpose': ["", Validators.compose([])],
        });


    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        // check if a user is logged in
        this.isLogin = this._authService.isLoggedIn();
        // if (!this._authService.isLoggedIn()) {
        //     this._router.navigateByUrl('login');
        // }


        if (this.isLogin) {

            if (this.fileUploadId) {
                this.loadFileUpload();
            }

        }

        // this.preFileListPermission = this.utilityService.checkUserPermission(this.user, 'settlement_prefiling_list');
        // if (this.preFileListPermission) {
        //     this.addPermission = this.utilityService.checkUserPermission(this.user, 'settlement_prefiling_add');
        //     this.updatePermission = this.utilityService.checkUserPermission(this.user, 'settlement_prefiling_update');
        //     this.loadPrefileList();
        // }
        // else {
        //     this._router.navigate(['/permission']);
        // }


    }

    ngAfterViewInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {

    }



    loadFileUpload() {

        this._uiService.showSpinner();

        this._fileService.getSingleGeneralFile(this.fileUploadId).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data;
                console.log('u Object', array);

                this.fileUpload = this._mappingService.mapGenericFileUpload(array);


                // this.ccmPlan = this._utilityService.deepCopy(ccmPlan);
                // console.log('ccmPlan', ccmPlan);
                // console.log('this.ccmPlan', this.ccmPlan);

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }


    changeProfilePic(event) {
        console.log("changeProfilePic");
        console.log(event);

        this.selectedFile = <File>event.target.files[0];

    }

    onSubmitFileUpload() {
        const msg = new Message();
        // this.scrollTo(0,0,0)
        // this.isSubmitted = !this.isSubmitted;

        console.log("selectedFile ", this.selectedFile);

        if (this.fileUploadFormGroup.valid) {


            this.isSubmitted = true;
            this._uiService.showSpinner();
            // this.isSubmitStarted = true;
            this._fileService.saveGenericFile(this.fileUpload, this.selectedFile).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    // this._authServices.storeUser(this.userForm);

                    msg.msg = res.json() ? res.json().message : 'Plan Updated Successfully';

                    this._router.navigate(['/file/upload/fu/list']);
                    // msg.msg = 'You have successfully signed up';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');

                },
                (err) => {
                    console.log(err);
                    this.isSubmitted = false;
                    this._uiService.hideSpinner();
                    this._authService.errStatusCheckResponse(err);
                }
            );


        } else {
            // console.log("asd")
            this._formService.validateAllFormFields(this.fileUploadFormGroup);

            msg.msg = 'Validation Failed';
            // msg.msg = 'You have successfully signed up';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
        }

    }


    ngOnDestroy() {
        this.ngUnsubscribe.unsubscribe();
    }

}



