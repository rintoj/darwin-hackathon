import { WelcomeComponent } from './pages/welcome/welcome';
import { Component } from '@angular/core';
import { StatusBar } from 'ionic-native';
import { TodoService } from './services/todo.service';
import { LoginService } from './services/login.service';
import { HTTP_PROVIDERS } from '@angular/http';
import { Platform, ionicBootstrap } from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'chart.js';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = WelcomeComponent;

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp,
  [
    HTTP_PROVIDERS, TodoService, LoginService
  ]);
