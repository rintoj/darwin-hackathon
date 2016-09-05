import {Component, Input} from '@angular/core';
import { Account } from '../models/account';

@Component({
    selector: 'account-list',
    template: `
     <ion-list>
        <ion-item *ngFor="let account of accounts" (click)="selectAccount(account)">
            <ion-icon class="metro-logo" item-left></ion-icon>
            <div class="acc-name">{{account.name}}</div>
            <div class="acc-number">{{account.accountNumber}}</div>
            <ion-icon name="ios-arrow-down" item-right></ion-icon>
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

    ngOnChanges() {
        if (this.accounts !== undefined && this.accounts.length > 0) {
            this.selectAccount(this.accounts[0]);
        }
    }

    selectAccount(account) {
        (this.accounts || []).forEach((item: Account) => {
            item.selected = (item === account);
        });
    }
}