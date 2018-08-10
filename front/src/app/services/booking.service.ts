import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// me falta handle error

import { environment } from '../../environments/environment';
@Injectable()
export class BookingService {
  baseURL = environment.baseURL;
  constructor(private http:Http) { }

  getListBookings():Observable<any> {
    return this.http.get(`${this.baseURL}/booking`)
      .map((res) => res.json());
  }

  getListBookingsByVan(_van):Observable<any> {
    return this.http.get(`${this.baseURL}/booking/van/${_van}`)
      .map((res) => res.json());
  }
  
  newBooking(values):Observable<any> {
    return this.http.post(`${this.baseURL}/booking`,values)
      .map((res) => res.json())
      .catch((e: any) => Observable.throw(alert(e._body)));
  }

 updateBooking(booking):Observable<any> {
  return this.http.patch(`${this.baseURL}/booking/${booking._id}`,booking)
    .map((res) => res.json())
    .catch((e: any) => Observable.throw(alert(e._body)));
}
  getBooking(id):Observable<any> {
    return this.http.get(`${this.baseURL}/booking/${id}`)
      .map((res) => res.json());
  }

  editBooking(booking):Observable<any> {
    return this.http.patch(`${this.baseURL}/booking/${booking.id}`, booking)
      .map((res) => res.json());
  }
  
  removeBooking(id) {
    return this.http.delete(`${this.baseURL}/booking/${id}`)
      .map((res) => res.json());
  }


}
