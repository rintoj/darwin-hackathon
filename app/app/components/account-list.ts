import {Component, Input} from '@angular/core';
import { Account } from '../models/account';

@Component({
    selector: 'account-list',
    template: `
     <ion-list>
        <ion-item *ngFor="let account of accounts" (click)="selectAccount(account)">
            <ion-icon name="i-halifax-logo" item-left></ion-icon>
            <div class="acc-name">{{account.name}}</div>
            <div class="acc-number">{{account.accountNumber}}</div>
            <ion-icon *ngIf="account.selected == false" name="ios-radio-button-off" item-right></ion-icon>
            <ion-icon *ngIf="account.selected == true" name="ios-radio-button-on" item-right></ion-icon>
        </ion-item>
    </ion-list>
    `,
    styles: [`
        .acc-name {
            color: #777676;
            font-weight: bold;
        }
        .acc-number {
            font-size: .7em;
            color: #777676;
        }
        ion-icon.ion-ios-radio-button-on.item-icon {
            color: #00bb9c;
        }
    `] 
})
export class AccountList {
    @Input()
    accounts: Account[];

    selectAccount(account) {
        (this.accounts || []).forEach((item: Account) => {
            item.selected = (item === account);
        });
    }
}