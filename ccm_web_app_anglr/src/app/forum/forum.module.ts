import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { ForumComponent, DeleteCommentForum } from './forum.component';

import { AddUpdateForumDialogeComponent } from './add.update.forum.dialoge/add.update.forum.dialoge.component';


@NgModule({
    declarations: [
        ForumComponent,
        AddUpdateForumDialogeComponent, DeleteCommentForum
    ],
    imports: [
        ReactiveFormsModule, FormsModule,
        CommonModule,
        MaterialModule, SharedModule,
        RouterModule.forChild([
            {
                path: 'feed',
                component: ForumComponent
            }
        ])
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ],
    entryComponents: [
        AddUpdateForumDialogeComponent,
        DeleteCommentForum
    ]
})

export class ForumModule { }