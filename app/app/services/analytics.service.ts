import { Injectable } from '@angular/core';

declare let ga: any;
@Injectable()
export class AnalyticsService {

    track(eventCategory: string, eventAction: string, eventLabel?: string, eventValue?: string): void {
        ga.trackEvent(eventCategory, eventAction, eventLabel, eventValue);
    }
}