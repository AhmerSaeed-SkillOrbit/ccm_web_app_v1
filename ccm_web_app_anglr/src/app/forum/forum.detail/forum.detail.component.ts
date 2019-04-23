import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../core/models/user';
// import { Dashboard } from '../core/models/dashboard';
import { ForumFeed } from '../../core/models/forum';
import { Message, MessageTypes } from '../../core/models/message';

import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
// import { ScriptService } from '../../core/services/script.service';
import { UtilityService } from '../../core/services/general/utility.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { MessagingService } from '../messaging.service';

// import { DashboardService } from '../core/services/general/dashboard.service';
import { ForumService } from '../../core/services/forum/forum.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { AddUpdateForumDialogeComponent } from './../add.update.forum.dialoge/add.update.forum.dialoge.component';
import { DeleteCommentForum } from '../forum.component';



declare var libraryVar: any;

@Component({
    selector: 'forum',
    templateUrl: 'forum.detail.component.html',
    styleUrls: ['../forum.component.css']
})
export class ForumDetailComponent implements OnInit {


    newsFeed: ForumFeed = new ForumFeed();
    currentURL: string;

    isUser: User = new User();
    user: User = new User();

    redirectUrl: string;
    isLogin: any;

    isEditBtn = true;
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

        const id = this.route.snapshot.params['id'];

        if (id) {
            // this.newsFeed.id = id;
            this.loadSingleNewsFeed(id);
        }


        // this.addPermission = this._utilityService.checkUserPermission(this.user, 'add_doctor');
        this.addPermission = true;

