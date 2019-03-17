import { Tag } from "./tag";
import { Comment } from "./comment";
import { User } from "./user";

// import { BaseModel } from "./base.model";

// export class Forum extends BaseModel {
export class Forum {

    id: number;
    forumId: number;
    title: string;
    description: string;

    // createdBy: number;
    createdBy: User = new User();
    createdOn: string;
    updatedOn: string;

    tagIds: number[] = [];
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


