import { Injectable } from '@angular/core';
import { Goal } from '../models/goal';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

@Injectable()
export class ChatService {

    private baseUrl: string = 'http://192.168.1.100:8080/davm/davmController';
    public chats: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(undefined);
    private chatArray: any[] = [
        {
            text: 'Hello PAL, I have £10,000, where shall I invest?',
            me: true,
            time: '1 mins ago'
        }, {
            text: 'Great Daria, We can recommend an advisor to you.',
            me: false,
            time: 'now'
        }
    ];

    constructor(private http: Http) {
        this.chats.next(this.chatArray);
    }

    public post(message: string): void {
        this.chatArray.push({
            text: message,
            me: true,
            time: 'now'
        });
        this.chats.next(this.chatArray);
        this.http.get(`${this.baseUrl}/getHelpChat?postMessage=${message}`)
            .map((response: Response) => response.json())
            .share()
            .subscribe((data: any) => {
                setTimeout(() => {
                    ((data && data.helpContent) || []).map((content) => {
                        this.chatArray.push({
                            text: content.header,
                            me: false,
                            time: 'now'
                        });
                    });
                    this.chats.next(this.chatArray);
                }, 1500);
            });

    }
}
