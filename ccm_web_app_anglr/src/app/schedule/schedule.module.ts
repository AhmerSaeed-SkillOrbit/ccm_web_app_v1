import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { AddScheduleComponent } from './add.schedule/add.schedule.component';



@NgModule({
    declarations: [

        AddScheduleComponent,
    ],
    imports: [
        ReactiveFormsModule, FormsModule,
        CommonModule,
        MaterialModule, SharedModule,
        RouterModule.forChild([
            {
                path: 'add',
                component: AddScheduleComponent
            },
            {
                path: 'view',
                component: AddScheduleComponent
            },
        ])
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ],
    entryComponents: [
        // InviteDialogComponent,
        // AddUpdateUserDialogeComponent
    ]
})

export class ScheduleModule { }