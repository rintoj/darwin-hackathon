import { Goal } from '../../models/goal';
import { Component } from '@angular/core';
import { AccountList } from '../../components/account-list';
import { GoalService } from '../../services/goal.service';
import { formatAmount } from '../../utils/formatter';
import { NavParams, NavController } from 'ionic-angular';

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
          <div class="amount">£ {{formatAmount(goal?.savedAmount)}}</div>
          <div class="target-amount">Monthly target: £ {{formatAmount(goal?.amount)}}</div>
          <div class="note">by {{goal?.targetDate}} | Last payment: 20 days ago</div>          
        </div>

         <div class="card">
          <div class="title">Saving for a home?</div>
          <div class="content"> You can contribute £30 more towards this goal to achieve this in your target time.</div>
          <div class="topup-content">
            <account-list [accounts]="accounts"></account-list>
            <div class="amount-input">
            £ <input type="number" placeholder="Enter amount" [(ngModel)]="amount">
            </div>
          </div>
          <div class="action-bar">
            <button right (click)="topup()">Topup</button>
            <button clear>Ignore</button>
          </div>
        </div>      
        <div class="title" *ngIf="goal.type === 'home'">RELATED PRODUCTS</div>
        <div class="card products" *ngIf="goal.type === 'home'">
          <div class="product" *ngFor="let product of products">
            <div class="title">{{product.name}}</div>
            <div class="badge" *ngIf="product.guaranteed">Guaranteed</div>
            <div class="content">{{product.description}}</div>
            <div class="action-bar">
              <button>Choose</button>
            </div>
          </div>

          <div class="product compare">
            <div class="content">People of your age group invest in:</div>
            <div class="relevance" *ngFor="let product of products" [style.width]="product.relevance + '%'">
              {{product.name}}
            </div>
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

  private products: any[] = [
    {
      name: 'PRU CASH ISA',
      description: '0.5% Interest. You can withdraw your money at any point.',
      relevance: 40
    }, {
      name: 'PRU ISA - STOCKS & SHARES',
      guaranteed: true,
      description: '2.0% guaranteed income and rest based on PruFund performance.',
      relevance: 80,
      recommended: true
    }, {
      name: 'SIPP',
      description: 'Tax free. Can be withdrawn only after 55 years.',
      relevance: 30
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
}
