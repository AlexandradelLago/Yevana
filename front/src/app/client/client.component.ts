import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {BookingService} from '../services/booking.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
booking:any={};
 // booking:{_van,startDate,endDate,price,_id,paid,total,_user};
  email;password;username;
  newUser:any={username:"",email:"",password:""};
  constructor(private router : Router, private route: ActivatedRoute, 
    private bookingService:BookingService, private user:UserService)  { }

  ngOnInit() {
        if (!sessionStorage.getItem('booking')) { this.router.navigate(['']); return; }
        this.booking = JSON.parse(sessionStorage.getItem('booking'));
  }


  addClient(myForm){
   
    console.log("este es mi form "+myForm.value)
      this.user.newUser(myForm.value)
      .subscribe(u =>{
          console.log("este es mi usuario"+JSON.stringify(u));
       
          this.booking._user=u._id;
          this.bookingService.updateBooking(this.booking)
          .subscribe(b=>{
            this.router.navigate([`/mybookings/${b._id}`]);
            console.log("este es mi boking updated"+JSON.stringify(b));
          });
  
      });
    }




}