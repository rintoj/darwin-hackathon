import { TabsPage } from './pages/tabs/tabs';
import { Component } from '@angular/core';
import { StatusBar } from 'ionic-native';
import { TodoService } from './services/todo.service';
import { HTTP_PROVIDERS } from '@angular/http';
import { Platform, ionicBootstrap } from 'ionic-angular';

import 'rxjs/add/operator/map';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [HTTP_PROVIDERS, TodoService]
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
