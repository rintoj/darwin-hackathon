import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {LineChart} from '../../components/line-chart';

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>
          About
        </ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content padding class="calculate">
      <line-chart data="{{data}}"></line-chart>
      <div class="controls">
        <div class="banner">Choose the period</div>
        <ion-item class="item-borderless">
          <ion-range [(ngModel)]="period">
          </ion-range>
        </ion-item>

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