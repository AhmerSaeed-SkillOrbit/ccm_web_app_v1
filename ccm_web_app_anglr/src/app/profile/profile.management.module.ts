import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './profile.component';
import { ChangePasswordComponent } from './change.password/change.password.component';



@NgModule({
    declarations: [
        ProfileComponent,
        ChangePasswordComponent
    ],
    imports: [
        ReactiveFormsModule, FormsModule,
        CommonModule,
        MaterialModule, SharedModule,
        RouterModule.forChild([
            {
                path: 'p/edit',
                component: ProfileComponent
            },
            {
                path: 'p/change/password',
                component: ChangePasswordComponent
            }
        ])
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ],
    entryComponents: []
})

export class ProfileManagementModule { }