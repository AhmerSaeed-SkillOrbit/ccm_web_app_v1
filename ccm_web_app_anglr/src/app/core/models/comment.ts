import { User } from "./user";
import { Role } from "./role";

export class Comment {

    id: number;
    commentId: number;
    forumTopicId: number;
    comment: string;
    userId: number;
    vote: string;
    parentCommentId: number;
    isEdit: boolean = false;
    isActive: boolean;

    role: Role = new Role();

    // createdBy: number;
    createdBy: User = new User();
    
    updatedBy: number;
    createdOn: string;
    updatedOn: string;

}