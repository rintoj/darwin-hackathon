import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

declare let facebook: any;

@Injectable()
export class FacebookService {

    private baseUrl: string = 'http://192.168.1.100:8080/davm/davmController';

    constructor(private http: Http) { }

    loginToFacebook() {
        facebook.init({ appId: '694735337223373' });
        facebook.login((response: any) => {
            console.debug('facebook response', response);
            if (response.status === 'connected') {
                window.localStorage.setItem('fbAccessToken', response.authResponse.accessToken);
                this.fetchFacebookFeed((messages: string[]) => {
                    this.pushMessages(messages);
                });
            }
        }, { scope: 'email,read_stream,publish_actions,user_relationships,user_relationship_details,user_posts' });
    }

    isConnectedToFacebook() {
        return window.localStorage.getItem('fbAccessToken') !== undefined;
    }

    fetchFacebookFeed(callback?: Function) {
        facebook.api({
            path: '/me/feed',
            success: function (data) {
                let filteredData = data.data.map((x) => x.message).filter((x) => x !== undefined);
                if (typeof callback === 'function') {
                    callback(filteredData);
                }
            },
            error: function (error) {
                console.error(error);
            }
        });
    }

    pushMessages(messages: string[]) {
        let observable = this.http.post(`${this.baseUrl}/userFBLogin`,
            {
                userFBid: 'john2.doe2@yahoo.com',
                fbMessages: messages
            })
            .map((response: Response) => response.json())
            .share()
            .subscribe();
    }
}