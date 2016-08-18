import { Injectable } from '@angular/core';
import { Goal } from '../models/goal';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

@Injectable()
export class CustomerService {

    private baseUrl: string = 'http://192.168.1.102:8080/davm/davmController';
    public profile: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(undefined);

    constructor(private http: Http) { }

    public fetch(): void {
        this.http.get(`${this.baseUrl}/getCustomerInfo?customerNumber=238501400A`)
            .map((response: Response) => response.json())
            .share()
            .subscribe((data: any) => this.profile.next(data));
    }
}