        // this.newsFeeds.push(new NewsFeed());
        // this.newsFeeds.push(new ForumFeed());
        // this.loadNewsFeed();
    }

    openEditForumDialog(forum: ForumFeed) {

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
                // this.loadNewsFeed();
            }
        })
    }


    loadComment() {

        this._uiService.showSpinner();

        this._forumService.getCommentListCount(this.newsFeed.id).subscribe(
            (res) => {
                // this.newsFeedLength = res.json().data || 0;

                let count = res.json().data || 0;

                // this._forumService.getCommentListPagination(newsFeed.id, null, 10000).subscribe(
                this._forumService.getCommentListPagination(this.newsFeed.id, null, count).subscribe(
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
                        this.newsFeed.commentCount = uList.length;
                        this.newsFeed.commentList = uList;



                        // this.newsFeeds.forEach((newsFeed, index) => {

                        this.newsFeed.viewMoreComment = this.newsFeed.commentList.length > 5 ? 5 : this.newsFeed.commentList.length;
                        // this.newsFeeds[index].commentsDetail.viewMore = this.newsFeeds[index].commentsDetail.list.length > 5 ? 5 : 0;
                        this.newsFeed.isComment = true;

                        //     newsFeed.commentList.forEach((comment, index1) => {
                        //         this.newsFeeds[index].commentList[index1].isEdit = false;
                        //     });
                        // });

                        // this.files = res.dashboard.caseStudies.files;
                        // console.log('newsFeed', this.newsFeed);
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
            // this._router.navigateByUrl('o/campaign/details/' + id);
        } else if (this.user.entityType === 'influencer') {
            // this._router.navigateByUrl('w/campaign/details/' + id);
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

        // this.entityType = this._authService.getUser().entityType;
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

                this.loadComment()
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
        this.newsFeed.isComment = true;

        this.newsFeed.commentList.forEach((comment, index1) => {
            this.newsFeed.commentList[index1].isEdit = false;
        });
    }

    onEdit(index) {
        this.hideAllNewsFeedEdit();

        // console.log('newsFeed', this.newsFeeds);

        console.log("index", index);
        console.log("newsFeed.comment.length", this.newsFeed.commentList.length);
        console.log("newsFeed.comment.viewMore", this.newsFeed.viewMoreComment);

        // let count = this.newsFeeds[index].commentsDetail.list.length - this.newsFeeds[index].commentsDetail.viewMore + index1 + 1;
        let count = this.newsFeed.commentList.length - this.newsFeed.viewMoreComment + index;
        console.log("count", count);


        this.newsFeed.commentList[count].isEdit = true;
        this.newsFeed.isComment = false;

    }

    onCancel(index) {

        console.log("index", index);

        // let count = this.newsFeeds[index].commentsDetail.viewMore + index1 + 1;
        let count = this.newsFeed.commentList.length - this.newsFeed.viewMoreComment + index;

        // this.newsFeeds[index].commentsDetail.list[count].isEdit = false;

        this.newsFeed.commentList.forEach((comment, index1) => {
            this.newsFeed.commentList[index1].isEdit = false;
        });
        this.newsFeed.isComment = true;

    }

    updateComment($event, forum: ForumFeed, commentId, index) {
        this._uiService.showSpinner();
        let comment = '';
        comment += $event.target.value;
        console.log("forum", forum);
        console.log("commentId", commentId);
        console.log("comment", comment);

        // let count = this.newsFeeds[index].commentsDetail.viewMore + index1 + 1;
        let count = this.newsFeed.commentList.length - this.newsFeed.viewMoreComment + index;

        this._forumService.updateComment(forum.id, commentId, comment).subscribe(
            (res) => {
                this._uiService.hideSpinner();
                // $event.target.value = null;
                this.newsFeed.commentList[count].comment = comment;
                this.newsFeed.commentList[count].isEdit = false;
                this.newsFeed.isComment = true;
                console.log('res', res);

                // this.loadSingleNewsFeed(forum.id, index);
            },
            (err) => {
                console.log('err', err);
                this._uiService.hideSpinner();
            }
        );

    }

    deleteComment(index, commentId) {

        console.log("commentId", commentId);
        // let count = this.newsFeeds[index].commentsDetail.viewMore + index1 + 1;
        let count = this.newsFeed.commentList.length - this.newsFeed.viewMoreComment + index;
        // this.data.splice(index, 1);
        this.newsFeed.commentList.splice(count, 1);

        const newsFeedId = this.newsFeed.id;

        // this.loadSingleNewsFeed(newsFeedId, index);

    }

    onDeleteComment(index, commentId) {
        // if (this.deletePermission) {
        const dialogRef = this.dialog.open(DeleteCommentForum, {
            width: '450px',
            data: { type: 'comment', id: commentId }
        });
        // console.log('value', value, '---id', id);
        dialogRef.afterClosed().subscribe(result => {

            if (result == "success") {
                this.deleteComment(index, commentId)
            }
        });
        // }
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
                // this.deleteForum(index, forumId);
                this._router.navigateByUrl('forum/feed');
            }
        });
        // }
    }

    loadSingleNewsFeed(id) {
        this._uiService.showSpinner();

        this._forumService.getSingleNewsFeed(id).subscribe(
            (res) => {
                this._uiService.hideSpinner();
                console.log('res', res);

                // res.newsFeed

                let data: ForumFeed = this._mappingService.mapForumFeed(res.json().data)

                this.newsFeed = data;
                this.loadComment();
                // this.mapNewsFeed(data);

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

    mapNewsFeed(newNewsFeed) {

        // this.newsFeeds[index].commentsDetail.viewMore = this.newsFeeds[index].commentsDetail.list.length > 5 ? 5 : this.newsFeeds[index].commentsDetail.list.length;
        // this.newsFeeds[index].commentsDetail.isComment = true;

        // this.newsFeeds[index].basicInfo = newNewsFeed.basicInfo;


        this.newsFeed.commentCount = newNewsFeed.commentsDetail.count;
        this.newsFeed.commentList = newNewsFeed.commentsDetail.list;
        this.newsFeed.viewMoreComment = newNewsFeed.commentsDetail.list.length > this.newsFeed.viewMoreComment ? this.newsFeed.viewMoreComment : this.newsFeed.commentList.length;

        this.newsFeed.commentList.forEach((comment, index1) => {
            this.newsFeed.commentList[index1].isEdit = false;
        });




    }

}
