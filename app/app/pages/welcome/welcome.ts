import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

@Component({
    template: `
        <ion-content padding class="tutorial-page">
            <ion-slides #welcomeSlider pager>
                <ion-slide>
                    <img src="images/logo.png" class="slide-image"/>
                    <button large clear (click)="login()">
                        Login
                        <ion-icon name="arrow-forward"></ion-icon>
                    </button>
                </ion-slide>
            </ion-slides>
        </ion-content>
    `
})
export class WelcomeComponent {

    @ViewChild('welcomeSlider') slider: Slides;

    constructor(private navController: NavController) {
        
    }

    next() {
        this.slider.slideNext();
    }

    login() {
        this.navController.push(LoginPage);
    }

}