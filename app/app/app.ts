import { WelcomeComponent } from './pages/welcome/welcome';
import { TabsPage } from './pages/tabs/tabs';
import { Component } from '@angular/core';
import { StatusBar } from 'ionic-native';
import { BancsService } from './services/bancs.service';
import { LoginService } from './services/login.service';
import { GoalService } from './services/goal.service';
import { FacebookService } from './services/facebook.service';
import { ZooplaService } from './services/zoopla.service';
import { CustomerService } from './services/customer.service';
import { HTTP_PROVIDERS } from '@angular/http';
import { Platform, ionicBootstrap } from 'ionic-angular';

import 'rxjs/add/operator/map';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = WelcomeComponent;
    // this.rootPage = TabsPage;

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp,
  [
    HTTP_PROVIDERS,
    BancsService,
    LoginService,
    GoalService,
    FacebookService,
    ZooplaService,
    CustomerService
  ]);
