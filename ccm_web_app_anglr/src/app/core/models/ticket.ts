import { User } from "./user";
import { Role } from "./role";
import { Comment, Reply } from "./comment";

// import { BaseModel } from "./base.model";

// export class Ticket extends BaseModel {
export class Ticket {

    id: number;
    ticketId: number;
    title: string;
    ticketNumber: string;
    description: string;
    priority: string;
    type: string;
    otherType: string;

    raisedFrom: string;

    role: Role = new Role();

    trackStatus: string;

    ticketAssignee: TicketAssignee[] = [];

    replyCount: number;
    // replylist: Array<Reply>;
    replyList: Reply[] = [];
    viewMoreReply: number;
    isReply: boolean = true;

    // createdBy: number;
    createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;

}

export class Type {

    id: number;
    typeId: number;
    name: string;
    code: string;

    // createdBy: number;
    createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export class Priority {

    id: number;
    priorityId: number;
    name: string;
    code: string;

    // createdBy: number;
    createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export class TrackStatus {

    id: number;
    trackStatusId: number;
    name: string;
    code: string;

    // createdBy: number;
    createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export class TicketAssignee {

    id: number;
    ticketAssigneeId: number;
    assignById: number;
    assignBy: User = new User();
    assignByDescription: string;
    assignToId: number;
    assignTo: User = new User();
    createdOn: string;
}