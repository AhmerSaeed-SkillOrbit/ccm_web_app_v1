
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpService } from '../base/http.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Token } from '../../models/token';

import { AuthService } from "../auth/auth.service";
import { ForumFeed } from '../../models/forum';

@Injectable()
export class ForumService {

    constructor(
        private _http: HttpService,
        private _authService: AuthService
    ) { }

    createForumTopic(forum: ForumFeed) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'forum/topic/add';

        let ts = [];
        if (forum.tags && forum.tags.length > 0) {
            forum.tags.forEach(element => {
                ts.push({ Id: element.id })
            });
        }

        const body = {
            UserId: userId || null,
            Title: forum.title || null,
            Description: forum.description || null,
            // Tag: forum.tags,
            Tag: ts,
        };

        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    updateForumTopic(forum: ForumFeed) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'forum/topic/update';

        let ts = [];
        if (forum.tags && forum.tags.length > 0) {
            forum.tags.forEach(element => {
                ts.push({ Id: element.id })
            });
        }

        const body = {
            Id: forum.id || null,
            UserId: userId || null,
            Title: forum.title || null,
            Description: forum.description || null,
            // Tag: forum.tags,
            Tag: ts,
        };

        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    deleteForumTopic(forumTopicId) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'forum/topic/delete?userId=' + (userId || null) + '&forumTopicId=' + (forumTopicId || null);

        const body = {};

        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    getTopicListCount() {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "forum/topic/list/count?userId=" + (userId || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    getTopicListPagination(pageNo, limit) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "forum/topic/list?userId=" + (userId || null) + "&pageNo=" + (pageNo || 0) + "&limit=" + (limit || 5);


        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    getSingleNewsFeed(forumTopicId, getComment?: string) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'forum/topic/single?userId=' + (userId || null) + '&forumTopicId=' + (forumTopicId || null) + '&comment=' + (getComment || 'no');

        return this._http.get(getUrl)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    getCampaignComment(campId) {

        let getUrl = 'campaign/comments';

        const body = {
            campaignId: campId ? campId : null
        };
        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map(res => res.json().genericResponse.genericBody.data)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    updateEmotion(campId, emotion, emoId) {

        let getUrl = 'campaign/give/emotion';

        const body = {
            campaignId: campId ? campId : null,
            emotion: emotion ? 'like' : "dislike",
            // id: emoId ? emoId : null,y
        };
        // return this._http.post(getUrl, body)
        return this._http.put(getUrl, body)
            .map(res => res.json().genericResponse.genericBody.data)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    createComment(forumId, commentId, comment) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'forum/topic/comment/add';

        const body = {
            ForumTopicId: forumId || null,
            ForumTopicCommentId: commentId || null,
            UserId: userId || null,
            Comment: comment || null,
        };
        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    updateComment(forumId, commentId, comment) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'forum/topic/comment/update';
        const body = {
            ForumTopicId: forumId || null,
            ForumTopicCommentId: commentId || null,
            UserId: userId || null,
            Comment: comment || null,
        };
        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    deleteComment(comtId) {


        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'forum/topic/comment/delete?forumTopicCommentId=' + (comtId || null) + '&userId=' + (userId || null);

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

    getCommentListCount(forumTopicId) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "forum/topic/comment/list/count?forumTopicId=" + (forumTopicId || null) + "&userId=" + (userId || null);

        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    getCommentListPagination(forumTopicId, pageNo, limit) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = "forum/topic/comment/list?forumTopicId=" + (forumTopicId || null) + "&userId=" + (userId || null) + "&pageNo=" + (pageNo || 0) + "&limit=" + (limit || 5);


        return this._http.get(getUrl, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }
}
