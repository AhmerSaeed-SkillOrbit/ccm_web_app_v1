import { User } from "./user";
import { Role } from "./role";
import { Comment } from "./comment";

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

    replyCount: number;
    // commentlist: Array<Comment>;
    replyList: Comment[] = [];
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