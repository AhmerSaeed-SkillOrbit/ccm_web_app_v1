import { Component, OnInit, Inject, ViewChild, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';

import { Message, MessageTypes } from '../../../core/models/message';
import { User } from '../../../core/models/user';

import { UIService } from '../../../core/services/ui/ui.service';
import { IAuthService } from '../../../core/services/auth/iauth.service';
// import { ReportService } from '../../../core/services/report/report.service';
import { UtilityService } from '../../../core/services/general/utility.service';

// import { Config } from '../../../config/config';


@Component({
    selector: 'historical-information-tab',
    moduleId: module.id,
    templateUrl: 'historical.information.tab.component.html',
    // styleUrls: ['historical.information.tab.component.css'],
    providers: [
        DatePipe // this pipe is used to change date format
    ],
})

export class HistoricalInformationTabComponent implements OnInit {

    @Input() id: number = null;
    @Input() isTabActive: boolean = false;

    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private _utility: UtilityService,
        // private route: ActivatedRoute,
        // private _setupService: AdminSetupService,
        // private _router: Router,
        // private _formBuilder: FormBuilder,
        // private _reportService: ReportService,
        // private datePipe: DatePipe,
        public dialog: MatDialog,
    ) {
        // this.currentURL = window.location.href;
    }

    ngOnInit(): void {

        console.log("this.payLoad in parent on init =-=-==-=-=");

    }


    ngOnChanges(changes: SimpleChanges): void {

        console.log("this.payLoad in parent RecoverySuit on change =-=-==-=-=");

        if (changes['isTabActive']) {

            if (this.isTabActive) {
                // this.loadReport();
            }

        }
    }

}