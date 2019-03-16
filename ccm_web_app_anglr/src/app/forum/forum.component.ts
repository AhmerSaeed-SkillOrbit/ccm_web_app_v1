import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../core/models/user';
// import { Dashboard } from '../core/models/dashboard';
import { Forum } from '../core/models/forum';
import { Message, MessageTypes } from '../core/models/message';

import { IAuthService } from '../core/services/auth/iauth.service';
import { UIService } from '../core/services/ui/ui.service';
// import { ScriptService } from '../core/services/script.service';
import { UtilityService } from '../core/services/general/utility.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { MessagingService } from '../messaging.service';

// import { DashboardService } from '../core/services/general/dashboard.service';
import { ForumService } from '../core/services/general/forum.service';
import { MappingService } from '../core/services/mapping/mapping.service';
import { AddUpdateForumDialogeComponent } from './add.update.forum.dialoge/add.update.forum.dialoge.component';



declare var libraryVar: any;

@Component({
    selector: 'forum',
    templateUrl: 'forum.component.html',
    styleUrls: ['forum.component.css']
})
export class ForumComponent implements OnInit {

    pageNo: number = 0;
    limitValue: number = 5;

    files: any;
    // dashboard: Dashboard = new Dashboard();
    // newsFeeds = new Array<Forum>();
    newsFeedLength: number;
    newsFeeds: Forum[] = [];
    currentURL: string;

    isUser: User = new User();
    user: User = new User();
    entityType: string;
    redirectUrl: string;
    isLogin: any;
    likeBtn = false;
    isEditBtn = true;
    loadMoreBtn = false;
    volunteerBtn = false;
    userComment: string;

    addPermission = false;

    constructor(@Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        public dialog: MatDialog,
        private _forumService: ForumService,
        private _utilityService: UtilityService,
        private _mappingService: MappingService,
        private route: ActivatedRoute, private _router: Router
    ) {
        this.currentURL = window.location.href;
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.isLogin = this._authService.isLoggedIn();
        console.log(this.user);

        if (!this.isLogin) {
            this._router.navigateByUrl('login');
        }


        // this.addPermission = this._utilityService.checkUserPermission(this.user, 'add_doctor');
        this.addPermission = true;

        // this.newsFeeds.push(new NewsFeed());
        // this.newsFeeds.push(new Forum());
        this.loadNewsFeed();
    }

    openAddForumDialog() {

        let dialog = this.dialog.open(AddUpdateForumDialogeComponent, {
            maxWidth: "700px",
            minWidth: "550px",
            // width: "550px",
            // height: '465px',
            // data: this.id,
            data: {
                type: "Add"
            },
        });
        dialog.afterClosed().subscribe((result) => {
            console.log("result", result);
            if (result) {
                // this.refreshList();
            }
        })
    }

    openEditForumDialog(forum: Forum) {

        let dialog = this.dialog.open(AddUpdateForumDialogeComponent, {
            maxWidth: "700px",
            minWidth: "550px",
            // width: "550px",
            // height: '465px',
            // data: this.id,
            data: {
                forum: forum,
                type: "Edit"
            },
        });
        dialog.afterClosed().subscribe((result) => {
            console.log("result", result);
            if (result) {
                // this.refreshList();
            }
        })
    }

