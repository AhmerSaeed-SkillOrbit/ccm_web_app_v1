import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { TicketListComponent, DeleteReplyTicket } from './ticket.list/ticket.list.component';

import { TicketDiscussionComponent } from './ticket.discussion/ticket.discussion.component';



@NgModule({
    declarations: [
        TicketListComponent, DeleteReplyTicket,
        
        TicketDiscussionComponent
    ],
    imports: [
        ReactiveFormsModule, FormsModule,
        CommonModule,
        MaterialModule, SharedModule,
        RouterModule.forChild([
            {
                path: 't/list',
                component: TicketListComponent
            },
            {
                path: 't/discussion/:id',
                component: TicketDiscussionComponent
            }
        ])
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ],
    entryComponents: [
        DeleteReplyTicket,
        
    ]
})

export class TicketManagementModule { }