import { Component } from '@angular/core';
import { BancsService } from '../../services/bancs.service';

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
          £ 4,617
          <div class="divider"></div>
          <div class="subheader">as of 14th Aug 2016</div>
        </div>
         <div padding>
          <ion-segment [(ngModel)]="pet">
            <ion-segment-button value="All">
              All
            </ion-segment-button>
            <ion-segment-button value="Savings Account">
              Savings Account
            </ion-segment-button>
            <ion-segment-button value="Investments">
              Investments
            </ion-segment-button>
          </ion-segment>
        </div>
        <ion-list>
          <ion-item>
            <div class="title">Barcelona Trip Account</div>
            <div class="description">Pru Cash ISA Account XX2332</div>
            <div class="amount">£ 310</div>
          </ion-item>
           <ion-item>
            <div class="title">Oyster Card Account</div>
            <div class="description">Pru Cash ISA Account XX6572</div>
            <div class="amount">£ 180</div>
          </ion-item>
          <ion-item>
            <div class="title">Emergency Fund</div>
            <div class="description">Pru Cash ISA Account XX3454</div>
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
export class PotPage {

  public amount: string = '0';

  constructor(private bancsService: BancsService) { }

  ngAfterViewInit() {
    this.bancsService.getFaceAmount().subscribe((data: any) => this.amount = data);
  }
}
