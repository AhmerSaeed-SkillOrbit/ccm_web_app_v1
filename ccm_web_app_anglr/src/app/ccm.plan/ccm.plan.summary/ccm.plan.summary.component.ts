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
import { Permission } from '../../core/models/permission';
import { Region } from '../../core/models/region';
import { Country } from '../../core/models/country';
import { CcmPlan, CcmPlanItem, CcmPlanItemGoal, CcmPlanHealthParam, HealthParam, CcmPlanReview } from '../../core/models/user.ccm.plan';

import { UIService } from '../../core/services/ui/ui.service';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { SetupService } from '../../core/services/setup/setup.service';
import { LogService } from '../../core/services/log/log.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { FormService } from '../../core/services/form/form.service';
import { CcmPlanService } from '../../core/services/ccm.plan/ccm.plan.service';
import { UserService } from '../../core/services/user/user.service';
import { PatientRecordService } from '../../core/services/patient/patient.record.service';


import { Config } from '../../config/config';
// import { ReportService } from '../../core/services/report/report.service';


import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js';
import 'jspdf-autotable';


@Component({
    selector: 'ccm-plan-summary',
    templateUrl: 'ccm.plan.summary.component.html',
    styleUrls: ["../ccm.plan.component.css"],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})
export class CcmPlanSummaryComponent implements OnInit, OnChanges, OnDestroy {

    user: User = new User;
    // country = new CountryInfo();
    isLogin: boolean;
    private ngUnsubscribe: Subject<any> = new Subject();

    userPermissions: Permission[] = [];

    summaryPermission = false;
    generatePDFPermission = false;

    listFilter: string;

    isSubmitted = false;
    isSpinner = false;

    patientId: number = null;
    patient: User = new User;
    planId: number = null;

    ccmPlan: CcmPlan = new CcmPlan();

