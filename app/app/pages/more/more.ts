import { Component } from '@angular/core';

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
                <ion-item>
                    Facebook
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
            </ion-list>
        </ion-content>
    `
})
export class MorePage {

}