import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';

import { PatientRegisteredReportListComponent } from './patient.registered.report.list/patient.registered.report.list.component';


@NgModule({
    declarations: [
        PatientRegisteredReportListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        MaterialModule, SharedModule,
        RouterModule.forChild([
            {
                path: 'patient/registered',
                component: PatientRegisteredReportListComponent,
                pathMatch: 'full'
            },
            {
                path: 'patient/invitation',
                component: PatientRegisteredReportListComponent,
                pathMatch: 'full'
            },
            {
                path: 'patient/cpt/code',
                component: PatientRegisteredReportListComponent,
                pathMatch: 'full'
            },
            {
                path: 'patient/type',
                component: PatientRegisteredReportListComponent,
                pathMatch: 'full'
            },

        ]),
    ],
    entryComponents: [

    ],
    providers: [

    ]
})

export class ReportManagementModule { }
