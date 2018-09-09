import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  vanList:any[]=[];
  bookingList:any[]=[];
  date:Date=new Date();
  constructor(private router:Router,
     private route:ActivatedRoute,
    private session : AuthService) { }

  ngOnInit() {
  this.session.isLoggedIn()
    .subscribe((user)=>{
      console.log("esta logeado")
    })






}
   

}








