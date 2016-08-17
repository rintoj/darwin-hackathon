import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import {Goal} from '../../models/goal';
import { formatAmount } from '../../utils/formatter';
import { AccountList } from '../../components/account-list';
import {GoalService} from '../../services/goal.service';

@Component({
  directives: [AccountList],
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>
          <img class="logo" src="images/logo.png"/> 
          <ion-icon name="settings" class="settings" (click)="toggleMenu()"></ion-icon>
        </ion-title>
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
            <button clear right (click)="topup()">Topup</button>
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
    }, {
      name: 'Salary account',
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
    }).subscribe((goal: any) => this.goal = goal);
  }

}
