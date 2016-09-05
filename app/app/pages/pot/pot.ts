import { Component } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import { BancsService } from '../../services/bancs.service';
import { formatCurrency } from '../../utils/formatter';

@Component({
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
    <ion-content padding class="pot">
        <div class="header-text">
          £ {{formatCurrency(sumAmount)}}
          <div class="divider"></div>
          <div class="subheader">as of 14th Aug 2016</div>
        </div>
         <div padding>
          <ion-segment [(ngModel)]="pet">
            <ion-segment-button value="All">
              All
            </ion-segment-button>
            <ion-segment-button value="Savings Account">
              Savings Account
            </ion-segment-button>
            <ion-segment-button value="Investments">
              Investments
            </ion-segment-button>
          </ion-segment>
        </div>
        <ion-list>
          <ion-item *ngFor="let pot of pots">
            <div class="title">{{pot.accountName}}</div>
            <div class="description">{{pot.pruAccount}}</div>
            <div class="amount">£ {{formatCurrency(pot.accountBalance)}}</div>
          </ion-item>
          <ion-item>
            <div class="title">Life at 60</div>
            <div class="description">Group Pensions Plan XX874</div>
            <div class="amount">£ {{formatCurrency(amount)}}</div>
          </ion-item>
      </ion-list>
      <button clear><ion-icon name="add"></ion-icon> Add New Account</button>
    </ion-content>
  `
})
export class PotPage {

  public sumAmount: number = 2305;
  public amount: number = 2305;
  public pots: any[];

  constructor(private bancsService: BancsService, private goalService: GoalService) { }

  ngAfterViewInit() {
    this.goalService.pots.subscribe((data: any) => {
      this.pots = data;
      this.calculateSum();
    });
    this.goalService.fetchPots();
    this.bancsService.getFaceAmount().subscribe((data: any) => {
      this.amount = parseInt(data + '');
      this.calculateSum();
    });
  }

  calculateSum() {
    this.sumAmount = this.amount || 0;
    if (this.pots !== undefined) {
      this.pots.forEach((p: any) => {
        this.sumAmount += p.accountBalance;
      });
    }
  }

  formatCurrency(amount: number): string {
    return formatCurrency(amount);
  }
}
