import { Component } from '@angular/core';

@Component({
    template: `
        <ion-content padding class="budget">
            <div class="header-space"></div>
            <div class="header-text">
                Your last 3 months of spending allocation is represented below. How would you like to optimize your spending?
            </div>
            <div class="grid">
                <div class="row">
                    <div class="col fill" amount="£ 10">Family</div>
                    <div class="col">Education</div>
                    <div class="col">Home</div>
                </div>
                <div class="row">
                    <div class="col">Transport</div>
                    <div class="col">Food</div>
                    <div class="col">Holiday</div>
                </div>
                <div class="row">
                    <div class="col">Hobbies</div>
                    <div class="col">Pensions</div>
                    <div class="col">Bills</div>
                </div>
            </div>
        </ion-content>
    `
})
export class BudgetPage {

}