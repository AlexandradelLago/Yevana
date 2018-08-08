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

  booking:{_van,startDate,endDate,price,_id,paid,total,_user};


  constructor(private router : Router, private route: ActivatedRoute, 
    private bookingService:BookingService, private userService:UserService)  { }

  ngOnInit() {
      this.booking = JSON.parse(localStorage.getItem('user'));
      console.log(this.booking);


  }


  addClient(myForm){
  
    console.log("este es mi form "+myForm[0])
    //   console.log("este es mi formvalue"+myForm.value)
    //   console.log("estoy dentro de submit form")
      this.userService.newUser(myForm.value)
      .subscribe(u =>{
        console.log("dentro de userService NEW")
          console.log(JSON.stringify(u));
          this.booking._user=u._id;
          this.bookingService.updateBooking(this.booking);
  
      });
    }




}
