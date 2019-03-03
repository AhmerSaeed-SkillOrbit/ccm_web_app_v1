import { FormGroup, FormControl, FormArray, NgForm, Validators } from '@angular/forms';
import { Component, ViewChild, TemplateRef, OnInit, group, } from '@angular/core';
// import { NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';
import { MatDialog } from '@angular/material'

// import { ScheduleService } from '../core/services/schedule/schedule.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { UIService } from '../core/services/ui/ui.service';
import { Message, MessageTypes } from '../core/models/message';
import { flatten } from '@angular/compiler';
// import { SchedulerDialogComponent } from './dialog/scheduler.dialog';
// import { StatusService } from '../core/services/user/status.service';
@Component({
    styleUrls: ['./scheduler.component.css'],
    templateUrl: './scheduler.component.html'
})
export class SchedulerComponent implements OnInit {



    constructor(
        // private schedule: ScheduleService,
        private uiService: UIService,
        public dialog: MatDialog,
        // private _statusService: StatusService
    ) { }

    CreateSpecialistSchedule: boolean = false;
    CreateSupervisorSchedule: boolean = false;
    CreateRadiologySchedule: boolean = true;

    ngOnInit() {

    }

}