import { Todo } from '../../models/todo';
import {Component} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {NavController} from 'ionic-angular';

@Component({
    template: `
        <ion-header>
            <ion-navbar>
                <ion-title>Login</ion-title>
            </ion-navbar>
        </ion-header>

        <ion-content padding class="home">
            <ion-list>
                <ion-item>
                    <ion-label floating>Username</ion-label>
                    <ion-input type="text"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label floating>Password</ion-label>
                    <ion-input type="password"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-button>Login</ion-button>
                </ion-item>
            </ion-list>
        </ion-content>
    `
})
export class LoginPage {

    protected todos: Todo[] = [];

    constructor(
        private navCtrl: NavController,
        private todoService: TodoService
    ) {
        this.todoService.fetch().subscribe((data: any) => this.todos = data);
    }
}
