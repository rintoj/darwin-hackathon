import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {LoginPage} from '../login/login';

@Component({
  template: `
    <ion-tabs>
      <ion-tab [root]="homePage" tabTitle="Home" tabIcon="home"></ion-tab>
      <ion-tab [root]="aboutPage" tabTitle="About" tabIcon="information-circle"></ion-tab>
      <ion-tab [root]="contactPage" tabTitle="Contact" tabIcon="contacts"></ion-tab>
      <ion-tab [root]="loginPage" tabTitle="Login" tabIcon="lock"></ion-tab>
    </ion-tabs>
  `
})
export class TabsPage {

  private homePage: any;
  private aboutPage: any;
  private contactPage: any;
  private loginPage: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.homePage = HomePage;
    this.aboutPage = AboutPage;
    this.contactPage = ContactPage;
    this.loginPage = LoginPage;
  }
}
