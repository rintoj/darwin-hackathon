import { Injectable } from '@angular/core';
import { Goal } from '../models/goal';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Http, Response } from '@angular/http';

@Injectable()
export class GoalService {

    constructor(private http: Http) { }

    public fetch(): Observable<Goal[]> {
        // TODO: Change this to back-end service
        return Observable.create((observer: Observer<Goal[]>) => {
            observer.next([{
                id: '213974',
                type: 'travel',
                name: 'Trip to Barcelona',
                targetDate: '17th Sep 2016',
                amount: 350,
                priority: 1
            }, {
                    id: '123233',
                    type: 'rainy-day-fund',
                    name: 'Rainy day fund',
                    targetDate: '14th Dec 2016',
                    amount: 210,
                    priority: 1
                }, {
                    id: '213974',
                    type: 'home',
                    name: 'Dream Home',
                    targetDate: '2035',
                    amount: 350000,
                    priority: 1
                }, {
                    id: '213974',
                    type: 'life-after-60',
                    name: 'Life after 60',
                    targetDate: '2045',
                    amount: 150000,
                    priority: 1
                }]);
        });

        // return this.http.get('http://192.168.1.100:8080/davm/davmController/getCustomerGoal?custId=238501400A')
        //     .map((response: Response) => response.json());
    }

    public fetchGoalTypes(): Observable<Goal[]> {
        return Observable.create((observer: Observer<Goal[]>) => {
            observer.next([
                {
                    id: '213974',
                    type: 'travel',
                    name: 'Travel',
                }, {
                    id: '123233',
                    type: 'car',
                    name: 'Save for new car',
                }, {
                    id: '213974',
                    type: 'home',
                    name: 'Dream Home',
                }, {
                    id: '213974',
                    type: 'life-after-60',
                    name: 'Life after 60',
                }
            ]);
        });
    }
}
