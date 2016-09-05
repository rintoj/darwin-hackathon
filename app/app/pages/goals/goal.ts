import { Goal } from '../../models/goal';
import { Component } from '@angular/core';
import { AccountList } from '../../components/account-list';
import { GoalService } from '../../services/goal.service';
import { formatAmount } from '../../utils/formatter';
import { NudgeComponent } from '../../components/nudge';
import { NavParams, NavController } from 'ionic-angular';

@Component({
  directives: [AccountList, NudgeComponent],
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
          <div class="target-amount">Monthly target: £ {{formatAmount(goal?.monthlyAmount)}}</div>
          <div class="note">£ {{formatAmount(goal?.amount)}} by {{goal?.targetDate}}</div>          
        </div>

        <div class="card" *ngIf="goal?.type !== 'home'">
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
            <button clear (click)="ignore()">Ignore</button>
          </div>
        </div>      

        <div *ngIf="goal.type === 'home' && nudge != undefined && goal.accountSelected == 'Y'">
          <nudge [nudge]="nudge"></nudge>
        </div>
        <div class="title" *ngIf="goal.type === 'home' && goal.accountSelected != 'Y'">SAVE USING</div>
        <div class="card products" *ngIf="goal.type === 'home' && goal.accountSelected != 'Y'" [attr.topup]="topupScreen">
          <div class="product" *ngFor="let product of products" [attr.selected]="product.selected">
            <div class="title">{{product.name}}</div>
            <div class="badge" *ngIf="product.guaranteed">Guaranteed</div>
            <div class="content">{{product.description}}</div>

            <div class="prd-topup-section">
              <div class="topup-content">
                <div class="label">START WITH</div>
                <div class="amount-input">
                  <div class="amount-input-box">
                    £ <input type="number" placeholder="Enter amount" [(ngModel)]="amount">
                  </div>
                </div>
                <div class="label">USING</div>
                <account-list [accounts]="accounts"></account-list>

                <ion-item>
                  <ion-label>Validate my identity with bank</ion-label>
                  <ion-checkbox [(ngModel)]="validateMyIdentity"></ion-checkbox>
                </ion-item>
              </div>
              <div class="action-bar">
                <button right (click)="chooseAndTopup()">Confirm</button>
                <button clear (click)="removeSelection()">Cancel</button>
              </div>
            </div>      

            <div class="action-bar choose-action-bar">
              <button class="choose-btn" (click)="selectProduct(product)">Choose</button>
            </div>
          </div>

          <div class="product compare">
            <div class="content">People of your age group invest in:</div>
            <div class="relevance" *ngFor="let product of products" [style.width]="product.relevance + '%'">
              {{product.name}}
            </div>
            <div class="content">70% people like you choose PRU ISA</div>
          </div>

        </div>
    </ion-content>
  `
})
export class GoalPage {

  private goal: Goal;
  private amount: number;
  private topupScreen: boolean = false;
  private nudge: any;
  private validateMyIdentity: boolean = false;

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
      relevance: 40,
      selected: true
    }, {
      name: 'PRU ISA - STOCKS & SHARES',
      guaranteed: true,
      description: '2.0% guaranteed income and rest based on PruFund performance.',
      relevance: 80,
      recommended: true,
      selected: true
    }, {
      name: 'SIPP',
      description: 'Tax free, upto 1.4% return. withdrawal after age of 55',
      relevance: 30,
      selected: true
    }
  ];

  constructor(
    private navController: NavController,
    private params: NavParams,
    private goalService: GoalService
  ) {
    this.goal = params.get('goal');
  }

  ngAfterViewInit() {
    this.goalService.nudges.subscribe((data: any) => {
      if (data !== undefined) {
        if (!(data.buttons instanceof Array)) {
          data.buttons = data.buttons.split('\|');
        }
        this.nudge = data;
      }
    });
    this.goalService.fetchNudges('home');

  }

  formatAmount(amount: number): string {
    return formatAmount(amount);
  }

  topup() {
    if (this.amount !== null && (this.amount + '') !== '') {
      this.goalService.topupGoal({
        id: this.goal.id,
        amount: this.amount,
        custId: '238501400A'
      }).subscribe((goal: any) => {
        this.goal = goal;
        this.removeSelection();
      });
    }
  }

  chooseAndTopup() {
    if (this.validateMyIdentity === true && this.amount !== null && (this.amount + '') !== '') {
      this.goalService.chooseProduct({
        id: this.goal.id,
        custId: '238501400A'
      }).subscribe(() => {
        this.topup();
      });
    }
  }

  selectProduct(product) {
    (this.products || []).forEach((p: any) => p.selected = (p === product));
    this.topupScreen = true;
  }

  removeSelection() {
    (this.products || []).forEach((p: any) => p.selected = false);
    this.topupScreen = false;
  }

  ignore() {
    this.navController.pop();
  }
}
