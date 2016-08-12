import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';

@Component({
  template: `
    <ion-tabs>
      <ion-tab [root]="homePage" tabTitle="Overview" tabIcon="home"></ion-tab>
      <ion-tab [root]="aboutPage" tabTitle="Customize" tabIcon="information-circle"></ion-tab>      
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
  }
}
