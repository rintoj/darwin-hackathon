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
            <div class="title">
            <div class="note">Please come back later</div>
            </div>
        </ion-content>
    `
})
export class MorePage {

}