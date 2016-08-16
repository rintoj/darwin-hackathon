import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TodoService } from '../../services/todo.service';
import { facebook } from '../../utils/facebook';

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
                    <button large clear (click)="loginWithFacebook()" style="color: #0062ff">
                        Login with facebook
                        <ion-icon name="arrow-forward"></ion-icon>
                    </button>
                </ion-slide>
            </ion-slides>
        </ion-content>
    `
})
export class WelcomeComponent {

    @ViewChild('welcomeSlider') slider: Slides;

    constructor(todoService: TodoService, private navController: NavController) {
        // todoService.bancsApi().subscribe((data: any) => {
        //     console.log(data);
        // });
    }

    next() {
        this.slider.slideNext();
    }

    login() {
        this.navController.push(LoginPage);
    }

    loginWithFacebook() {
        facebook.login((a: any) => console.log(a), { } );
    }
}