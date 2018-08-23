import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';
@Injectable()
export class VansService {
  baseURL = environment.baseURL;
  constructor(private http:Http) { }

  getList():Observable<any> {
    return this.http.get(`${this.baseURL}/van`)
      .map((res) => res.json());
  }
  
  newVan(form):Observable<any> {
    return this.http.post(`${this.baseURL}/van`,form)
      .map((res) => res.json());
  }
  
  getVan(id):Observable<any> {
    return this.http.get(`${this.baseURL}/van/${id}`)
      .map((res) => res.json());
  }

  edit(van):Observable<any> {
    return this.http.patch(`${this.baseURL}/van/${van.id}`, van)
      .map((res) => res.json());
  }
  
  remove(id):Observable<any> {
    return this.http.delete(`${this.baseURL}/van/${id}`)
      .map((res) => res.json());
  }


}
