
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpService } from '../base/http.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Token } from '../../models/token';

import { AuthService } from "../auth/auth.service";
import { ForumFeed } from '../../models/forum';
import { Ticket, TicketAssignee } from '../../models/ticket';

@Injectable()
export class TicketService {

    constructor(
        private _http: HttpService,
        private _authService: AuthService
    ) { }

    createTicket(ticket: Ticket) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'ticket/create?userId=' + (userId || null) + '&requestType=portal';

        const body = {
            Title: ticket.title || null,
            Description: ticket.description || null,
            Priority: ticket.priority || null,
            Type: ticket.type || null,
            OtherType: ticket.otherType || null,
        };

        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    updateTicket(ticket: Ticket) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'ticket/update?userId=' + (userId || null) + '&ticketId=' + (ticket.id || null);


        const body = {
            Id: ticket.id || null,
            Title: ticket.title || null,
            Description: ticket.description || null,
            Priority: ticket.priority || null,
            Type: ticket.type || null,
            OtherType: ticket.otherType || null,
        };

        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    deleteTicket(ticketId) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'ticket/delete?userId=' + (userId || null) + '&ticketId=' + (ticketId || null);

        const body = {};

        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    getTicketListCount(searchKeyword, type, trackStatus, priority) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "ticket/list/count?userId=" + (userId || null) + "&searchKeyword=" + (searchKeyword || null) +
            "&type=" + (type || null) + "&trackStatus=" + (trackStatus || null) + "&priority=" + (priority || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    getTicketListPagination(pageNo, limit, searchKeyword, type, trackStatus, priority) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "ticket/list?userId=" + (userId || null) + "&pageNo=" + (pageNo || 0) + "&limit=" + (limit || 5) +
            "&searchKeyword=" + (searchKeyword || null) + "&type=" + (type || null) + "&trackStatus=" +
            (trackStatus || null) + "&priority=" + (priority || null);


        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    getSingleTicket(ticketId, getComment?: string) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'ticket/single?userId=' + (userId || null) + '&ticketId=' + (ticketId || null);

        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    createReply(ticketId, replyId, reply) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'ticket/reply/add?userId=' + (userId || null) + '&ticketId=' + (ticketId || null);

        const body = {
            // TicketId: ticketId || null,
            // TicketReplyId: replyId || null,
            // UserId: userId || null,
            Reply: reply || null,
        };
        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    updateReply(ticketId, replyId, reply) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        // let getUrl = 'ticket/reply/update?userId=' + (userId || null) + '&ticketId=' + (ticketId || null);
        let getUrl = 'ticket/reply/update?userId=' + (userId || null) + '&ticketReplyId=' + (replyId || null);
        const body = {
            // TicketId: ticketId || null,
            // TicketReplyId: replyId || null,
            // UserId: userId || null,
            Reply: reply || null,
        };
        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    deleteReply(replyId) {


        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'ticket/reply/delete?ticketReplyId=' + (replyId || null) + '&userId=' + (userId || null);

        const body = {
            // commentId: comtId ? comtId : null,
        };
        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    getReplyListCount(ticketId) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "forum/topic/comment/list/count?forumTopicId=" + (ticketId || null) + "&userId=" + (userId || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    getReplyListPagination(ticketId, pageNo, limit) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "forum/topic/comment/list?ticketId=" + (ticketId || null) + "&userId=" + (userId || null) + "&pageNo=" + (pageNo || 0) + "&limit=" + (limit || 5);


        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    assignTicket(ticketAssignee: TicketAssignee, ticket: Ticket) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;
        let getUrl = 'ticket/assign/?userId=' + (userId || null) + '&ticketId=' + (ticket.id || null);

        const body = {
            AssignToId: ticketAssignee.assignToId || null,
            AssignByDescription: ticketAssignee.assignByDescription || null,
        };

        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    updateTicketTrackStatus(ticket: Ticket, status: string) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;
        let getUrl = 'ticket/track/status/update?userId=' + (userId || null) + '&ticketId=' + (ticket.id || null) + '&trackStatus=' + (status || null);

        const body = {};

        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }
}
