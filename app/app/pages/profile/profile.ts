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
           <div class="title">{{address.ADDRTYP.toUpperCase()}}</div>
            <div>{{address.ADDRESS1}}, {{address.ADDRESS2}}</div>
            <div>{{address.CTYNAME}}, {{address.ZIPCD}}</div>
            <div></div>
          </div>
        </div>

        <div padding class="relation-card">
          <div class="title">FAMILY DETAILS</div>
          <div class="address" *ngFor="let address of profile?.FAMILYDETAILS">
           <div class="title">{{address.RELATIONSHIP.toUpperCase()}}</div>
            <div>{{address.NAME}}</div>
            <div>{{address.DESIGNATION}}</div>
          </div>
        </div>
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

  get address() {
    if (this.profile === undefined) return '';
    let address = (this.profile.POSTALADDRESS || [])
      .find((i: any) => i.ADDRTYP === 'Present');

    return `${address.ADDRESS2} ${address.CTYNAME} ${address.ZIPCD}`;
  }

}
