import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { PendingRequestListComponent } from './pending.request.list/pending.request.list.component';
import { AcceptedRequestListComponent } from './accepted.request.list/accepted.request.list.component';
import { RejectedRequestListComponent } from './rejected.request.list/rejected.request.list.component';



@NgModule({
    declarations: [
        PendingRequestListComponent,
        AcceptedRequestListComponent,
        RejectedRequestListComponent
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
                path: 'list/p',
                component: PendingRequestListComponent
            },
            {
                path: 'list/a',
                component: AcceptedRequestListComponent
            },
            {
                path: 'list/r',
                component: RejectedRequestListComponent
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