    loadNewsFeed() {
        this._uiService.showSpinner();

        this._forumService.getTopicListCount().subscribe(
            (res) => {
                this.newsFeedLength = res.json().data || 0;


                this._forumService.getTopicListPagination(this.pageNo, this.limitValue).subscribe(
                    (res) => {
                        this._uiService.hideSpinner();

                        // this.newsFeeds = res.newsFeed;

                        let array = res.json().data || [];
                        // console.log('res list:', array);
                        var uList = [];
                        for (let i = 0; i < array.length; i++) {
                            let u = this._mappingService.mapForum(array[i]);
                            uList.push(u);
                        }

                        this.newsFeeds = uList;



                        this.newsFeeds.forEach((newsFeed, index) => {

                            this.newsFeeds[index].viewMoreComment = this.newsFeeds[index].commentList.length > 5 ? 5 : this.newsFeeds[index].commentList.length;
                            // this.newsFeeds[index].commentsDetail.viewMore = this.newsFeeds[index].commentsDetail.list.length > 5 ? 5 : 0;
                            this.newsFeeds[index].isComment = true;

                            newsFeed.commentList.forEach((comment, index1) => {
                                this.newsFeeds[index].commentList[index1].isEdit = false;
                            });
                        });

                        // this.files = res.dashboard.caseStudies.files;
                        console.log('newsFeed', this.newsFeeds);
                    },
                    (err) => {
                        console.log('err', err);
                        this._uiService.hideSpinner();
                    }
                );

            },
            (err) => {
                console.log('err', err);
                this._uiService.hideSpinner();
            }
        );


    }

    loadComment(newsFeed, index) {

        this._uiService.showSpinner();

        this._forumService.getCommentListCount(newsFeed.id).subscribe(
            (res) => {
                // this.newsFeedLength = res.json().data || 0;

                let count = res.json().data || 0;

                // this._forumService.getCommentListPagination(newsFeed.id, null, 10000).subscribe(
                this._forumService.getCommentListPagination(newsFeed.id, null, count).subscribe(
                    (res) => {
                        this._uiService.hideSpinner();

                        // this.newsFeeds = res.newsFeed;

                        let array = res.json().data || [];
                        // console.log('res list:', array);
                        var uList = [];
                        for (let i = 0; i < array.length; i++) {
                            let u = this._mappingService.mapComment(array[i]);
                            uList.push(u);
                        }

                        // this.newsFeeds = uList;
                        this.newsFeeds[index].commentCount = uList.length;
                        this.newsFeeds[index].commentList = uList;



                        // this.newsFeeds.forEach((newsFeed, index) => {

                        this.newsFeeds[index].viewMoreComment = this.newsFeeds[index].commentList.length > 5 ? 5 : this.newsFeeds[index].commentList.length;
                        // this.newsFeeds[index].commentsDetail.viewMore = this.newsFeeds[index].commentsDetail.list.length > 5 ? 5 : 0;
                        this.newsFeeds[index].isComment = true;

                        //     newsFeed.commentList.forEach((comment, index1) => {
                        //         this.newsFeeds[index].commentList[index1].isEdit = false;
                        //     });
                        // });

                        // this.files = res.dashboard.caseStudies.files;
                        console.log('newsFeed', this.newsFeeds);
                    },
                    (err) => {
                        console.log('err', err);
                        this._uiService.hideSpinner();
                    }
                );

            },
            (err) => {
                console.log('err', err);
                this._uiService.hideSpinner();
            }
        );
    }

    navigateTo(id) {
        console.log('navigation ID', id);

        if (this.user.entityType === 'brand') {
            this._router.navigateByUrl('o/campaign/details/' + id);
        } else if (this.user.entityType === 'influencer') {
            this._router.navigateByUrl('w/campaign/details/' + id);
        }

    }

    viewMore(view, total) {
        // console.log('newsFeed', this.newsFeeds);

        let count = 0;
        // this.newsFeeds[index].commentsDetail.viewMore = 5;

        if (view >= total) {
            count = 0;
            // this.newsFeeds[index].commentsDetail.viewMore = count;
        }
        else {
            let check = total - view;

            count = check < 0 ? 0 : check;
            // this.newsFeeds[index].commentsDetail.viewMore += 5;
        }
        return count;
    }


    onlogOut() {
        // this.script.removejscssfile('filestack.js', 'js', 'chat');

        this.entityType = this._authService.getUser().entityType;
        // console.log('entity type:', this.entityType);


        this._authService.logoutUser();
        this.isUser = this._authService.getUser();
        if (this.isUser) {
            return;
        } else {
            this._router.navigateByUrl(this.redirectUrl);
        }
    }

