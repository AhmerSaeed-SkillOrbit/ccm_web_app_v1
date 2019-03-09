import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { AssignPermissionComponent, ViewRolePermission } from './assign.permission/assign.permission.component';


@NgModule({
    declarations: [
        AssignPermissionComponent, ViewRolePermission
    ],
    imports: [
        ReactiveFormsModule, FormsModule,
        CommonModule,
        MaterialModule, SharedModule,
        RouterModule.forChild([
            {
                path: 'assign/permission',
                component: AssignPermissionComponent
            },
        ])
    ],
    providers: [
    ],
    entryComponents: [
        ViewRolePermission
    ]
})

export class RoleManagementModule { }