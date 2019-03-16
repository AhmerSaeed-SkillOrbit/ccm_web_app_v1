import { Tag } from "./tag";
import { Comment } from "./comment";

// import { BaseModel } from "./base.model";

// export class Forum extends BaseModel {
export class Forum {

    id: number;
    forumId: number;
    title: string;
    description: string;
    createdOn: string;
    updatedOn: string;

    tags: Tag[] = [];
    // owner: {
    //     id: number,
    //     name: string,
    //     entityType: string,
    //     profilePicId: number,
    //     profilePic: any
    // },

    commentCount: number;
    // commentlist: Array<Comment>;
    commentList: Comment[] = [];
    viewMoreComment: number;
    isComment: boolean = true;
}


