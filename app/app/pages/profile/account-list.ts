import { Component } from '@angular/core';

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
    <ion-content padding class="account-list">
        <ion-list>
            <ion-list-header>
                Bank Accounts
            </ion-list-header>
            <ion-item>
              <ion-icon class="metro-logo" item-left></ion-icon>
              <div class="acc-name">Savings account</div>
              <div class="acc-number">XXX-XXX-343</div>
            </ion-item>
        </ion-list>
        <button clear (click)="addGoal()"><ion-icon name="add"></ion-icon> Add Account</button>
    </ion-content>
  `,
  styles: [`
    button {
        margin: 40px auto;
        display: block;
    }
  `]
})
export class AccountListPage {

}
