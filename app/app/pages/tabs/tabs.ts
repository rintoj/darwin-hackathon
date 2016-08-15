import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {CalculatePage} from '../calculate/calculate';
import {ContactPage} from '../contact/contact';

@Component({
  template: `
    <ion-menu [content]="mycontent">
      <ion-content>
        Conte is here
      </ion-content>
    </ion-menu>
    <ion-header>
      <ion-navbar>
        <button menuToggle>
          <ion-icon name='menu'></ion-icon>
          <ion-nav #mycontent [root]="rootPage"></ion-nav>
        </button>
        <ion-title>       
        <img class="logo" src="images/logo.png"/> 
        </ion-title>
      </ion-navbar>
    </ion-header>


    <ion-tabs>


      <ion-tab [root]="homePage" tabTitle="Overview" tabIcon="home"></ion-tab>
      <ion-tab [root]="calculatePage" tabTitle="Calculate" tabIcon="information-circle"></ion-tab>      

    </ion-tabs>
  `
})
export class TabsPage {

  private homePage: any;
  private calculatePage: any;
  private contactPage: any;
  private loginPage: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.homePage = HomePage;
    this.calculatePage = CalculatePage;
    this.contactPage = ContactPage;
  }
}
