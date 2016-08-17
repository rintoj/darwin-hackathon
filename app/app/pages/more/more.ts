import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { FacebookService } from '../../services/facebook.service';

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
        <ion-content padding class="more">
            <div class="header">Connections</div>
            <ion-list>
                <ion-list-header>
                    Finance
                </ion-list-header>
                <ion-item>
                    Bank Accounts <ion-badge item-right secondary>1 connected</ion-badge>
                    <ion-icon name="ios-arrow-forward" item-right></ion-icon>
                </ion-item>
                <ion-item>
                    Credit Cards
                    <ion-icon name="ios-arrow-forward" item-right></ion-icon>
                </ion-item>
                <ion-item>
                    Investments
                    <ion-icon name="ios-arrow-forward" item-right></ion-icon>
                </ion-item>
                <ion-item>
                    Pensions
                    <ion-icon name="ios-arrow-forward" item-right></ion-icon>
                </ion-item>
                <ion-item>
                    Income
                    <ion-icon name="ios-arrow-forward" item-right></ion-icon>
                </ion-item>
                <ion-list-header>
                    Social
                </ion-list-header>
                <ion-item (click)="loginToFacebook()">
                    Facebook
                    <ion-badge item-right secondary *ngIf="isConnectedToFacebook()">connected</ion-badge>
                    <ion-icon name="ios-arrow-forward" item-right></ion-icon>
                </ion-item>
                <ion-item>
                    LinkedIn
                    <ion-icon name="ios-arrow-forward" item-right></ion-icon>
                </ion-item>
                <ion-item>
                    Instagram
                    <ion-icon name="ios-arrow-forward" item-right></ion-icon>
                </ion-item>

                <ion-list-header>
                    Help
                </ion-list-header>
                <ion-item (click)="openChat()">
                    Chat with us
                    <ion-icon name="ios-arrow-forward" item-right></ion-icon>
                </ion-item>
            </ion-list>
        </ion-content>
    `
})
export class MorePage {

    constructor(
        private navController: NavController,
        private facebookService: FacebookService
    ) { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.facebookService.fetchFacebookFeed((messages: string[]) => {
                this.facebookService.pushMessages(messages);
            });
        }, 1000);
    }

    loginToFacebook() {
        return this.facebookService.loginToFacebook();
    }

    isConnectedToFacebook() {
        return this.facebookService.isConnectedToFacebook();
    }

    openChat() {
        this.navController.push(ChatPage);
    }

}