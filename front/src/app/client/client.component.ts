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
        if (!sessionStorage.getItem('booking')) { this.router.navigate(['']); return; }
        this.booking = JSON.parse(sessionStorage.getItem('booking'));
  }


  addClient(myForm){
    this.router.navigate(['/mybookings']);
    console.log("este es mi form "+myForm.value)
      this.userService.newUser(myForm.value)
      .subscribe(u =>{
          console.log("este es mi usuario"+JSON.stringify(u));
          this.booking._user=u._id;
          this.bookingService.updateBooking(this.booking)
          .subscribe(b=>{
            console.log("este es mi boking updated"+JSON.stringify(b));
          });
  
      });
    }




}
