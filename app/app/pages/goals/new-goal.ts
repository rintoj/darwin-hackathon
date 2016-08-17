import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
    <ion-content padding class="new-goals">
        <h3>New Goal</h3>
        <ion-searchbar [showCancelButton]="true"></ion-searchbar>
        <div padding>RECOMMENDED</div>
        <div>
          <div *ngFor="let goal of goals" [attr.class]="goal.type + ' card'">
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
}
