import { Goal } from '../../models/goal';
import { Component } from '@angular/core';
import { AccountList } from '../../components/account-list';
import { GoalService } from '../../services/goal.service';
import { formatAmount } from '../../utils/formatter';
import { NavParams, NavController } from 'ionic-angular';
import { ZooplaPage } from '../zoopla/zoopla';

@Component({
  directives: [AccountList],
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>       
        <img class="logo" src="images/logo.png"/> 
        </ion-title>
        <button right menuToggle>
          <ion-icon name='more'></ion-icon>
        </button>
      </ion-navbar>
    </ion-header>
    
    <ion-content padding class="goal">
        <div [attr.class]="goal?.type + ' header-text'">
          <ion-icon name="home"></ion-icon>
          <div class="subheader">{{goal?.name}}</div>
          <div class="amount">£ {{formatAmount(goal?.savedAmount)}} <span class="target-amount">of £ {{formatAmount(goal?.amount)}}</span> </div>
          <div class="note">by {{goal?.targetDate}} | Last payment: 20 days ago</div>          
        </div>

         <div class="card">
          <div class="title">Saving for a home?</div>
          <div class="content"> You can contribute £30 more towards this goal to achieve this in your target time.</div>
          <div class="topup-content">
            <account-list [accounts]="accounts"></account-list>
            <div class="amount-input">
            £ <input placeholder="Enter amount" [(ngModel)]="amount">
            </div>
          </div>
          <div class="action-bar">
            <button right (click)="topup()">Topup</button>
            <button clear>Ignore</button>
          </div>
        </div>      
        
        <div class="card" *ngIf="goal.type === 'home'">
          <div class="title">Products for you</div>
          <div class="content">Here are the products for you</div>
          <div class="action-bar">
            <button right (click)="topup()">Topup</button>
            <button clear>Ignore</button>
          </div>
        </div>  

        <div class="card" *ngIf="goal.type === 'home'">
          <div class="content">Search for homes in your budget range in <strong>zoopla</strong></div>          
          <div class="action-bar">
            <button right (click)="searchHomes()">SHOW HOMES</button>
            <button clear>Ignore</button>
          </div>
        </div>  
    </ion-content>
  `
})
export class GoalPage {

  private goal: Goal;
  private amount: number;
  private accounts: any[] = [
    {
      name: 'Savings account',
      accountNumber: 'XXX-XXX-343',
      selected: false
    }
  ];

  constructor(
    private navController: NavController,
    private params: NavParams,
    private goalService: GoalService
  ) {
    this.goal = params.get('goal');
  }

  formatAmount(amount: number): string {
    return formatAmount(amount);
  }

  topup() {
    this.goalService.topupGoal({
      id: this.goal.id,
      amount: this.amount,
      custId: '238501400A'
    }).subscribe((goal: any) => {
      this.goal = goal;
    });
  }

  searchHomes() {
    this.navController.push(ZooplaPage);
  }

}
