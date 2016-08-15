import { User } from '../models/user';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class LoginService {

    private url: string = 'http://192.168.1.106:8080/davm/davmController/userLogin';

    constructor(private http: Http) { }

    public login(userName: string, password: string): Observable<User> {
        return Observable.create((observer: Observer<User>) => {
            observer.next({
                status: 'true'
            });
            observer.complete();
        });
        
        // return this.http.post(this.url, {
        //     userName: userName,
        //     userPwd: password
        // }).map((response: Response) => response.json());
    }

}