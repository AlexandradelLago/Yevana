import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()
export class SeasonService {
  baseURL = environment.baseURL+"/api";
  constructor(private http:Http) { }

  getList():Observable<any> {
    return this.http.get(`${this.baseURL}/season`)
      .map((res) => res.json());
  }
  
  newSeason(form):Observable<any> {
    return this.http.post(`${this.baseURL}/season`,form)
      .map((res) => res.json());
  }

  edit(season):Observable<any> {
    return this.http.patch(`${this.baseURL}/season/${season.id}`, season)
      .map((res) => res.json());
  }
  
  remove(id):Observable<any> {
    return this.http.delete(`${this.baseURL}/season/${id}`)
      .map((res) => res.json());
  }





}
