import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';

import { FileUploadFormComponent } from './file.upload.form/file.upload.form.component';
import { FileUploadListComponent } from './file.upload.list/file.upload.list.component';


@NgModule({
    declarations: [
        FileUploadFormComponent,
        FileUploadListComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        MaterialModule, SharedModule,
        RouterModule.forChild([
            {
                path: 'fu/form',
                component: FileUploadFormComponent,
                pathMatch: 'full'
            },
            {
                path: 'fu/form/edit/:id',
                component: FileUploadFormComponent,
                pathMatch: 'full'
            },
            {
                path: 'fu/list',
                component: FileUploadListComponent,
                pathMatch: 'full'
            }

        ]),
    ],
    entryComponents: [

    ],
    providers: [

    ]
})

export class FileManagementModule { }