    addItem() {
        console.log(this.userComment);
        const getDate = new Date();
        const commentDate = getDate.toLocaleTimeString();
        const obj = {
            name: this.user.fullName,
            comment: this.userComment,
            time: commentDate
        };
        this.userComment = '';
    }

    addComment($event, newsFeedId, index) {
        this._uiService.showSpinner();
        let comment = '';
        comment += $event.target.value;
        console.log("newsFeedId", newsFeedId);
        console.log("comment", comment);

        this._forumService.createComment(newsFeedId, null, comment).subscribe(
            (res) => {
                this._uiService.hideSpinner();
                $event.target.value = null;
                console.log('res', res);

                this.loadComment(this.newsFeeds[index], index)
                // this.loadSingleNewsFeed(newsFeedId, index)
            },
            (err) => {
                console.log('err', err);
                this._uiService.hideSpinner();

                const msg = new Message();
                const msgContent = err.json() && err.json().genericResponse && err.json().genericResponse.genericBody.message ? err.json().genericResponse.genericBody.message : "Sorry, an error has occured";
                msg.msg = msgContent;
                msg.msgType = MessageTypes.Error;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, '');
            }
        );


    }

    hideAllNewsFeedEdit() {
        this.newsFeeds.forEach((newsFeed, index) => {
            this.newsFeeds[index].isComment = true;

            newsFeed.commentList.forEach((comment, index1) => {
                this.newsFeeds[index].commentList[index1].isEdit = false;
            });
        });
    }

    onEdit(index, index1) {
        this.hideAllNewsFeedEdit();

        // console.log('newsFeed', this.newsFeeds);

        console.log("index", index);
        console.log("index1", index1);
        console.log("newsFeeds.comment.length", this.newsFeeds[index].commentList.length);
        console.log("newsFeeds.comment.viewMore", this.newsFeeds[index].viewMoreComment);

        // let count = this.newsFeeds[index].commentsDetail.list.length - this.newsFeeds[index].commentsDetail.viewMore + index1 + 1;
        let count = this.newsFeeds[index].commentList.length - this.newsFeeds[index].viewMoreComment + index1;
        console.log("count", count);


        this.newsFeeds[index].commentList[count].isEdit = true;
        this.newsFeeds[index].isComment = false;

    }

    onCancel(index, index1) {

        console.log("index", index);
        console.log("index1", index1);

        // let count = this.newsFeeds[index].commentsDetail.viewMore + index1 + 1;
        let count = this.newsFeeds[index].commentList.length - this.newsFeeds[index].viewMoreComment + index1;

        // this.newsFeeds[index].commentsDetail.list[count].isEdit = false;

        this.newsFeeds[index].commentList.forEach((comment, index1) => {
            this.newsFeeds[index].commentList[index1].isEdit = false;
        });
        this.newsFeeds[index].isComment = true;

    }

    updateComment($event, forum: Forum, commentId, index, index1) {
        this._uiService.showSpinner();
        let comment = '';
        comment += $event.target.value;
        console.log("forum", forum);
        console.log("commentId", commentId);
        console.log("comment", comment);

        // let count = this.newsFeeds[index].commentsDetail.viewMore + index1 + 1;
        let count = this.newsFeeds[index].commentList.length - this.newsFeeds[index].viewMoreComment + index1;

        this._forumService.updateComment(forum.id, commentId, comment).subscribe(
            (res) => {
                this._uiService.hideSpinner();
                // $event.target.value = null;
                this.newsFeeds[index].commentList[count].comment = comment;
                this.newsFeeds[index].commentList[count].isEdit = false;
                this.newsFeeds[index].isComment = true;
                console.log('res', res);

                // this.loadSingleNewsFeed(forum.id, index);
            },
            (err) => {
                console.log('err', err);
                this._uiService.hideSpinner();
            }
        );

    }

    deleteComment(index, index1, commentId) {

        console.log("commentId", commentId);
        // let count = this.newsFeeds[index].commentsDetail.viewMore + index1 + 1;
        let count = this.newsFeeds[index].commentList.length - this.newsFeeds[index].viewMoreComment + index1;
        // this.data.splice(index, 1);
        this.newsFeeds[index].commentList.splice(count, 1);

        const newsFeedId = this.newsFeeds[index].id;

        // this.loadSingleNewsFeed(newsFeedId, index);

    }

    onDeleteComment(index, index1, commentId) {
        // if (this.deletePermission) {
        const dialogRef = this.dialog.open(DeleteCommentForum, {
            width: '450px',
            data: { type: 'comment', id: commentId }
        });
        // console.log('value', value, '---id', id);
        dialogRef.afterClosed().subscribe(result => {

            if (result == "success") {
                this.deleteComment(index, index1, commentId)
            }
        });
        // }
    }

    deleteForum(index, forumId) {

        console.log("forumId", forumId);
        this.newsFeeds.splice(index, 1);

        // const newsFeedId = this.newsFeeds[index].id;

        // this.loadSingleNewsFeed(newsFeedId, index);

    }

    onDeleteForum(index, forumId) {
        // if (this.deletePermission) {
        const dialogRef = this.dialog.open(DeleteCommentForum, {
            width: '450px',
            data: { type: 'forum', id: forumId }
        });
        // console.log('value', value, '---id', id);
        dialogRef.afterClosed().subscribe(result => {

            if (result == "success") {
                this.deleteForum(index, forumId)
            }
        });
        // }
    }

    loadSingleNewsFeed(campId, index) {
        this._forumService.getSingleNewsFeed(this.user.entityType, campId).subscribe(
            (res) => {
                this._uiService.hideSpinner();
                console.log('res', res);

                // res.newsFeed

                this.mapNewsFeed(index, res.newsFeed);

                // this.newsFeeds = res.newsFeed;

                // this.newsFeeds.forEach((newsFeed, index) => {
                //     this.newsFeeds[index].commentsDetail.viewMore = 5;
                // });

                // this.files = res.dashboard.caseStudies.files;
                // console.log('newsFeed', this.newsFeeds);
            },
            (err) => {
                console.log('err', err);
                this._uiService.hideSpinner();
            }
        );
    }

    loadMore() {
        this._uiService.showSpinner();

        // this.pageNo = this.newsFeeds.length;
        this.pageNo += 1;
        // this.bodyObj.limitValue += 5;

        this._forumService.getTopicListPagination(this.pageNo, this.limitValue).subscribe(
            (res) => {
                this._uiService.hideSpinner();

                // this.newsFeeds = res.newsFeed;

                // this.loadMoreBtn = this.newsFeeds.length == 0 && res.newsFeed.length == 0 ? true : res.newsFeed.length == 0? fa;

                res.newsFeed.forEach((nf, i) => {
                    let check = 0;
                    this.newsFeeds.forEach((nf1, i1) => {
                        if (nf.id == nf1.id) {
                            check = 1;
                        }
                    });
                    if (check == 0) {

                        nf.commentsDetail.viewMore = nf.commentsDetail.list.length > 5 ? 5 : nf.commentsDetail.list.length;
                        // nf.commentsDetail.viewMore = nf.commentsDetail.list.length > 5 ? 5 : 0;
                        nf.commentsDetail.isComment = true;

                        nf.commentsDetail.list.forEach((comment, index1) => {
                            nf.commentsDetail.list[index1].isEdit = false;
                        });

                        this.newsFeeds.push(nf);
                    }
                });

                // this.files = res.dashboard.caseStudies.files;
                console.log('newsFeed', this.newsFeeds);
            },
            (err) => {
                console.log('err', err);
                this._uiService.hideSpinner();
                const msg = new Message();
                const msgContent = err.json() && err.json().genericResponse && err.json().genericResponse.genericBody.message ? err.json().genericResponse.genericBody.message : "Sorry, an error has occured";
                msg.msg = msgContent;
                msg.msgType = MessageTypes.Error;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, '');
            }
        );
    }

    mapNewsFeed(index, newNewsFeed) {

        // this.newsFeeds[index].commentsDetail.viewMore = this.newsFeeds[index].commentsDetail.list.length > 5 ? 5 : this.newsFeeds[index].commentsDetail.list.length;
        // this.newsFeeds[index].commentsDetail.isComment = true;

        // this.newsFeeds[index].basicInfo = newNewsFeed.basicInfo;


        this.newsFeeds[index].commentCount = newNewsFeed.commentsDetail.count;
        this.newsFeeds[index].commentList = newNewsFeed.commentsDetail.list;
        this.newsFeeds[index].viewMoreComment = newNewsFeed.commentsDetail.list.length > this.newsFeeds[index].viewMoreComment ? this.newsFeeds[index].viewMoreComment : this.newsFeeds[index].commentList.length;

        this.newsFeeds[index].commentList.forEach((comment, index1) => {
            this.newsFeeds[index].commentList[index1].isEdit = false;
        });




    }

}


