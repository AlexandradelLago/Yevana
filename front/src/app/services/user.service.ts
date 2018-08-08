import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// importo para usar la api del back
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  baseURL = environment.baseURL;
  constructor(private http:Http) { }


  getList() {
    return this.http.get(`${this.baseURL}/`)
      .map((res) => res.json());
  }
  
  newUser(form) {
    console.log(form);
    return this.http.post(`${this.baseURL}/new`,form)
      .map((res) => res.json());
  }
  
  getUser(id) {
    return this.http.get(`${this.baseURL}/user/${id}`)
      .map((res) => res.json());
  }

  edit(van) {
    return this.http.patch(`${this.baseURL}/edit/${van.id}`, van)
      .map((res) => res.json());
  }
  
  remove(id) {
    return this.http.delete(`${this.baseURL}/delete/${id}`)
      .map((res) => res.json());
  }

}
