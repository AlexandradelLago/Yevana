import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {VansService} from '../services/vans.service';
import {BookingService} from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  
  van; savedVan;
  contactId: String;
  today:Date;
  newDate :Object={ startDate: '', endDate:''}
  constructor(private route: ActivatedRoute, private vansService:VansService
  , private bookingService:BookingService) { }

  ngOnInit() {
    
 

    this.route.params
      .subscribe((params) => this.contactId = params['id']);
    this.route.params
      .subscribe ((params)=> this.vansService.getVan(params['id'])
                             .subscribe((van)=> {
                                 this.van =van;
                                this.savedVan=van;
                                })
      
       )} 


get diagnostic() { return JSON.stringify(this.newDate); }
addBooking(myForm,contactId){
console.log("este es mi van id"+contactId)
  console.log("este es mi formvalue"+myForm.value)
  console.log("estoy dentro de submit form")
  this.bookingService.newBooking(this.newDate,contactId)
  .subscribe(b =>{
    console.log("booking made!")
    //setTimeout (() => { this.route.navigate(['bookings']); }, 1000);
  });
}
  showDetails() {
    (this.van)?  this.van=null : this.van=this.savedVan;
 
}
}



// submitFormNoFile(newFormNoFile){
//   console.log(newFormNoFile.value);
//   this.sourcesCheckBOX.forEach(e=>{
//     if(e.checked){
//       this.selectedSources.push(e.acronim);
//     }
//   })
//   this.profileS.newProfileNoPic(newFormNoFile.value,this.selectedSources,this.user)
//   .subscribe(res=>console.log("ESTOY AQUI"))
// }

// sendDateForm(myForm, carId, carPrice) {
//   const newOrder = {
//     startDate: myForm.value.startDate,
//     endDate: myForm.value.endDate,
//     _car             : carId
//   }
//   this.orderService.addItem(newOrder)
//   .subscribe(order => {
//     this.toastr.success('Succes! Your order has been made');
//       setTimeout (() => { this.router.navigate(['orders']); }, 1000);
//   })
// }