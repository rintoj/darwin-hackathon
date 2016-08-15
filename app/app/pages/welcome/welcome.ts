import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { LoginComponent } from '../login/login';
import { TodoService } from '../../services/todo.service';

@Component({
    template: `
        <ion-content class="tutorial-page">
            <ion-slides #welcomeSlider pager>
                <ion-slide>
                    <ion-toolbar></ion-toolbar>
                    <img src="images/logo.png" class="slide-image"/>
                    <button large clear (click)="login()">
                        Continue
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
        todoService.bancsApi().subscribe((data: any) => {
            console.log(data);
        });
    }

    next() {
        this.slider.slideNext();
    }

    login() {
        this.navController.push(LoginComponent);
    }
}