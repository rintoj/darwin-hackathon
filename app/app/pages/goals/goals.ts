import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LifeAfter60Page} from '../lifeAfter60/lifeAfter60';

@Component({
  template: `
    <ion-content padding class="goals">
        <div class="header-space"></div> 
        <div padding>
          <ion-segment [(ngModel)]="pet">
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
          <div class="card">
            <div class="title">Trip to Barcelona</div>
            <div class="content">£ 350 by 17th Sep</div>
          </div>
           <div class="card">
            <div class="title">Rainy day fund</div>
            <div class="content">£ 210 by 14th Dec</div>
          </div>
           <div class="card"  (click)="loadDreamHome()">
            <div class="title">Dream Home</div>
            <div class="content">£ 350K by 2035</div>
          </div>
          <div class="card">
            <div class="title">Life after 60</div>
            <div class="content">£ 150K by 2045</div>
          </div>
        </div>
        <button large clear><ion-icon name="add"></ion-icon> Add New Goal</button>
    </ion-content>
  `
})
export class GoalsPage {

  constructor(private navController: NavController) {

  }

  loadDreamHome() {
    console.log('here');
    this.navController.push(LifeAfter60Page);
  }
}
