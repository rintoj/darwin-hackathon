
import { Todo } from '../models/todo';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class TodoService {

    constructor(private http: Http) { }

    public fetch(): Observable<Todo> {
        return this.http.get('http://localhost:3000/api/todo')
            .map((response: Response) => response.json());
    }
}