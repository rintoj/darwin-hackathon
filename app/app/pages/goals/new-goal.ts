import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Goal } from '../../models/goal';
import { GoalService } from '../../services/goal.service';
import { AddGoalPage } from './add-goal';

@Component({
  template: `
  
    <ion-header>
      <ion-navbar>
        <ion-title>       
        <img class="logo" src="images/logo.png"/> 
        </ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding class="new-goals">
        <h3>New Goal</h3>
        <ion-searchbar [(ngModel)]="searchText" [showCancelButton]="true"></ion-searchbar>
        <div padding>RECOMMENDED</div>
        <div>
          <div *ngFor="let goal of filteredGoals"
            [attr.class]="goal.type + ' card animate fadeInUp'"
            (click)="addGoal(goal)">
            <div class="title">{{goal.name}}</div>
            <ion-icon name="add"></ion-icon>
          </div>         
        </div>
    </ion-content>
  `
})
export class NewGoalPage {

  private goals: Goal[] = [];
  private searchText: string;

  constructor(
    private navController: NavController,
    private goalService: GoalService
  ) { }

  ngAfterViewInit() {
    this.goalService.fetchGoalTypes().subscribe((goals: Goal[]) => this.goals = goals);
  }

  get filteredGoals() {
    if (this.searchText === undefined || !(this.goals instanceof Array)) return this.goals;
    return this.goals.filter((goal: Goal) => goal.name.toLocaleLowerCase().indexOf(this.searchText.toLocaleLowerCase()) >= 0);
  }

  addGoal(goal: Goal) {
    this.navController.push(AddGoalPage, { goal: goal });
  }
}
