import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Goal } from '../../models/goal';
import { GoalService } from '../../services/goal.service';
import { LifeAfter60Page } from '../lifeAfter60/lifeAfter60';
import { formatAmount } from '../../utils/formatter';

@Component({
  template: `
    <ion-content padding class="goals">
        <div class="header-space"></div> 
        <div padding>
          <ion-segment>
            <ion-segment-button value="All">
              All
            </ion-segment-button>
            <ion-segment-button value="Missions">
              Missions
            </ion-segment-button>
            <ion-segment-button value="Milestones">
              Milestones
            </ion-segment-button>
          </ion-segment>
        </div>
        <div>
          <div *ngFor="let goal of goals" [attr.class]="goal.type + ' card'">
            <div class="title">{{goal.name}}</div>
            <div class="content"><strong>£ {{formatAmount(goal.amount)}}</strong> by {{goal.targetDate}}</div>
            <ion-icon name="ios-arrow-forward"></ion-icon>
          </div>         
        </div>
        <button large clear><ion-icon name="add"></ion-icon> Add New Goal</button>
    </ion-content>
  `
})
export class GoalsPage {

  private goals: Goal[] = [];

  constructor(
    private navController: NavController,
    private goalService: GoalService
  ) { }

  ngAfterViewInit() {
    this.goalService.fetch().subscribe((goals: Goal[]) => this.goals = goals);
  }

  formatAmount(amount: number): string {
    return formatAmount(amount);
  }

  loadDreamHome() {
    this.navController.push(LifeAfter60Page);
  }
}
