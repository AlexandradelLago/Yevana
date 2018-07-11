import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser = {email: '', password: '', username:''};
  user;

  constructor(private session: AuthService, private route: Router) { }

  login() {
    this.session.login(this.newUser)
    .subscribe(data => {
      this.user = data;
      localStorage.setItem('user', JSON.stringify(data));
      switch (this.user.role) {
        case 'USER':
          this.route.navigate(['home']);
        break;
        case 'ADMIN':
          this.route.navigate(['dashboard']);
        break;
        // case 'COLABORATOR':
        //   this.route.navigate(['new']);
        // break;
      }
    });
  }

  ngOnInit() {
    // $(document).ready(function() {
    //   ($('.parallax') as any).parallax();
    // });

    if (!localStorage.getItem('user')) { return; }
     this.user = JSON.parse(localStorage.getItem('user'));
     this.route.navigate(['mypage']);
  }

}
