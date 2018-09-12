import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {
  

  today:Date;
  user;
  booking;
  bookingList;
  invalidDates:Date[]=[];
  //months=[new Date("2018-06-10"), new Date("2018-07-01")];
  maxDateValue:Date=new Date("2018-09-30");
  medDateValue:Date=new Date("2018-08-30");
  minDateValue:Date=new Date("2018-07-30");
  startDate;endDate; _van;
  
  





  constructor() { }

  ngOnInit() {
  }

}
