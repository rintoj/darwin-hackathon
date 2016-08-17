import { Injectable } from '@angular/core';
import { Goal } from '../models/goal';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

@Injectable()
export class GoalService {

    private baseUrl: string = 'http://192.168.1.100:8080/davm/davmController';
    public goals: BehaviorSubject<Goal[]> = new BehaviorSubject<Goal[]>(undefined);
    public goalTypes: BehaviorSubject<Goal[]> = new BehaviorSubject<Goal[]>(undefined);
    public lastKnownFilter: string = 'all';

    constructor(private http: Http) {
        this.fillWithDummyData();
    }

    public fillWithDummyData() {
        this.goals.next([
            {
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
            }
        ]);

        this.goalTypes.next([
            {
                id: '213974',
                type: 'travel',
                name: 'Trip to Barcelona'
            }, {
                id: '123233',
                type: 'rainy-day-fund',
                name: 'Rainy day fund'
            }, {
                id: '213974',
                type: 'home',
                name: 'Dream Home'
            }, {
                id: '213974',
                type: 'life-after-60',
                name: 'Life after 60'
            }
        ]);
    }

    public fetch(filter: string): void {
        this.lastKnownFilter = filter;
        this.http.get(`${this.baseUrl}/getCustomerGoal?custId=238501400A&filter=${filter}`)
            .map((response: Response) => response.json())
            .share()
            .subscribe((goals: any) => this.goals.next(goals));
    }

    public fetchGoalTypes(): void {
        this.http.get(`${this.baseUrl}/getGoalMaster`)
            .map((response: Response) => response.json())
            .share()
            .subscribe((goals: any) => this.goalTypes.next(goals));
    }

    public saveGoal(goal: any): Observable<any> {
        let observable = this.http.post(`${this.baseUrl}/addCustomerGoals`, goal).share();
        observable.subscribe(() => this.fetch(this.lastKnownFilter));
        return observable;
    }

    public topupGoal(goal: any): Observable<any> {
        let observable = this.http.post(`${this.baseUrl}/topupGoal`, goal).share();
        observable.subscribe(() => this.fetch(this.lastKnownFilter));
        return observable;
    }
}
