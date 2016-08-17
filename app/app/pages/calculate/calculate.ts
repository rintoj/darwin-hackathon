import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {LineChart} from '../../components/line-chart';

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <button menuToggle>
          <ion-icon name='menu'></ion-icon>
        </button>
        <ion-title>       
        <img class="logo" src="images/logo.png"/> 
        </ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding class="calculate">
    <div class="banner" style="background:white">Projected Savings</div>
      <line-chart data="{{data}}"></line-chart>
      <div class="controls">
        <div class="banner">Choose the period</div>
        <ion-item class="item-borderless">
          <ion-range [(ngModel)]="period">
          </ion-range>
        </ion-item>
<div class="banner">Choose the amount</div>
        <ion-item>
          <ion-range [(ngModel)]="amount">

          </ion-range>
        </ion-item>
      </div>
    </ion-content>
  `,
  directives: [LineChart]
})
export class CalculatePage {

  private data: number[];
  constructor(private navCtrl: NavController) {
    this.data = [1000, 70];
  }
}