import { Todo } from '../../models/todo';
import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ProgressChart } from '../../components/progress-chart';
import { NavController } from 'ionic-angular';

@Component({
  directives: [ProgressChart],
  template: `
  
    <ion-header>
      <ion-navbar>
        <button menuToggle>
          <ion-icon name='menu'></ion-icon>
        </button>
        <ion-title>
          <ion-icon name='home'></ion-icon>
          Lisa
        </ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content padding class="home">
      <progress-chart>
        <h2>Dream Home</h2>
      </progress-chart>
      <div class="banner">Add Fund</div>
      <div class="fund">
        <div class="text">How much would you like to add?</div>
        <div class="currency">$</div>
        <input type="text" class="fund-amount" [(ngModel)]="amount">
        <div padding>
          <ion-segment [(ngModel)]="pet">
            <ion-segment-button value="10" (click)="amount=10">
              $10
            </ion-segment-button>
            <ion-segment-button value="20" (click)="amount=20">
              $20
            </ion-segment-button>
            <ion-segment-button value="50" (click)="amount=50">
              $50
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

}
