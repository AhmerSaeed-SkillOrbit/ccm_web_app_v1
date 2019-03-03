import { FormGroup, FormControl, FormArray, NgForm, Validators } from '@angular/forms';
import { Component, ViewChild, TemplateRef, OnInit, group, } from '@angular/core';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';
import { MatDialog } from '@angular/material'

import { ScheduleService } from '../../core/services/schedule/schedule.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { UIService } from '../../core/services/ui/ui.service';
import { Message, MessageTypes } from '../../core/models/message';
import { flatten } from '@angular/compiler';
import { SupervisorSchedulerDialogComponent } from './dialog/scheduler.dialog';
@Component({
    selector: 'supervisor-scheduler',
    moduleId: module.id,
    styleUrls: ['./supervisor-scheduler.component.css'],
    templateUrl: './supervisor-scheduler.component.html'
})
export class SupervisorSchedulerComponent implements OnInit {

    @ViewChild('calendar') calender;

    constructor(
        // private modal: NgbModal,
        private schedule: ScheduleService,
        private uiService: UIService,
        // private specialistService: SpecialistService,
        // private partnersiteService: PartnersiteService,
        public dialog: MatDialog,
    ) { }


    private days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    private months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'];

    specialities = [];

    selectedSpecialityID;
    partnerSiteID;

    partnersites = [];
    /**
     * This is for handling clicked input in the calendar component
     * @param date Date clicked in calendar component
     */
    handleDateEvent(date) {
        let msg: Message = new Message()


        if (!this.selectedSpecialityID) {
            msg.title = 'Required selection'
            msg.msg = 'Please select speciality'
            this.uiService.showToast(msg,"");
            return;
        }

        let data = {
            day: this.days[date.day],
            date: date.date,
            year: date.year,
            monthInWords: this.months[date.month],
            speciality: this.selectedSpecialityID,
            partnerSiteID: this.partnerSiteID,
            month: date.month + 1,
            calender: this.calender
        };
        this.openDialog(data)
    }

    openDialog(data) {
        let dialogRef = this.dialog.open(SupervisorSchedulerDialogComponent, {
            height: '450px',
            maxWidth: '95vw !important',
            minWidth: '80vw !important',
            data: data
        });
    }
    ngAfterViewInit() {
        //  this.mScrollbarService.initScrollbar('.mat-select-panel', { axis: 'y', theme: 'dark-thick', scrollButtons: { enable: true } });
    }
    ngOnInit() {
        // this.specialistService.getSpecialities().subscribe(
        //     (res) => {
        //         this.specialities = JSON.parse(res._body);
        //         this.selectedSpecialityID = this.specialities[0].id

        //         this.partnersiteService.getPartnerSite()
        //             .subscribe(
        //                 (response) => {
        //                     this.partnersites = JSON.parse(response._body);
        //                     this.partnerSiteID = this.partnersites[0].id;
        //                     this.partnerSiteChanged();
        //                 }
        //             )

        //         //this.specialityChanged()
        //     },
        //     (err) => { }
        // )
    }


    partnerSiteChanged() {

        this.calender.refreshView(this.partnerSiteID, this.selectedSpecialityID);
    }

    specialityChanged() {
        this.calender.refreshView(this.partnerSiteID, this.selectedSpecialityID)
    }
}