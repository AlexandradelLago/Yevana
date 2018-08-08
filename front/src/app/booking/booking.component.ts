import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {VansService} from '../services/vans.service';
import {BookingService} from '../services/booking.service';
import { JsonpModule } from '../../../node_modules/@angular/http';

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
  minDateValue:Date= new Date("2018-06-10");maxDateValue:Date=new Date("2018-09-15");
  newDate={startDate: '',endDate:''}
  constructor(private router : Router, private route: ActivatedRoute, private vansService:VansService
  , private bookingService:BookingService) { }

  ngOnInit() {
    
    this.route.params
      .subscribe ((params)=>{ 
        this.vanId = params['id'];
        console.log(this.vanId);
        this.vansService.getVan(params['id'])
                             .subscribe((van)=> {
                               console.log(JSON.stringify(van));
                                 this.van =van;
                                this.savedVan=van;
                              })
       this.bookingService.getListBookingsByVan(params['id'])
                            .subscribe((bookingList)=>{
                              this.bookingList=bookingList;
                              console.log(JSON.stringify(bookingList));
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

// es en el front donde tengo que guardar el cliente cuando hago el booking

} 

// fillOutClient(){
//   this.router.navigate(['/alquiler/client'])
// }

get diagnostic() { return JSON.stringify(this.newDate); }
addBooking(myForm,vanId){
console.log("este es mi van id"+vanId)
console.log(myForm)
//   console.log("este es mi formvalue"+myForm.value)
//   console.log("estoy dentro de submit form")
  this.bookingService.newBooking(myForm.value,vanId)
  .subscribe(b =>{
    this.booking = b;
    console.log(JSON.stringify(this.booking));
    // guardarme b en local storage para poder usarlo en cliente
    console.log("booking made!")
    var user = {
      _van:b._van,
      startDate:b.startDate,
      endDate:b.endDate,
      price : b.price,
      _id:b._id,
      paid:b.paid,
      total:b.total
    };
   localStorage.setItem('user', JSON.stringify(user)); 
   console.log(this.vanId);
   this.router.navigate([`/alquiler/${b._van}/client`])
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