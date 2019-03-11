import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { CalenderComponent } from "./schedule-calender/calender.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { MomentModule } from 'angular2-moment';

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { AddScheduleComponent } from './add.schedule/add.schedule.component';
import { EditScheduleComponent } from './edit.schedule/edit.schedule.component';
import { ViewScheduleComponent } from './view.schedule/view.schedule.component';
// import { ScheduleComponent } from './schedule.component';
import { CalenderMyscheduleComponent } from './schedule-calender/calender.myschedule.component';
// import { CalendarHeaderComponent } from './schedule-calender/calender-utils/calender-header.component';
import { ScheduleListComponent } from './list.schedule/schedule.list.component';



@NgModule({
    declarations: [

        AddScheduleComponent,
        EditScheduleComponent,
        ViewScheduleComponent,
        // ScheduleComponent,
        CalenderMyscheduleComponent,
        // CalendarHeaderComponent,
        // CalenderComponent,
        ScheduleListComponent
    ],
    imports: [
        ReactiveFormsModule, FormsModule,
        MomentModule,
        // BrowserAnimationsModule,
        CommonModule,
        MaterialModule, SharedModule,
        CalendarModule.forRoot(),
        RouterModule.forChild([
            {
                path: 'add',
                component: AddScheduleComponent
            },
            {
                path: 'edit/:id/:m/:y',
                component: EditScheduleComponent
            },
            {
                path: 'view',
                component: ViewScheduleComponent
                // component: ScheduleComponent
            },
            {
                path: 'view/:id',
                component: ViewScheduleComponent
                // component: ScheduleComponent
            },
            {
                path: 'list',
                component: ScheduleListComponent
                // component: ScheduleComponent
            },
        ])
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ],
    entryComponents: [
        // InviteDialogComponent,
        // AddUpdateUserDialogeComponent
    ]
})

export class ScheduleModule { }