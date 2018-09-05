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
  email;password;name;



  constructor(private router : Router, private route: ActivatedRoute, 
    private bookingService:BookingService, private userService:UserService)  { }

  ngOnInit() {
     
      console.log(this.booking);
        if (!localStorage.getItem('booking')) { this.router.navigate(['']); return; }
        this.booking = JSON.parse(localStorage.getItem('booking'));
  }


  addClient(myForm){
    this.router.navigate(['']);
    console.log("este es mi form "+myForm.value)
    //   console.log("este es mi formvalue"+myForm.value)
    //   console.log("estoy dentro de submit form")
      this.userService.newUser(myForm.value)
      .subscribe(u =>{
        console.log("dentro de userService NEW")
          console.log("este es mi usuario"+JSON.stringify(u));
          this.booking._user=u._id;
          console.log(this.booking);
          this.bookingService.updateBooking(this.booking)
          .subscribe(b=>{
            console.log("este es mi boking updated"+JSON.stringify(b));
           
          });
  
      });
    }




}
