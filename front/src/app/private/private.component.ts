import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {VansService} from '../services/vans.service';
import {BookingService} from '../services/booking.service';
@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

user:Object= JSON.parse(localStorage.getItem('user'));
//booking:Object=JSON.parse(localStorage.getItem('booking'));

booking:Object={"startDate":"","endDate":"","price":"","total":"","_van":{"brand":""}};

constructor(private router : Router, private route: ActivatedRoute, private vansService:VansService
  , private bookingService:BookingService) { }

 bookingId:any;
  ngOnInit() {

    if (!sessionStorage.getItem('booking')&&!sessionStorage.getItem('user')) { this.router.navigate(['']); return; }
    console.log(this.user);
    console.log(this.booking);

this.route.params
    .subscribe ((params)=>{
      this.bookingId=params['id'];

      this.bookingService.getBooking(this.bookingId)
              .subscribe(b=>{
                console.log(this.booking);
                 this.booking=b;
              })
    })
  }

}
