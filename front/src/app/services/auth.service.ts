import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/';
import { environment } from '../../environments/environment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class AuthService {
  options = {withCredentials: true};
  baseURL = environment.baseURL+"/api";


  constructor(private http: Http, public toast : ToastsManager) { }
  
  
  handleError(e) {
    // var error = e._body.substring(12, e._body.length - 2);
    // this.toast.error(error);
    return Observable.throw(e.json().message);
  }

  signup(user) {
    
    return this.http.post(this.baseURL + `/user/signup`, user, this.options)
      .map(res => res.json())
      .catch(err=>this.handleError(err));
  }

  login(user) {
    return this.http.post(this.baseURL + `/user/login`, user, this.options)
      .map(res => res.json())
      .catch(err=>this.handleError(err));
  }

  logout() {
    return this.http.post(this.baseURL + `/user/logout`, {})
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(this.baseURL + `/user/loggedin`, this.options)
      .map(res => res.json())
      .catch(err=>this.handleError(err));
  }

  // getPrivateData() {
  //   return this.http.get(this.baseURL + `/private`, this.options)
  //     .map(res => res.json())
  //     .catch(this.handleError);
  // }
}