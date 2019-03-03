
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SchedulerComponent } from "./scheduler.component";
import { SupervisorSchedulerComponent } from "./supervisor/supervisor-scheduler.component";
import { CalendarModule } from 'angular-calendar';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';


//import { CalendarHeaderComponent } from '../shared/campaign-calender/calender-utils/calender-header.component';

import { SupervisorCalenderComponent } from './supervisor/calender/calender.component';

// import { SchedulerDialogComponent } from './dialog/scheduler.dialog'
import { SupervisorSchedulerDialogComponent } from './supervisor/dialog/scheduler.dialog';

import { MatDialogRef } from '@angular/material'

import { SupervisorCalendarHeaderComponent } from './supervisor/calender/calender-utils/calender-header.component';

import { DateTimeUtils } from './utils/datetime.utils';
import { ValidationUtils } from './utils/validation.utils'
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        FormsModule,
        SharedModule,
        CalendarModule.forRoot(),
        MalihuScrollbarModule.forRoot()
    ],
    providers: [DateTimeUtils, ValidationUtils],
    entryComponents: [
        SupervisorSchedulerDialogComponent
    ],
    declarations: [
        SupervisorCalendarHeaderComponent, SchedulerComponent,
        SupervisorCalenderComponent, SupervisorSchedulerComponent,
        SupervisorSchedulerDialogComponent
    ]
})
export class SchedulerModule {

}