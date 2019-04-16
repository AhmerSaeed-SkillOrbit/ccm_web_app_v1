import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';

import { CcmPlanFormComponent } from './ccm.plan.form/ccm.plan.form.component';
import { CcmPlanListComponent } from './ccm.plan.list/ccm.plan.list.component';


@NgModule({
    declarations: [
        CcmPlanFormComponent,
        CcmPlanListComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        MaterialModule, SharedModule,
        RouterModule.forChild([
            {
                path: 'plan/form/:id',
                component: CcmPlanFormComponent,
                pathMatch: 'full'
            },
            {
                path: 'plan/list/:id',
                component: CcmPlanListComponent,
                pathMatch: 'full'
            },

        ]),
    ],
    entryComponents: [

    ],
    providers: [

    ]
})

export class CcmPlanModule { }
