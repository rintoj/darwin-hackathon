import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService } from '../../services/chat.service';

@Component({
    template: `
        <ion-header>
            <ion-navbar>
                <ion-title>       
                    <img class="logo" src="images/logo.png"/> 
                </ion-title>
                <button right menuToggle>
                    <ion-icon name='more'></ion-icon>
                </button>
            </ion-navbar>
        </ion-header>
        <ion-content padding class="chat">
            <div class="chats">
                <div class="bubble" *ngFor="let chat of chats" [attr.me]="chat.me">
                    <span class="me">You:</span>  
                    <span [innerHTML]="chat.text"></span>
                    <div class="time">{{chat.time}}</div>
                </div>
            </div>
            <div class="chat-input">
                <input [(ngModel)]="inputText">
                <button clear (click)="postMessage()">Send</button>
            </div>
        </ion-content>
    `
})
export class ChatPage {

    protected inputText: string;
    protected chats: any[] = [];

    constructor(
        private navController: NavController,
        private chatService: ChatService
    ) { }

    ngAfterViewInit() {
        this.chatService.chats.subscribe((chats: any) => this.chats = chats);
    }

    postMessage() {
        if (this.inputText === undefined || this.inputText.trim() === '') return;
        this.chatService.post(this.inputText.trim());
    }

}