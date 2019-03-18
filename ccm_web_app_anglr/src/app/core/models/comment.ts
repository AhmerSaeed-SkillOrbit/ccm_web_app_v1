import { User } from "./user";

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

    // createdBy: number;
    createdBy: User = new User();
    
    updatedBy: number;
    createdOn: string;
    updatedOn: string;

}