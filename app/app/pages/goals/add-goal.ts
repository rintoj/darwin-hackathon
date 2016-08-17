import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Goal } from '../../models/goal';
import { GoalService } from '../../services/goal.service';
import { formatAmount } from '../../utils/formatter';

@Component({
  template: `
  
    <ion-header class="add-goal">
      <ion-navbar>
        <ion-title>       
          <img class="logo" src="images/logo.png"/> 
        </ion-title>
        <button clear right class="save-btn" (click)="saveGoal()">Save</button>
      </ion-navbar>
    </ion-header>
    <ion-content padding class="add-goal">
        <div [attr.class]="goal?.type + ' header'">
          <h3>{{goal?.name}}</h3>
        </div>
        <div padding>
          <div class="range-item">
            <div class="title">Goal Amount</div>
            <div class="value">£ {{formatAmount(amount)}}</div>
            <ion-range [(ngModel)]="amount" min="10" max="5000"></ion-range>
          </div>
           <div class="range-item">
            <div class="title">In what time</div>
            <div class="value">{{formatPeriod(period)}}</div>
            <ion-range [(ngModel)]="period" min="1" max="1080"></ion-range>
          </div>
          <div class="range-item">
            <div class="title">HOW DO YOU WANT TO FUND THIS GOAL</div>
            <div class="list">
              <div class="list-item done" [attr.open]="openBank" (click)="openBank = !openBank">
                <ion-icon name="home"></ion-icon>
                <span>Setup a recurring bank transfer</span>
                <ion-icon name="checkmark-circle" class="checkmark"></ion-icon>
                <div class="content">
                  <div class="sample">A/C NO: XXX-XXX-XXX</div>
                  <button>DONE</button>
                </div>
              </div>
               <div class="list-item" [attr.open]="openPenceSavings" (click)="openPenceSavings = !openPenceSavings">
                <ion-icon name="home"></ion-icon>
                <span>Automated pence savings</span>
                <ion-icon name="checkmark-circle" class="checkmark"></ion-icon>
                <div class="content">
                  <div class="sample">A/C NO: XXX-XXX-XXX</div>
                  <button>DONE</button>
                </div>
              </div>
               <div class="list-item" [attr.open]="openTopup" (click)="openTopup = !openTopup">
                <ion-icon name="home"></ion-icon>
                <span>Topup with a one time fund</span>
                <ion-icon name="checkmark-circle" class="checkmark"></ion-icon>
                <div class="content">
                  <div class="sample">A/C NO: XXX-XXX-XXX</div>
                  <button>DONE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </ion-content>
  `
})
export class AddGoalPage {

  private goal: Goal;
  private period: number = 5;
  private amount: number = 10;
  private openBank: boolean = false;
  private openPenceSavings: boolean = false;
  private openTopup: boolean = false;

  constructor(
    private navController: NavController,
    private params: NavParams,
    private goalService: GoalService
  ) {
    this.goal = this.params.get('goal');
  }

  formatAmount(amount: number): string {
    return formatAmount(amount);
  }

  formatPeriod(period: number): string {
    if (period > 12) return Math.ceil(period / 12.0) + ' years';
    return `${period} months`;
  }

  saveGoal() {
    this.goalService.saveGoal({
      amount: this.amount,
      custGoalName: this.goal.name,
      custId: '238501400A',
      priority: 1,
      targetDate: this.period,
      goalTypeId: this.goal.id
    }).subscribe(() => {
      // go two pages back
      this.navController.pop().then(() => this.navController.pop());
    });
  }

}
