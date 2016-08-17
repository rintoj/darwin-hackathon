import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {Goal} from '../../models/goal';

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
    <ion-content padding class="goal">
        <div class="header-text">
          <ion-icon name="home"></ion-icon>
          <div class="subheader">Dream Home</div>
          <div>£ 4,234 </div>
          <div class="note">Goal Target 2035 | Last payment: 20 days ago</div>
          <div class="note">£ 120 Monthly Recurring Deposit</div>
        </div>
        
        <div class="card">
          <div class="title">Saving for a home?</div>
          <div class="content"> You can contribute £30 more towards this goal to achieve this in your target time.</div>
          <div class="action-bar">
            <button clear right>Topup</button>
          </div>
        </div>      
    </ion-content>
  `
})
export class GoalPage {

  private goal: Goal;

  constructor(private params: NavParams) {
    this.goal = params.get('goal');
  }

}
