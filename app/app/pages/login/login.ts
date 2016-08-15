import { User } from '../../models/user';
import { TabsPage } from '../tabs/tabs';
import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NavController } from 'ionic-angular';
// import {Toast} from 'ionic-native';

@Component({
    template: `
        <ion-content padding class="login">
            <div class="title">
                <h1>Sign In</h1>
                <div class="note">Good to see you again</div>
                <div class="error" [class.show]="loginError">It seems you got it wrong.</div>
            </div>

            <div class="form">
                <input type="text" [(ngModel)]="userId">
                <input type="password" [(ngModel)]="password">
            
                <button large clear (click)="login()">Login</button>
            </div>
        </ion-content>
    `
})
export class LoginPage {

    private userId: string = 'john.doe';
    private password: string = 's3cret';
    private loginError: boolean = false;

    constructor(
        private navCtrl: NavController,
        private loginService: LoginService
    ) { }

    login() {
        this.loginError = false;
        this.loginService.login(this.userId, this.password).subscribe((user: User) => {
            if (user.status === 'false') {
                this.loginError = true;
            } else {
                // Toast.show('Login successful', 'short', 'bottom').subscribe();
                this.navCtrl.push(TabsPage);
            }
        });
    }

}