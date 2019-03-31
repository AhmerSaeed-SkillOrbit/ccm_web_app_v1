import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { DoctorPendingRequestListComponent } from './doctor/pending.request.list/doctor.pending.request.list.component';
import { DoctorAcceptedRequestListComponent } from './doctor/accepted.request.list/doctor.accepted.request.list.component';
import { DoctorRejectedRequestListComponent } from './doctor/rejected.request.list/doctor.rejected.request.list.component';
import { PatientPendingRequestListComponent } from './patient/pending.request.list/patient.pending.request.list.component';
import { PatientAcceptedRequestListComponent } from './patient/accepted.request.list/patient.accepted.request.list.component';
import { PatientRejectedRequestListComponent } from './patient/rejected.request.list/patient.rejected.request.list.component';



@NgModule({
    declarations: [
        DoctorPendingRequestListComponent,
        DoctorAcceptedRequestListComponent,
        DoctorRejectedRequestListComponent,
        PatientPendingRequestListComponent,
        PatientAcceptedRequestListComponent,
        PatientRejectedRequestListComponent
    ],
    imports: [
        ReactiveFormsModule, FormsModule,
        CommonModule,
        MaterialModule, SharedModule,
        RouterModule.forChild([
            // {path: 'products', component: ProductlistComponent},
            // { path: 'product/:id'
            // , canActivate: [ ProductDetailGuard ]
            // , component: ProductDetialComponent},
            // {path: 'new/product', component: ProductNewComponent}

            {
                path: 'd/list/p',
                component: DoctorPendingRequestListComponent
            },
            {
                path: 'd/list/a',
                component: DoctorAcceptedRequestListComponent
            },
            {
                path: 'd/list/r',
                component: DoctorRejectedRequestListComponent
            },
            {
                path: 'p/list/p',
                component: PatientPendingRequestListComponent
            },
            {
                path: 'p/list/a',
                component: PatientAcceptedRequestListComponent
            },
            {
                path: 'p/list/r',
                component: PatientRejectedRequestListComponent
            }
        ])
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ],
    entryComponents: [
    ]
})

export class AppointmentModule { }