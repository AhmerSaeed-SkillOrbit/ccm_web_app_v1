import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../core/models/user';
// import { Dashboard } from '../core/models/dashboard';
import { Message, MessageTypes } from '../../core/models/message';
import { Ticket } from '../../core/models/ticket';

import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
// import { ScriptService } from '../../core/services/script.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UtilityService } from '../../core/services/general/utility.service';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { AddUpdateTicketDialogeComponent } from './../add.update.ticket.dialoge/add.update.ticket.dialoge.component';
import { DeleteReplyTicket } from '../ticket.list/ticket.list.component';
import { TicketService } from '../../core/services/ticket/ticket.service';

// import { DeleteCommentForum } from '../forum.component';



declare var libraryVar: any;

@Component({
    selector: 'ticket-discussion',
    templateUrl: 'ticket.dicussion.component.html',
    styleUrls: ['../ticket.component.css']
})
export class TicketDicussionComponent implements OnInit {


    ticketData: Ticket = new Ticket();
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
        private _ticketService: TicketService,
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
            // this.reply.id = id;
            this.loadTicketDetail(id);
        }


        // this.addPermission = this._utilityService.checkUserPermission(this.user, 'add_doctor');
        this.addPermission = true;

    }

    openEditTicketDialog(ticket: Ticket) {

        let dialog = this.dialog.open(AddUpdateTicketDialogeComponent, {
            maxWidth: "700px",
            minWidth: "550px",
            // width: "550px",
            // height: '465px',
            // data: this.id,
            data: {
                ticket: ticket,
                type: "Edit"
            },
        });
        dialog.afterClosed().subscribe((result) => {
            console.log("result", result);
            if (result) {
                // this.refreshList();
                // this.loadTicket();
            }
        })
    }


    loadComment() {

        this._uiService.showSpinner();

        this._ticketService.getReplyListCount(this.ticketData.id).subscribe(
            (res) => {
                // this.ticketLength = res.json().data || 0;

                let count = res.json().data || 0;

                // this._ticketService.getCommentListPagination(ticket.id, null, 10000).subscribe(
                this._ticketService.getTicketListPagination(null, count).subscribe(
                    (res) => {
                        this._uiService.hideSpinner();


                        let array = res.json().data || [];
                        // console.log('res list:', array);
                        var uList = [];
                        for (let i = 0; i < array.length; i++) {
                            let u = this._mappingService.mapComment(array[i]);
                            uList.push(u);
                        }

                        this.ticketData.replyCount = uList.length;
                        this.ticketData.replyList = uList;



                        // this.ticketData.forEach((ticket, index) => {

                        this.ticketData.viewMoreReply = this.ticketData.replyList.length > 5 ? 5 : this.ticketData.replyList.length;
                        // this.ticketData[index].commentsDetail.viewMore = this.ticketData[index].commentsDetail.list.length > 5 ? 5 : 0;
                        this.ticketData.isReply = true;

                        //     ticket.commentList.forEach((comment, index1) => {
                        //         this.ticketData[index].commentList[index1].isEdit = false;
                        //     });
                        // });

                        // this.files = res.dashboard.caseStudies.files;
                        // console.log('ticketData', this.ticketData);
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
        // console.log('ticket', this.ticketData);

        let count = 0;
        // this.ticketData[index].commentsDetail.viewMore = 5;

        if (view >= total) {
            count = 0;
            // this.ticketData[index].commentsDetail.viewMore = count;
        }
        else {
            let check = total - view;

            count = check < 0 ? 0 : check;
            // this.ticketData[index].commentsDetail.viewMore += 5;
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

    addReply($event, ticketId, index) {
        this._uiService.showSpinner();
        let reply = '';
        reply += $event.target.value;
        console.log("ticketId", ticketId);
        console.log("reply", reply);

        this._ticketService.createReply(ticketId, null, reply).subscribe(
            (res) => {
                this._uiService.hideSpinner();
                $event.target.value = null;
                console.log('res', res);

                this.loadComment()
                // this.loadTicketDetail(ticketId, index)
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

    hideAllTicketEdit() {
        this.ticketData.isReply = true;

        this.ticketData.replyList.forEach((comment, index1) => {
            this.ticketData.replyList[index1].isEdit = false;
        });
    }

    onEdit(index) {
        this.hideAllTicketEdit();

        // console.log('ticketData', this.ticketData);

        console.log("index", index);
        console.log("ticketData.reply.length", this.ticketData.replyList.length);
        console.log("ticketData.reply.viewMore", this.ticketData.viewMoreReply);

        let count = this.ticketData.replyList.length - this.ticketData.viewMoreReply + index;
        console.log("count", count);


        this.ticketData.replyList[count].isEdit = true;
        this.ticketData.isReply = false;

    }

    onCancel(index) {

        console.log("index", index);

        let count = this.ticketData.replyList.length - this.ticketData.viewMoreReply + index;

        this.ticketData.replyList.forEach((comment, index1) => {
            this.ticketData.replyList[index1].isEdit = false;
        });
        this.ticketData.isReply = true;

    }

    updateComment($event, ticket: Ticket, replyId, index) {
        this._uiService.showSpinner();
        let reply = '';
        reply += $event.target.value;
        console.log("ticket", ticket);
        console.log("replyId", replyId);
        console.log("reply", reply);

        let count = this.ticketData.replyList.length - this.ticketData.viewMoreReply + index;

        this._ticketService.updateReply(ticket.id, replyId, reply).subscribe(
            (res) => {
                this._uiService.hideSpinner();
                // $event.target.value = null;
                this.ticketData.replyList[count].comment = reply;
                this.ticketData.replyList[count].isEdit = false;
                this.ticketData.isReply = true;
                console.log('res', res);

                // this.loadTicket(forum.id, index);
            },
            (err) => {
                console.log('err', err);
                this._uiService.hideSpinner();
            }
        );

    }

    deleteComment(index, replyId) {

        console.log("replyId", replyId);

        let count = this.ticketData.replyList.length - this.ticketData.viewMoreReply + index;
        // this.data.splice(index, 1);
        this.ticketData.replyList.splice(count, 1);

        const ticketId = this.ticketData.id;

        // this.loadTicketDetail(ticketId, index);

    }

    onDeleteComment(index, commentId) {
        // if (this.deletePermission) {
        const dialogRef = this.dialog.open(DeleteReplyTicket, {
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
        const dialogRef = this.dialog.open(DeleteReplyTicket, {
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

    loadTicketDetail(id) {
        this._uiService.showSpinner();

        this._ticketService.getSingleTicket(id).subscribe(
            (res) => {
                this._uiService.hideSpinner();
                console.log('res', res);


                let data: Ticket = this._mappingService.mapTicket(res.json().data)

                this.ticketData = data;
                // this.loadComment();
            },
            (err) => {
                console.log('err', err);
                this._uiService.hideSpinner();
            }
        );
    }

    mapTicket(newTicket) {

        this.ticketData.replyCount = newTicket.commentsDetail.count;
        this.ticketData.replyList = newTicket.commentsDetail.list;
        this.ticketData.viewMoreReply = newTicket.commentsDetail.list.length > this.ticketData.viewMoreReply ? this.ticketData.viewMoreReply : this.ticketData.replyList.length;

        this.ticketData.replyList.forEach((comment, index1) => {
            this.ticketData.replyList[index1].isEdit = false;
        });




    }

}
