import { Component, OnInit } from '@angular/core';
import {AuthService}    from '../services/auth.service';
@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  user:any;
  err:string;
  constructor(private session : AuthService) { }
  
  ngOnInit() {
    this.session.isLoggedIn()
    .subscribe(user=>{
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
