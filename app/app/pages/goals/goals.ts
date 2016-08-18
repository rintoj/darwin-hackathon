import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Goal } from '../../models/goal';
import { GoalPage } from './goal';
import { GoalService } from '../../services/goal.service';
import { formatAmount } from '../../utils/formatter';
import { NewGoalPage } from './new-goal';

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
    
    <ion-content padding class="goals">
        <div padding>
          <ion-segment>
            <ion-segment-button value="All" (click)="changeFilter('all')">
              All
            </ion-segment-button>
            <ion-segment-button value="Missions" (click)="changeFilter('missions')">
              Missions
            </ion-segment-button>
            <ion-segment-button value="Milestones" (click)="changeFilter('milestones')">
              Milestones
            </ion-segment-button>
          </ion-segment>
        </div>
        <div>
          <div *ngFor="let goal of goals" [attr.class]="goal.type + ' card'" (click)="loadGoal(goal)">
            <div class="title">{{goal.name}}</div>
            <div class="content"><strong>£ {{formatAmount(goal.amount)}}</strong> by {{goal.targetDate}}</div>
            <ion-icon name="ios-arrow-forward"></ion-icon>
          </div>         
        </div>
        <button clear (click)="addGoal()"><ion-icon name="add"></ion-icon> Add New Goal</button>
    </ion-content>
  `
})
export class GoalsPage {

  private goals: Goal[] = [];
  private filter: string = 'all';

  constructor(
    private navController: NavController,
    private goalService: GoalService
  ) { }

  ngAfterViewInit() {
    this.goalService.goals.subscribe((goals: Goal[]) => this.goals = goals);
    this.goalService.fetch(this.filter);
  }

  formatAmount(amount: number): string {
    return formatAmount(amount);
  }

  loadGoal(goal: Goal) {
    this.navController.push(GoalPage, {
      goal: goal
    });
  }

  addGoal() {
    this.navController.push(NewGoalPage);
  }

  changeFilter(filter: string) {
    this.filter = filter;
    this.goalService.fetch(this.filter);
  }
}
