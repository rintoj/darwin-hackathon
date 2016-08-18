import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FacebookService } from '../../services/facebook.service';

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
    <ion-content padding class="profile">
        <div class="header-text">
          <img src="images/daria.png">
          {{profile?.PARTYNAME?.FIRSTNM}} {{profile?.PARTYNAME?.LASTNM}}
          <div class="divider"></div>
          <div class="subheader">{{profile?.GENERAL?.AGE}} {{profile?.GENERAL?.GENDER}}</div>
          <div class="subheader">{{address}}</div> 
        </div>

        <div padding>
          <div class="title">ADDRESS</div>
          <div class="address" *ngFor="let address of profile?.POSTALADDRESS">
           <div class="title sub-title">{{address.ADDRTYP}}</div>
            <div>{{address.ADDRESS1}}, {{address.ADDRESS2}}</div>
            <div>{{address.CTYNAME}}, {{address.ZIPCD}}</div>
            <div></div>
          </div>
        </div>

        <div padding class="relation-card">
          <div class="title">FAMILY DETAILS</div>
          <div class="address" *ngFor="let address of profile?.FAMILYDETAILS">
           <div class="title sub-title">{{address.RELATIONSHIP}}</div>
            <div>{{address.NAME}}</div>
            <div>{{address.DESIGNATION}}</div>
          </div>
        </div>

        <div padding class="relation-card">
          <div class="title">CONNECTIONS</div>
        </div>
        <ion-list>
            <ion-list-header>
                Finance
            </ion-list-header>
            <ion-item>
                Bank Accounts <ion-badge item-right secondary>1 connected</ion-badge>
                <ion-icon name="ios-arrow-forward" item-right></ion-icon>
            </ion-item>
            <ion-item>
                Credit Cards
                <ion-icon name="ios-arrow-forward" item-right></ion-icon>
            </ion-item>
            <ion-item>
                Investments
                <ion-icon name="ios-arrow-forward" item-right></ion-icon>
            </ion-item>
            <ion-item>
                Pensions
                <ion-icon name="ios-arrow-forward" item-right></ion-icon>
            </ion-item>
            <ion-item>
                Income
                <ion-icon name="ios-arrow-forward" item-right></ion-icon>
            </ion-item>
            <ion-list-header>
                Social
            </ion-list-header>
            <ion-item (click)="loginToFacebook()">
                Facebook
                <ion-badge item-right secondary *ngIf="isConnectedToFacebook()">connected</ion-badge>
                <ion-icon name="ios-arrow-forward" item-right></ion-icon>
            </ion-item>
            <ion-item>
                LinkedIn
                <ion-icon name="ios-arrow-forward" item-right></ion-icon>
            </ion-item>
            <ion-item>
                Instagram
                <ion-icon name="ios-arrow-forward" item-right></ion-icon>
            </ion-item>
        </ion-list>
    </ion-content>
  `
})
export class ProfilePage {

  public profile: any;

  constructor(
    private customerService: CustomerService,
    private facebookService: FacebookService
  ) { }

  ngAfterViewInit() {
    this.customerService.profile.subscribe((data: any) => this.profile = data);
    this.customerService.fetch();

    setTimeout(() => {
      this.facebookService.fetchFacebookFeed((messages: string[]) => {
        this.facebookService.pushMessages(messages);
      });
    }, 1000);
  }

  loginToFacebook() {
    return this.facebookService.loginToFacebook();
  }

  isConnectedToFacebook() {
    return this.facebookService.isConnectedToFacebook();
  }

  get address() {
    if (this.profile === undefined) return '';
    let address = (this.profile.POSTALADDRESS || [])
      .find((i: any) => i.ADDRTYP === 'Present');

    return `${address.ADDRESS2} ${address.CTYNAME} ${address.ZIPCD}`;
  }

}
