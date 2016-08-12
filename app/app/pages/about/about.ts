import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {LineChart} from '../../components/line-chart';

@Component({
  templateUrl: 'build/pages/about/about.html',
    directives: [LineChart]
})
export class AboutPage {

  private data:number[];
  constructor(private navCtrl: NavController) {
    this.data=[1000,70];
  }
}