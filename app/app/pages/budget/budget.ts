import { Nudge } from '../../models/nudge';
import { Component } from '@angular/core';
import { NudgeComponent } from '../../components/nudge';
import { PieChart } from '../../components/pie-chart';
import { GoalService } from '../../services/goal.service';
import { BancsService } from '../../services/bancs.service';
import { formatCurrency } from '../../utils/formatter';

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
            <nudge [nudge]="nudge" *ngIf="nudge != undefined" (click)="onClick($event)"></nudge>
            <div class="card">
                <div class="half-card">
                    <div class="text">Balance today</div>
                    <div class="amount">£ {{formatCurrency(sumAmount)}}<span class="decimal">.00</span></div>
                </div>
                <div class="half-card">
                    <div class="text">Saved so far</div>
                    <div class="amount">£ {{formatCurrency(sumAmountSavings)}}<span class="decimal">.23</span></div>
                </div>
            </div>
            <div class="card">
                <div class="text" *ngIf="savings != undefined && savings.length > 0">Savings this week</div>
                <div class="text" *ngIf="savings == undefined || savings.length == 0">It seems you have no savings this week</div>
                <div class="row" *ngFor="let saving of savings">
                    <div class="col col-left">{{saving.savingName}}</div>
                    <div class="col col-right">£ {{saving.weeklySaving}}</div>
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

    protected nudge: Nudge;

    protected pots: any;
    protected amount: any;
    protected sumAmount: number = 0;

    protected savings: any;
    protected amountSavings: any;
    protected sumAmountSavings: number = 0;

    constructor(private bancsService: BancsService, private goalService: GoalService) { }

    ngAfterViewInit() {
        this.goalService.nudges.subscribe((data: any) => {
            if (data !== undefined) {
                if (!(data.buttons instanceof Array)) {
                    data.buttons = data.buttons.split('\|');
                }
                this.nudge = data;
            }
        });
        this.goalService.fetchNudges('homePage');

        this.goalService.pots.subscribe((data: any) => {
            this.pots = data;
            this.calculateSum();
        });
        this.goalService.fetchPots();

        this.bancsService.getFaceAmount().subscribe((data: any) => {
            this.amount = parseInt(data + '');
            this.calculateSum();
        });
        this.goalService.fetchPots();

        this.goalService.savings.subscribe((data: any) => {
            this.savings = data;
            this.calculateSavingsAmount();
        });
        this.goalService.fetchSavings();
    }

    calculateSum() {
        this.sumAmount = this.amount || 0;
        if (this.pots !== undefined) {
            this.pots.forEach((p: any) => {
                this.sumAmount += p.accountBalance;
            });
        }
    }

    calculateSavingsAmount() {
        this.sumAmountSavings = 0;
        if (this.savings !== undefined) {
            this.savings.forEach((s: any) => {
                this.sumAmountSavings += s.monthlySaving;
            });
        }
    }

    formatCurrency(amount: number): string {
        return formatCurrency(amount);
    }

    onClick(button) {
        if (button && button.srcElement && button.srcElement.innerHTML === 'Ignore') {
            console.log('here');
        }
        this.nudge = undefined;
    }
}