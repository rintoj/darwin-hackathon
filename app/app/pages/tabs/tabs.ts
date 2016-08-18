import {Component} from '@angular/core';
import {ProfilePage} from '../profile/profile';
import {ChatPage} from '../chat/chat';
import {ContactPage} from '../contact/contact';
import {BudgetPage} from '../budget/budget';
import {GoalsPage} from '../goals/goals';
import {PotPage} from '../pot/pot';
import {MorePage} from '../more/more';
import {MenuController, NavController} from 'ionic-angular';

@Component({
  template: `
   

    <ion-menu side="right" [content]="mainContent">
      <ion-content>
        <ion-list>
            <ion-icon name="close" menuClose ion-item detail-none></ion-icon>
            <ion-item-divider></ion-item-divider>
            <button clear (click)="logout()"><ion-icon name="key"></ion-icon> Logout</button>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-tabs #mainContent>
      <ion-tab swipeBackEnabled [root]="budgetPage" tabTitle="Home" tabIcon="i-home"></ion-tab>      
      <ion-tab swipeBackEnabled [root]="goalsPage" tabTitle="Goals" tabIcon="i-goals"></ion-tab>
      <ion-tab swipeBackEnabled [root]="potPage" tabTitle="Pot" tabIcon="i-piggybank"></ion-tab>      
      <ion-tab swipeBackEnabled [root]="profilePage" tabTitle="Profile" tabIcon="i-profile"></ion-tab>      
      <ion-tab swipeBackEnabled [root]="chatPage" tabTitle="Help" tabIcon="i-more"></ion-tab>      
    </ion-tabs>
  `
})
export class TabsPage {

  private homePage: any;
  private profilePage: any;
  private contactPage: any;
  private budgetPage: any;
  private goalsPage: any;
  private potPage: any;
  private loginPage: any;
  private chatPage: any;

  constructor(
    private menuCtrl: MenuController,
    private navController: NavController
  ) {
    this.profilePage = ProfilePage;
    this.contactPage = ContactPage;
    this.budgetPage = BudgetPage;
    this.goalsPage = GoalsPage;
    this.potPage = PotPage;
    this.chatPage = ChatPage;
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  logout() {
    this.navController.popToRoot();
  }
}