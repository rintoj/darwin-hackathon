import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
    template: `
        <ion-content padding class="login">
            <div class="title">
                <h1>Sign In</h1>
                <div class="note">Good to see you again</div>
            </div>

            <div class="form">
                <input type="text" [(ngModel)]="userId">
                <input type="password" [(ngModel)]="password">
            
                <button large clear (click)="login()">Login</button>
            </div>
        </ion-content>
    `
})
export class LoginComponent {

    private userId: string = 'jardson.araujo@gmail.com';
    private password: string = 'password';

    constructor(public navCtrl: NavController) { }

    login() {
        this.navCtrl.push(TabsPage);
    }

}