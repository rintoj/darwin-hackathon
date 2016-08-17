import { Component } from '@angular/core';
import { ZooplaService } from '../../services/zoopla.service';

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
        <ion-content padding class="zoopla">
            <div class="header">Zoopla</div>
            <ion-list>
                <ion-list-header>
                    Homes
                </ion-list-header>
                <ion-item *ngFor="let home of homes" (click)="openHomeUrl(home)">
                    <ion-avatar item-left>
                        <img [src]="home.thumbnailUrl">
                    </ion-avatar>
                    <div class="price">£ {{home.price}}</div>
                    <div class="address">{{home.displayableAddress}}</div>
                    <div class="bedrooms">{{home.numBedrooms}} Bedrooms</div> 
                    <ion-icon name="ios-arrow-forward" item-right></ion-icon>
                </ion-item>
            </ion-list>
        </ion-content>
    `
})
export class ZooplaPage {

    private homes: any[];

    constructor(private zooplaService: ZooplaService) { }

    ngAfterViewInit() {
        this.zooplaService.homes.subscribe((homes: any[]) => {
            this.homes = homes;
        });
        this.zooplaService.fetch();
    }

    openHomeUrl(home) {
        window.open(home.detailsUrl);
    }

}