import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {VansService} from '../services/vans.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  contactId: Number;
  newBooking :Object={ startDate: '00', endDate:'00'}
  constructor(private route: ActivatedRoute, private vansService:VansService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => this.contactId = Number(params['_id']));
  }

  recordAllTheKeyStrokes(event) {
    console.log(`Key inserted: ${event.key}`);
    //console.log(`Input value: ${event.currentTarget.value}`);
}


}


