import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { TicketListComponent, DeleteReplyTicket } from './ticket.list/ticket.list.component';
import { AddUpdateTicketDialogeComponent } from './add.update.ticket.dialoge/add.update.ticket.dialoge.component';
import { TicketDicussionComponent } from './ticket.dicussion/ticket.dicussion.component';



@NgModule({
    declarations: [
        TicketListComponent, DeleteReplyTicket,
        AddUpdateTicketDialogeComponent,
        TicketDicussionComponent
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
                path: 't/dicussion/:id',
                component: TicketDicussionComponent
            }
        ])
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ],
    entryComponents: [
        DeleteReplyTicket,
        AddUpdateTicketDialogeComponent
    ]
})

export class TicketManagementModule { }