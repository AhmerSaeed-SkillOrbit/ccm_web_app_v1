import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';

import { CcmPlanFormComponent } from './ccm.plan.form/ccm.plan.form.component';
import { CcmPlanSummaryComponent } from './ccm.plan.summary/ccm.plan.summary.component';
import { CcmPlanListComponent } from './ccm.plan.list/ccm.plan.list.component';
import { ReviewFormComponent } from './review.form/review.form.component';
import { ReviewListComponent } from './review.list/review.list.component';


@NgModule({
    declarations: [
        CcmPlanFormComponent,
        CcmPlanSummaryComponent,
        CcmPlanListComponent,
        ReviewFormComponent,
        ReviewListComponent
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
                path: 'plan/form/edit/:id/:pId',
                component: CcmPlanFormComponent,
                pathMatch: 'full'
            },
            {
                path: 'plan/list/:id',
                component: CcmPlanListComponent,
                pathMatch: 'full'
            },
            {
                path: 'plan/summary/:id/:pId',
                component: CcmPlanSummaryComponent,
                pathMatch: 'full'
            },

            {
                path: 'plan/review/form/:id',
                component: ReviewFormComponent,
                pathMatch: 'full'
            },
            {
                path: 'plan/review/form/edit/:id/:pId',
                component: ReviewFormComponent,
                pathMatch: 'full'
            },
            {
                path: 'plan/review/list/:id',
                component: ReviewListComponent,
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
