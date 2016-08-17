import { Nudge } from '../../models/nudge';
import { Component } from '@angular/core';
import { NudgeComponent } from '../../components/nudge';
import { PieChart } from '../../components/pie-chart';

@Component({
    directives: [NudgeComponent, PieChart],
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
            <div class="card">
                <div class="half-card">
                    <div class="text">Balance today</div>
                    <div class="amount">£ 3,450<span class="decimal">.00</span></div>
                </div>
                <div class="half-card">
                    <div class="text">Saved so far</div>
                    <div class="amount">£ 256<span class="decimal">.23</span></div>
                </div>
            </div>
            <div class="card">
                <div class="text">Savings this week</div>
                <div class="row">
                    <div class="col col-left">Oyster savings</div><div class="col col-right">£2.30</div>
                    <div class="col col-left">Tesco Meal deal</div><div class="col col-right">£0.38</div>
                    <div class="col col-left">Orion Stand up comedy</div><div class="col col-right">£5.40</div>
                </div>
            </div>
            <div class="card">
                <div class="text">Spending by category</div>
                <pie-chart></pie-chart>
            </div>
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