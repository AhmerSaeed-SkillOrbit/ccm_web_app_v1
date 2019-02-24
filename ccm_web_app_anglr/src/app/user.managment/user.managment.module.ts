import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ProductlistComponent } from './product-list.component';
// import { ProductDetialComponent } from './product-detail.component';
// import { ProductNewComponent } from './product-new.component';
// import { ProductFilterPipe } from './product-filter.pipe';
// import { ProductDetailGuard } from './product-guard.service';
// import { ProductService } from './product.service';
// import { StarComponent } from '../shared/star.component';

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { AdminListComponent } from './list.admin/admin.list.component';
import { FacilitatorListComponent } from './list.facilitator/facilitator.list.component';
import { DoctorListComponent } from './list.doctor/doctor.list.component';
import { PatientListComponent } from './list.patient/patient.list.component';
import { SupportStaffListComponent } from './list.supportStaff/supportStaff.list.component';
import { InviteDoctorComponent } from './invite.doctor/invite.doctor.component';
import { InvitePatientComponent } from './invite.patient/invite.patient.component';
import { InviteDialogComponent } from './invite.dialoge/invite.dialog.component';
import { EditUserComponent } from './edit.user/edit.user.component';
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [

        AdminListComponent,
        FacilitatorListComponent,
        DoctorListComponent,
        PatientListComponent,
        SupportStaffListComponent,

        InviteDoctorComponent,
        InvitePatientComponent,
        InviteDialogComponent,
        EditUserComponent,
        // ProductNewComponent,
        // ProductDetialComponent,
        // ProductFilterPipe
        // ,
        // StarComponent
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
                path: 'list/admin',
                component: AdminListComponent
            },
            {
                path: 'list/facilitator',
                component: FacilitatorListComponent
            },
            {
                path: 'list/doctor',
                component: DoctorListComponent
            },
            {
                path: 'list/patient',
                component: PatientListComponent
            },
            {
                path: 'list/supStaff',
                component: SupportStaffListComponent
            },
            {
                path: 'invite/doctor',
                component: InviteDoctorComponent
            },
            {
                path: 'invite/patient',
                component: InvitePatientComponent
            },
            {
                path: 'edit/:id',
                component: EditUserComponent
            },
        ])
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ],
    entryComponents: [
        InviteDialogComponent
    ]
})

export class UserManagmentModule { }