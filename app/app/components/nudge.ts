import {Component, Input} from '@angular/core';
import { Nudge } from '../models/nudge';

@Component({
    selector: 'nudge',
    template: `
        <div class="nudge">
            <div class="card">
                <div class="icon"><ion-icon [name]="nudge?.icon"></ion-icon></div>
                <div class="card-body">
                    <div class="content">{{nudge?.text}}</div>
                    <div class="note">
                        <ion-icon [name]="nudge?.noteIcon"></ion-icon>
                        {{nudge?.note}}
                    </div>
                    <div class="action-bar">
                        <button right *ngFor="let button of nudge?.buttons; let i = index" [clear]="i != 0">{{button}}</button>
                    </div>
                </div>
            </div>   
        </div>   
    `
})
export class NudgeComponent {
    @Input()
    nudge: Nudge[];
}