import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';

import { PatientRegisteredReportListComponent } from './patient.registered.report.list/patient.registered.report.list.component';
import { PatientInvitationReportListComponent } from './patient.invitation.report.list/patient.invitation.report.list.component';
import { PatientCptCodeReportListComponent } from './patient.cpt.code.list/patient.cpt.code.report.list.component';
import { PatientTypeReportListComponent } from './patient.type.list/patient.type.report.list.component';


@NgModule({
    declarations: [
        PatientRegisteredReportListComponent,
        PatientInvitationReportListComponent,
        PatientCptCodeReportListComponent,
        PatientTypeReportListComponent,
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
                component: PatientInvitationReportListComponent,
                pathMatch: 'full'
            },
            {
                path: 'patient/cpt/code',
                component: PatientCptCodeReportListComponent,
                pathMatch: 'full'
            },
            {
                path: 'patient/type',
                component: PatientTypeReportListComponent,
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
