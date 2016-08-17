import { Nudge } from '../../models/nudge';
import { Component } from '@angular/core';
import { NudgeComponent } from '../../components/nudge';

@Component({
    directives: [NudgeComponent],
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
        <ion-content padding class="budget">
            <nudge *ngFor="let nudge of nudges" [nudge]="nudge"></nudge>
        </ion-content>
    `
})
export class BudgetPage {

    protected nudges: Nudge[] = [
        {
            text: `Hello Daria. Congratulations on your new job.  40% of users replan their investments after a pay raise. We recommed too.`,
            note: `We got this information from Facebook`,
            buttons: ['Replan', 'Ignore'],
            icon: 'ios-information-circle-outline',
            noteIcon: 'logo-facebook'
        }
    ];
}