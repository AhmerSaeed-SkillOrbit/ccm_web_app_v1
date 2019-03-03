import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from "./schedule.component";
import { CalenderComponent } from "./schedule-calender/calender.component";
import { CalenderMyscheduleComponent } from "./schedule-calender/calender.myschedule.component";
import { CalendarHeaderComponent } from './schedule-calender/calender-utils/calender-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { MomentModule } from 'angular2-moment';
// import { MomentTimezoneModule } from 'angular-moment-timezone';

@NgModule({
    imports: [
        MaterialModule, FormsModule,
        MomentModule, ReactiveFormsModule,
        BrowserAnimationsModule, CalendarModule.forRoot()
    ],
    declarations: [
        ScheduleComponent, CalenderComponent,
        CalenderMyscheduleComponent, CalendarHeaderComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class Schedule1Module {

}