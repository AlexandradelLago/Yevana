import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  newUser = {email: '', password: '', username:''};
  user;error;
  constructor(private session: AuthService, private route: Router) { }

  signup() {
    this.session.signup(this.newUser)
    .subscribe(data => {
      console.log("vemos los datos")
      console.log(data);
      this.user = data;
      localStorage.setItem('user', JSON.stringify(data));
      this.session.login({username:this.user.username,password:this.user.password})
      .subscribe(data => {
        this.user = data;
        localStorage.setItem('user', JSON.stringify(data));
        switch (this.user.role) {
          case 'USER':
            this.route.navigate(['alquiler']);
          break;
          case 'ADMIN':
            this.route.navigate(['admin']);
          break;
        }
      });
    });
  }
  ngOnInit() {
  }

}
