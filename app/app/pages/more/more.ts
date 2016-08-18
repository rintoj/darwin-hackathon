import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
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
            
        </ion-content>
    `
})
export class MorePage {

    constructor(
        private navController: NavController
    ) { }


    openChat() {
        this.navController.push(ChatPage);
    }

}