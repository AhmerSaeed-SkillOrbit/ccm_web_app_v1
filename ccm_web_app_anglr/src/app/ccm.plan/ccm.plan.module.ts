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
                path: 'plan/form/:paId',
                component: CcmPlanFormComponent,
                pathMatch: 'full'
            },
            {
                path: 'plan/form/edit/:paId/:planId',
                component: CcmPlanFormComponent,
                pathMatch: 'full'
            },
            {
                path: 'plan/list/:paId',
                component: CcmPlanListComponent,
                pathMatch: 'full'
            },
            {
                path: 'plan/summary/:paId/:planId',
                component: CcmPlanSummaryComponent,
                pathMatch: 'full'
            },

            {
                path: 'plan/review/form/:paId/:planId',
                component: ReviewFormComponent,
                pathMatch: 'full'
            },
            {
                path: 'plan/review/form/edit/:paId/:planId/:rId',
                component: ReviewFormComponent,
                pathMatch: 'full'
            },
            {
                path: 'plan/review/list/:paId/:planId',
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
