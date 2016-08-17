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
                <ion-item>
                    <ion-icon name="leaf" item-left></ion-icon>
                    Herbology
                    <ion-icon name="rose" item-right></ion-icon>
                </ion-item>
            </ion-list>
        </ion-content>
    `
})
export class MorePage {

}