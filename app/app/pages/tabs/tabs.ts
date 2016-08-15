import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {CalculatePage} from '../calculate/calculate';
import {ContactPage} from '../contact/contact';
import {MenuController} from 'ionic-angular';
 
@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>
          <img class="logo" src="images/logo.png"/> 
          <ion-icon name="settings" class="settings" (click)="toggleMenu()"></ion-icon>
        </ion-title>
      </ion-navbar>
    </ion-header>

    <ion-menu side="right" [content]="mainContent">
      <ion-content>
        <ion-list>
            <ion-icon name="close" menuClose ion-item detail-none></ion-icon>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-tabs #mainContent>
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

  constructor(public menuCtrl: MenuController) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.homePage = HomePage;
    this.calculatePage = CalculatePage;
    this.contactPage = ContactPage;
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
}
