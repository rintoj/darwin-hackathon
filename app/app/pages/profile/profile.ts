import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  template: `
    <ion-header>
        <ion-navbar>
            <ion-title>       
            <img class="logo" src="images/logo.png"/> 
            </ion-title>
            <button right menuToggle>
            <ion-icon name='more'></ion-icon>
            </button>
        </ion-navbar>
    </ion-header>
    <ion-content padding class="pot">
        <div class="header-text">
          {{profile?.PARTYNAME?.FIRSTNAME}} {{profile?.PARTYNAME?.LASTNAME}}
          <div class="divider"></div>
          <div class="subheader">{{profile?.GENERAL?.EMAIL?.toLowerCase()}}</div>
        </div>
        <ion-list>
          <ion-item>
            <div class="title">Barcelona Trip Account</div>
            <div class="description">Halifax Savings Account XX2332</div>
            <div class="amount">£ 310</div>
          </ion-item>
           <ion-item>
            <div class="title">Oyster Card Account</div>
            <div class="description">Halifax Savings Account XX6572</div>
            <div class="amount">£ 180</div>
          </ion-item>
           <ion-item>
            <div class="title">Emergency Fund</div>
            <div class="description">HSBC Current Account XX3454</div>
            <div class="amount">£ 850</div>
          </ion-item>
           <ion-item>
            <div class="title">Life at 60</div>
            <div class="description">Group Pensions Plan XX874</div>
            <div class="amount">£ {{amount}}</div>
          </ion-item>
      </ion-list>
        <button large clear><ion-icon name="add"></ion-icon> Add New Account</button>
      
    </ion-content>
  `
})
export class ProfilePage {

  public profile: any;

  constructor(private customerService: CustomerService) { }

  ngAfterViewInit() {
    this.customerService.profile.subscribe((data: any) => this.profile = data);
    this.customerService.fetch();
  }

}
