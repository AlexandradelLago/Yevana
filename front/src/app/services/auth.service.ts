import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  options = {withCredentials: true};
  constructor(private http: Http) { }
  baseURL = environment.baseURL;

  
  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(this.baseURL + `/signup`, user, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(this.baseURL + `/login`, user, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(this.baseURL + `/logout`, {})
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(this.baseURL + `/loggedin`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getPrivateData() {
    return this.http.get(this.baseURL + `/private`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}