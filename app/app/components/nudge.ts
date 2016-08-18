import { Nudge } from '../models/nudge';
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'nudge',
    template: `
        <div class="nudge">
            <div class="card">
                <div class="icon"><ion-icon name="ios-information-circle-outline"></ion-icon></div>
                <div class="card-body">
                    <div class="content">{{nudge?.text}}</div>
                    <div class="note">
                        <ion-icon name="logo-facebook"></ion-icon>
                        We found this information in facebook.
                    </div>
                    <div class="action-bar">
                        <button right *ngFor="let buttonTxt of nudge?.buttons; let i = index" 
                            [clear]="i != 0" 
                            (click)="onButtonClick(buttonTxt)">{{buttonTxt}}</button>
                    </div>
                </div>
            </div>   
        </div>   
    `
})
export class NudgeComponent {
    @Input()
    nudge: Nudge[];

    @Output()
    click: EventEmitter<any> = new EventEmitter<any>();

    onButtonClick(button) {
        this.click.next(button);
    }
}