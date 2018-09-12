import { Component, OnInit } from '@angular/core';
import {AuthService}    from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user:any;
  err:string;
  constructor(private session : AuthService) { }
  
  ngOnInit() {

    this.session.isLoggedIn()
    .subscribe(user=>{
      console.log(user);
      this.user=user;
    });
  }

logout(){
  this.session.logout()
  .subscribe(m=>{
      console.log(m);
      console.log("loggedout")
  });
}


}