@Component({
    selector: 'delete-comment-forum',
    templateUrl: 'delete.html',
    // styleUrls: ['../../campaign.component.css']
})

export class DeleteCommentForum {
    fieldType: string;
    id: number;
    returnType: string = "none";
    constructor(
        public dialogRef: MatDialogRef<DeleteCommentForum>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _uiService: UIService,
        private _router: Router,
        // private _setupService: AdminSetupService
        private _forumService: ForumService,
    ) {
        this.fieldType = data.type;
        this.id = data.id;
        // console.log('data', this.fieldType);

    }

    onNoClick(): void {
        this.dialogRef.close(this.returnType);
    }

    onYesClick(field) {

        if (field === 'comment') {
            this._forumService.deleteComment(this.id).subscribe(
                (res) => {
                    this.returnType = "success";
                    this.dialogRef.close(this.returnType);
                    const msg = new Message();
                    msg.msg = 'You have deleted comment successfully';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                },
                (err) => {
                    this.returnType = "error";
                    this.dialogRef.close(this.returnType);
                    console.log(err);
                    // const msg = new Message();
                    // msg.msg = 'Sorry, an error has occured';
                    // msg.msgType = MessageTypes.Error;
                    // msg.autoCloseAfter = 400;
                    // this._uiService.showToast(msg, '');

                    const msg = new Message();
                    const msgContent = err.json() && err.json().genericResponse && err.json().genericResponse.genericBody.message ? err.json().genericResponse.genericBody.message : "Sorry, an error has occured";
                    msg.msg = msgContent;
                    msg.msgType = MessageTypes.Error;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, '');
                });
        }
        if (field === 'forum') {
            this._forumService.deleteForumTopic(this.id).subscribe(
                (res) => {
                    this.returnType = "success";
                    this.dialogRef.close(this.returnType);
                    const msg = new Message();
                    msg.msg = 'You have deleted topic successfully';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                },
                (err) => {
                    this.returnType = "error";
                    this.dialogRef.close(this.returnType);
                    console.log(err);
                    // const msg = new Message();
                    // msg.msg = 'Sorry, an error has occured';
                    // msg.msgType = MessageTypes.Error;
                    // msg.autoCloseAfter = 400;
                    // this._uiService.showToast(msg, '');

                    const msg = new Message();
                    const msgContent = err.json() && err.json().genericResponse && err.json().genericResponse.genericBody.message ? err.json().genericResponse.genericBody.message : "Sorry, an error has occured";
                    msg.msg = msgContent;
                    msg.msgType = MessageTypes.Error;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, '');
                });
        }
        else {
            this.dialogRef.close(this.returnType);
        }

    }
}