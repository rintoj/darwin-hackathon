import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

declare let facebook: any;

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

    loginWithFacebook() {
        facebook.init({ appId: '694735337223373' });
        facebook.login((response: any) => {
            console.debug('facebook response', response);
            if (response.status === 'connected') {
                window.localStorage.setItem('fbAccessToken', response.authResponse.accessToken);
                this.navController.push(TabsPage);
            }
        }, { scope: 'email,read_stream,publish_actions,user_relationships,user_relationship_details,user_posts' });
    }
}