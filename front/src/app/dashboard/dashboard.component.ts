import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {VansService} from '../services/vans.service';
import {BookingService} from '../services/booking.service';
import {CalendarModule} from 'primeng/calendar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  vanList:any[]=[];
  bookingList:any[]=[];
  date:Date=new Date();
  constructor(private router:Router, private bookingService:BookingService,
  private vanService:VansService, private route:ActivatedRoute) { }

  ngOnInit() {
  this.vanService.getList()
    .subscribe((list)=>{

      // this.bookingService.getListBookingsByVan(params['id'])
      // .subscribe((bookingList)=>{
      //   this.bookingList=bookingList;
      //   //console.log(JSON.stringify(bookingList));
      //   bookingList.forEach(b=>{
      //     //this.results = [ ...this.results, ...data.results];
      //    // console.log("este es el array de dates del cada booking")
      //    // console.log(this.ArrayDates(b.startDate,b.totalDays))
      //     this.invalidDates =[...this.invalidDates,...this.ArrayDates(b.startDate,b.total)] 
      //  // console.log("dias reservados "+this.invalidDates)
      //     this.bookingListbyVan.push(b)
      //   });
      //   this.savedBookingListByVan=this.bookingList;
      //  // console.log(this.bookingListbyVan)
      //   //console.log(JSON.stringify(this.bookingListbyVan[0].startDate))
      //   //console.log(this.bookingListbyVan[0].startDate)
      // })
    })






}
   

}








