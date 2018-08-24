import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {VansService} from '../services/vans.service';
import {BookingService} from '../services/booking.service';
import * as $ from 'jquery';
import { JsonpModule } from '../../../node_modules/@angular/http';
import { getComponentViewDefinitionFactory } from '../../../node_modules/@angular/core/src/view';
import {CalendarModule} from 'primeng/calendar';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  
  van; savedVan;
  vanId: String;
  today:Date;
  booking;
  bookingList;
  invalidDates:Date[]=[];
  bookingListbyVan:any[]=[];savedBookingListByVan:Object[];
  minDateSeason:Date= new Date("2018-06-10");maxDateValue:Date=new Date("2018-09-15");
  minDateValue;
  startDate;endDate; _van;
  constructor(private router : Router, private route: ActivatedRoute, private vansService:VansService
  , private bookingService:BookingService) { }

  ngOnInit() {
    // $(document).ready(function(){
    //   (<any>$('.datepicker') ).datepicker();
    // });
    
    this.minDateValue = this.getMinDateValue(this.minDateSeason);

    this.route.params
      .subscribe ((params)=>{ 
        this.vanId = params['id'];
        console.log(this.vanId);
        this.vansService.getVan(params['id'])
                             .subscribe((van)=> {
                               console.log("este es mi van "+JSON.stringify(van));
                                 this.van =van;
                                this.savedVan=van;
                              })
                              
       this.bookingService.getListBookingsByVan(params['id'])
                            .subscribe((bookingList)=>{
                              this.bookingList=bookingList;
                              //console.log(JSON.stringify(bookingList));
                              bookingList.forEach(b=>{
                                //this.results = [ ...this.results, ...data.results];
                               // console.log("este es el array de dates del cada booking")
                               // console.log(this.ArrayDates(b.startDate,b.totalDays))
                                this.invalidDates =[...this.invalidDates,...this.ArrayDates(b.startDate,b.total)] 
                             // console.log("dias reservados "+this.invalidDates)
                                this.bookingListbyVan.push(b)
                              });
                              this.savedBookingListByVan=this.bookingList;
                             // console.log(this.bookingListbyVan)
                              //console.log(JSON.stringify(this.bookingListbyVan[0].startDate))
                              //console.log(this.bookingListbyVan[0].startDate)
                            })
                                
    
      } 
  )

} 

getMinDateValue(minDateSeason){
  var today = new Date();
  if ((today.getDate()>=minDateSeason.getDate())&&(today.getDate()<=minDateSeason.getDate())){
    minDateSeason = today;
  }
  return minDateSeason;
};

// get diagnostic() { return JSON.stringify(this.newDate); }
addBooking(myForm){
 console.log("este es mi form"+JSON.stringify(myForm.value));
  //console.log("este es mi formvalue"+myForm.value)
  console.log("estoy dentro de submit form")
  this.bookingService.newBooking(myForm.value)
  .subscribe(b =>{
    this.booking = b;
    console.log("este es el booking que he hecho "+JSON.stringify(this.booking));
    // guardarme b en local storage para poder usarlo en cliente
    console.log("booking made!")
    var halfbooking = {
      _van:b._van,
      startDate:b.startDate,
      endDate:b.endDate,
      price : b.price,
      _id:b._id,
      paid:b.paid,
      total:b.total
    };
   localStorage.setItem('booking', JSON.stringify(halfbooking)); 
  //  console.log(this.vanId);
   this.router.navigate([`/alquiler/${b._id}/client`])
  // setTimeout (() => { ; }, 1000);
  });
}
  showDetails() {
    (this.van)?  this.van=null : this.van=this.savedVan;
 
  }
  showBookings() {
    (this.bookingList)?  this.bookingList=null : this.bookingList=this.savedBookingListByVan;
 
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // USER con el ID y ADMIN

  
ArrayDates (start,totalDays){
  let arrayDates = [new Date(start)];
  for (var i=1;i<totalDays+1;i++){
      arrayDates.push(this.addDays(arrayDates[i-1],1));
  }
  return arrayDates;
  //.datepicker("getDate").toLocalTime().toJSON();
};
totalDays(start,end){
  var ONE_DAY = 1000 * 60 * 60 * 24
  var totalDays = Math.round(Math.abs(end - start)/ONE_DAY);
  return totalDays;
}

addDays(date,days) {
  var dat = new Date(date);
  dat.setDate(dat.getDate() + days);
  return dat
};

}
