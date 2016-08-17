import { Todo } from '../../models/todo';
import { Component } from '@angular/core';
import { ProgressChart } from '../../components/progress-chart';
import { NavController } from 'ionic-angular';

@Component({
  directives: [ProgressChart],
  template: `
    <ion-content padding class="home">
      <progress-chart>
        <h2>Dream Home</h2>
      </progress-chart>
      <div class="fund"> 
        <div class="text">Fund your LISA account</div>
        <div class="currency">£</div>
        <input type="text" class="fund-amount" [(ngModel)]="amount">
        <div padding>
          <ion-segment [(ngModel)]="pet">
            <ion-segment-button value="10" (click)="amount=10">
              £ 10
            </ion-segment-button>
            <ion-segment-button value="20" (click)="amount=20">
              £ 20
            </ion-segment-button>
            <ion-segment-button value="50" (click)="amount=50">
              £ 50
            </ion-segment-button>
          </ion-segment>
        </div>
        <button>  <ion-icon name="add"></ion-icon>Add Fund </button>
      </div>
    </ion-content>
  `
})
export class HomePage {

  protected amount: number = 5;

  constructor(public navCtrl: NavController) { }

}
