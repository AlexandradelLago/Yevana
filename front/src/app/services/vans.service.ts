import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';
@Injectable()
export class VansService {
  baseURLVans = environment.baseURL + 'alquiler/vans';
  constructor(private http:Http) { }


  getList(){
    return this.http.get(this.baseURLVans)
    .map(res => res.json());
  }

  newBooking(): Object{
    return {};
  }



}
