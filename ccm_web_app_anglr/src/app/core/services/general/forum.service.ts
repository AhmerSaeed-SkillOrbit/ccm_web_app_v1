
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpService } from '../base/http.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Token } from '../../models/token';

import { AuthService } from "../auth/auth.service";
import { Forum } from '../../models/forum';

@Injectable()
export class ForumService {

    constructor(
        private _http: HttpService,
        private _authService: AuthService
    ) { }

    createForumTopic(forum: Forum) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'forum/topic/add';

        // let t = [];

        // if (forum.tags && forum.tags.le) {

        // }

        const body = {
            UserId: userId || null,
            Title: forum.title || null,
            Description: forum.description || null,
            Tag: forum.tags,
        };

        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    updateForumTopic(forum: Forum) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'forum/topic/update';

        // let t = [];

        // if (forum.tags && forum.tags.le) {

        // }

        const body = {
            Id: forum.id || null,
            UserId: userId || null,
            Title: forum.title || null,
            Description: forum.description || null,
            Tag: forum.tags,
        };

        // return this._http.post(getUrl, body)
        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            });

    }

    deleteForumTopic(forum: Forum) {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        let userId = token.userId;

        let getUrl = 'forum/topic/delete?userId=' + (userId || null) + '&forumTopicId=' + (forum.id || null);

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

    getSingleNewsFeed(entityType, campId) {

        console.log('entityType', entityType);
        console.log('campId', campId);
        let getUrl = '';
        const body = {
            campaignId: campId ? campId : null
        };

        if (entityType === 'brand') {
            getUrl = 'newsfeed/org/side/single?campaignId=' + body.campaignId;

        }
        if (entityType === 'influencer') {
            getUrl = 'newsfeed/worker/side/single?campaignId=' + body.campaignId;
        }

        // return this._http.post(getUrl, body)
        return this._http.get(getUrl)
            .map(res => res.json().genericResponse.genericBody.data)
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
