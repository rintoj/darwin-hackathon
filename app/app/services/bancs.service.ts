
import { Todo } from '../models/todo';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class BancsService {

    constructor(private http: Http) { }
    
    public getFaceAmount(): any {
        return this.http.get('http://192.168.1.102:8080/davm/policyController/getPolicyDetails?bancsPolicyNo=234324324')
            .map((response: Response) => response.json());

    }

    
    
}