    healthParamList: HealthParam[] = [];

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private _utilityService: UtilityService,
        private _mappingService: MappingService,
        private _setupService: SetupService,
        private _patientRecordService: PatientRecordService,
        private _userService: UserService,
        // private _router: Router,
        private _formService: FormService,
        private _formBuilder: FormBuilder,
        private _ccmPlanService: CcmPlanService,
        private datePipe: DatePipe,
        public dialog: MatDialog,
        private route: ActivatedRoute, private _router: Router
    ) {

        const paId = this.route.snapshot.params['paId'];

        this.patientId = paId;

        const planId = this.route.snapshot.params['planId'];

        this.planId = planId;

    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.userPermissions = this._authService.getUserPermissions();
        // check if a user is logged in
        this.isLogin = this._authService.isLoggedIn();
        // if (!this._authService.isLoggedIn()) {
        //     this._router.navigateByUrl('login');
        // }


        if (this.isLogin) {

            // this.summaryPermission = this._utilityService.checkUserPermission(this.user, 'ccm_plan_summary_page');
            this.summaryPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'ccm_plan_summary_page');
            // this.summaryPermission = true;
            if (this.summaryPermission) {
                // this.generatePDFPermission = this._utilityService.checkUserPermission(this.user, 'ccm_plan_generate_pdf');
                this.generatePDFPermission = this._utilityService.checkUserPermissionViewPermissionObj(this.userPermissions, 'ccm_plan_generate_pdf');
                // this.generatePDFPermission = true;

                if (this.patientId && this.planId) {
                    this.loadUserById();
                    // this.loadGeneralInfo();
                    this.loadCcmPlan();
                    // this.loadReviewList();
                }

                this.loadHealthParams();

            }
            else {
                // this._router.navigate(['/permission']);
                this._router.navigateByUrl('permission');
            }

        }




    }

    ngAfterViewInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    loadHealthParams() {
        // this._uiService.showSpinner();
        this._setupService.getHealthParamList().subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                console.log('get health param', res.json().data);

                let array = res.json().data || [];
                // console.log('res list:', array);
                var hpList = [];
                for (let i = 0; i < array.length; i++) {
                    let u = this._mappingService.mapHealthParam(array[i]);
                    hpList.push(u);
                }
                this.healthParamList = hpList;

                console.log('healthParamList: ' + this.healthParamList);

            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    sentTo() {
        this._uiService.showSpinner();

        this._ccmPlanService.sendCcmPlanSummaryEmail(this.planId).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data;
                console.log('u Object', array);

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    generatePDF() {

        let exportData = [{}];


        this.ccmPlan.items.forEach((element, index) => {
            let data = {
                "S.No": (index + 1) || null,
                "Component": element.name || null,
                "Goal": element.itemGoals[0].goal || null,
                // "Goal": this.ccmPlan.items[index].itemGoals[0].goal || null,
                "Instructions & Interventions": element.itemGoals[0].intervention || null,
                // "Instructions & Interventions": this.ccmPlan.items[index].itemGoals[0].intervention || null,
                "Review": element.itemGoals[0].ccmPlanReviews || null,
                // "Review": this.ccmPlan.items[index].itemGoals[0].ccmPlanReviews || null,
            }

            exportData.push(data);

        });

        const doc = new jsPDF();
        // doc.text("CCM Plan Summary", 35, 25);
        doc.autoTable({
            // columnStyles: { 0: { halign: 'center' } },
            theme: 'striped',
            body: [],
            columns: [
                { header: 'CCM Plan Summary', dataKey: 'CCM Plan Summary' },
            ]
        })

        // doc.autoTable({
        //     theme: 'striped',
        //     body: exportData,
        //     columns: [
        //         { header: 'S.No', dataKey: 'S.No' }, { header: 'Component', dataKey: 'Component' },
        //         { header: 'Goal', dataKey: 'Goal' }, { header: 'Instructions & Interventions', dataKey: 'Instructions & Interventions' },
        //         { header: 'Review', dataKey: 'Review' }
        //     ]
        // })

        var positions = [];
        doc.autoTable({
            theme: 'striped',
            body: exportData,
            columns: [
                { header: 'S.No', dataKey: 'S.No' }, { header: 'Component', dataKey: 'Component' },
                { header: 'Goal', dataKey: 'Goal' }, { header: 'Instructions & Interventions', dataKey: 'Instructions & Interventions' },
                { header: 'Review', dataKey: 'Review' }
            ]
        }, {
                drawCell: function (cell, data) {
                    if (data.column.dataKey === "Review") {
                        positions.push({ x: cell.x, y: cell.y + 5 });
                    }
                },
                columnStyles: {
                    5: { columnWidth: 120 }
                },
                bodyStyles: {
                    rowHeight: 100
                }
            })

        positions.forEach(function (pos) {
            var rows = [
                ["1", "2", "3", "4"],
                ["1", "2", "3", "4"],
                ["1", "2", "3", "4"],
                ["1", "2", "3", "4"]
            ];
            doc.autoTable(["One", "Two", "Three", "Four"], rows, {
                startY: pos.y,
                margin: { left: pos.x },
                tableWidth: 'wrap',
                theme: 'grid',
                styles: {
                    cellPadding: 3,
                    fontSize: 9,
                    rowHeight: 15
                }
            });
        });

        // var headerText = "CCM Plan Summary";
        // var totalPagesExp = "{total_pages_count_string}";
        // var leftMargin = 40;

        // doc.autoTable({
        //     theme: 'striped',
        //     // styles: { overflow: 'linebreak', columnWidth: 'wrap' },
        //     margin: {top: 40},
        //     body: this.exportData,
        //     columns: [
        //         { header: 'S.No', dataKey: 'S.No' }, { header: 'System Id', dataKey: 'System Id' },
        //         { header: 'Patient Unique Id', dataKey: 'Patient Unique Id' }, { header: 'First Name', dataKey: 'First Name' },
        //         { header: 'Last Name', dataKey: 'Last Name' }, { header: 'DOB', dataKey: 'DOB' },
        //         { header: 'Registered As', dataKey: 'Registered As' }, { header: 'Registered On', dataKey: 'Registered On' }
        //     ],
        //     addPageContent: function (data) {
        //         doc.text(headerText, leftMargin, 30);
        //         var str = "Page " + data.pageCount;
        //         // Total page number plugin only available in jspdf v1.0+

        //         // if (typeof doc.putTotalPages === 'function') {
        //         //     str = str + " of " + totalPagesExp;
        //         // }

        //         // str = str + ". Generated on " + Date();
        //         doc.text(str, leftMargin, doc.internal.pageSize.height - 10);
        //     }
        // })

        // doc.save('CCM Plan Summary.pdf');
        doc.output("dataurlnewwindow");
        this._uiService.hideSpinner();
    }

    public html2PDFfile(type?: string) {

        // setTimeout(function () {

        this._uiService.showSpinner();


        var element = document.getElementById('element-to-print');
        var opt = {
            // margin: 15,
            // margin: [25, 15, 25, 15],
            // margin: [this.marginTop || 1, this.marginLeft || 1, this.marginBottom || 1, this.marginRight || 1],
            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            // image: { type: 'jpg', quality: 0.98 },
            // html2canvas: { scale: 2 },
            html2canvas: { scale: 2, useCORS: true },
            // jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // New Promise-based usage:

        // html2pdf().from(element).set(opt).save();
        // html2pdf().from(element).set(opt).output("dataurlnewwindow");
        if (type == "download") {
            let fileName = "CCM Plan Summary" || "untitled";
            fileName += ".pdf";

            this._uiService.hideSpinner();
            html2pdf().from(element).set(opt).save(fileName);
        }
        else if (type == "print") {
            this._uiService.hideSpinner();
            // html2pdf().from(element).set(opt).print();
        }
        else {
            this._uiService.hideSpinner();
            html2pdf().from(element).set(opt).output("dataurlnewwindow");
        }

        // this.contentDisplay = "none";
        // setTimeout(function () {
        //     this.showContent = false;
        // }, 1000);


        // }, 1000);

    }

    loadUserById() {
        // this._uiService.showSpinner();

        this._userService.getUserById(this.patientId).subscribe(
            (res) => {
                // this._uiService.hideSpinner();

                const user = res.data;
                console.log('u Object', user);
                // this.newUser = user;
                this.patient = this._mappingService.mapUser(user);
                console.log('newUser', this.patient);
                // this.userId = this.user.id;
            },
            (err) => {
                console.log(err);
                // this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );
    }

    loadGeneralInfo() {
        this._uiService.showSpinner();

        this._patientRecordService.getGeneralInfo(this.patientId).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                const user = res.json().data;
                // console.log('u Object', user);
                // this.newUser = user;
                this.patient = this._mappingService.mapUser(user);
                console.log('patient general info', this.patient);
                // this.userId = this.user.id;
            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadCcmPlan() {

        this._uiService.showSpinner();

        this._ccmPlanService.getSingleCcmPlan(this.patientId, this.planId).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                let array = res.json().data;
                console.log('u Object', array);

                this.ccmPlan = this._mappingService.mapCcmPlan(array);
                // let ccmPlan = this._mappingService.mapCcmPlan(array);

                // this.ccmPlan = this._utilityService.deepCopy(ccmPlan);
                // console.log('ccmPlan', ccmPlan);
                // console.log('this.ccmPlan', this.ccmPlan);


                this.loadReviewList();

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

    }

    loadReviewList() {
        const msg = new Message();
        let length = 0;
        // this.dataSource = new MatTableDataSource<User>(this.userList);
        // if (this.listPagePermission) {


        this._uiService.showSpinner();

        this._ccmPlanService.getReviewListCount(this.planId, null, null, null).subscribe(
            (res) => {
                // this._uiService.hideSpinner();
                length = res.json().data;

                this._ccmPlanService.getReviewListPagination(this.planId, 0, length, null, null, null).subscribe(
                    (res) => {
                        // this.userList = res.json();
                        this._uiService.hideSpinner();
                        let array = res.json().data || [];
                        // console.log('res list:', array);
                        var uList: CcmPlanReview[] = [];
                        for (let i = 0; i < array.length; i++) {
                            let u = this._mappingService.mapCcmPlanReview(array[i]);
                            uList.push(u);
                        }
                        // this.ccmPlanReviewList = uList;


                        uList.forEach(element => {
                            this.ccmPlan.items.forEach((element1, index1) => {
                                if (element.ccmPlanItemName == element1.name) {
                                    this.ccmPlan.items[index1].ccmPlanReviews.push(element);
                                }

                                element1.itemGoals.forEach((element2, index2) => {

                                    if (element.ccmPlanItemGoalId == element2.id) {
                                        this.ccmPlan.items[index1].itemGoals[index2].ccmPlanReviews.push(element);
                                    }
                                });

                            });
                        });

                        // this.ccmPlan.ccmPlanReviews

                        console.log("map reviews ", this.ccmPlan);

                    },
                    (err) => {
                        console.log(err);
                        this._uiService.hideSpinner();
                        // this.dataSource = new MatTableDataSource<User>(this.userList);
                        // this._authService.errStatusCheck(err);
                    }
                );

            },
            (err) => {
                console.log(err);
                this._uiService.hideSpinner();
                // this._authService.errStatusCheckResponse(err);
            }
        );

        // }
        // else {
        //     this.isSpinner = false;
        //     let msg = this._utilityService.permissionMsg();
        //     this._uiService.showToast(msg, '');
        // }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.unsubscribe();
    }

}



