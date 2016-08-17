import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Goal } from '../../models/goal';
import { GoalService } from '../../services/goal.service';

@Component({
  template: `
  
    <ion-header>
      <ion-navbar>
        <ion-title>       
        <img class="logo" src="images/logo.png"/> 
        </ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding class="add-goal">
        <div [attr.class]="goal?.type + ' header'">
          <h3>{{goal?.name}}</h3>
        </div>
    </ion-content>
  `
})
export class AddGoalPage {

  private goal: Goal;

  constructor(
    private navController: NavController,
    private params: NavParams,
    private goalService: GoalService
  ) {
    this.goal = this.params.get('goal');
  }

}
