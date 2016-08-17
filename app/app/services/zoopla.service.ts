import { Injectable } from '@angular/core';
import { Goal } from '../models/goal';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

@Injectable()
export class ZooplaService {

    private baseUrl: string = 'http://192.168.1.100:8080/davm/davmController';
    public homes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(undefined);

    constructor(private http: Http) {
        // this.fillWithDummyData();
    }
    
    public fetch(): void {
        this.http.get(`${this.baseUrl}/findHomes?areaCode=South%20East%20England`)
            .map((response: Response) => response.json())
            .share()
            .subscribe((goals: any) => this.homes.next(goals));
    }
}
