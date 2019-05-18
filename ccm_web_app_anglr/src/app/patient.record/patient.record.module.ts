import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from "../material/material.module";
import { CommonModule } from "@angular/common";

import { SharedModule } from '../shared/shared.module';

import { PatientRecordComponent } from './record/patient.record.component';
import { GeneralInfoTabComponent } from './record/general.info.tab/general.info.tab.component';
import { PreliminaryAssessmentTabComponent } from './record/preliminary.assessment.tab/preliminary.assessment.tab.component';
import { MedicationTabComponent } from './record/medication.tab/medication.tab.component';
import { PsychologicalReviewTabComponent } from './record/psychological.review.tab/psychological.review.tab.component';
import { SocialEnvoirnmentalReviewTabComponent } from './record/social.envoirnmental.review.tab/social.envoirnmental.review.tab.component';
import { PreventiveScreeningTabComponent } from './record/preventive.screening.tab/preventive.screening.tab.component';
import { HistoricalInformationTabComponent } from './record/historical.information.tab/historical.information.tab.component';
import { GeneralQuestionsTabComponent } from './record/general.questions.tab/general.questions.tab.component';
import { CptCodeTabComponent } from './record/cpt.code.tab/cpt.code.tab.component';


@NgModule({
    declarations: [
        PatientRecordComponent,
        GeneralInfoTabComponent, PreliminaryAssessmentTabComponent,
        MedicationTabComponent, PsychologicalReviewTabComponent,
        SocialEnvoirnmentalReviewTabComponent, PreventiveScreeningTabComponent,
        HistoricalInformationTabComponent, GeneralQuestionsTabComponent,
        CptCodeTabComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        MaterialModule, SharedModule,
        RouterModule.forChild([
            {
                path: 'record/:id',
                component: PatientRecordComponent,
                pathMatch: 'full'
            },

        ]),
    ],
    entryComponents: [

    ],
    providers: [

    ]
})

export class PatientRecordModule { }
