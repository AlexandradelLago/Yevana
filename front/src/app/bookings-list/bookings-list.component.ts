import { Component, OnInit } from '@angular/core';
import {BookingService} from '../services/booking.service';
import {VansService} from '../services/vans.service';
import {UtilsService} from '../services/utils.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css']
})
export class BookingsListComponent implements OnInit {
  width1 = 600;
  height1 = 400;
  type1 = 'pie3d';
  dataFormat1 = 'json';
  dataSource1 = {
  "chart": {
      "caption": "Age profile of website visitors",
      "subcaption": "Last Year",
      "startingangle": "120",
      "showlabels": "0",
      "showlegend": "1",
      "enablemultislicing": "0",
      "slicingdistance": "15",
      "showpercentvalues": "1",
      "showpercentintooltip": "0",
      "plottooltext": "Age group : $label Total visit : $datavalue",
      "theme": "ocean"
  },
  "data": [
      {
          "label": "Teenage",
          "value": "1250400"
      },
      {
          "label": "Adult",
          "value": "1463300"
      },
      {
          "label": "Mid-age",
          "value": "1050700"
      },
      {
          "label": "Senior",
          "value": "491000"
      }
  ]
};


  width2 = 600;
    height2 = 400;
    type2 = 'column2d';
    dataFormat2 = 'json';
    dataSource2 = {
    "chart": {
        "caption": "Harry's SuperMart",
        "subCaption": "Top 5 stores in last month by revenue",
        "numberPrefix": "$",
        "theme": "fint"
    },
    "data": [
        {
            "label": "Bakersfield Central",
            "value": "880000"
        },
        {
            "label": "Garden Groove harbour",
            "value": "730000"
        },
        {
            "label": "Los Angeles Topanga",
            "value": "590000"
        },
        {
            "label": "Compton-Rancho Dom",
            "value": "520000"
        },
        {
            "label": "Daly City Serramonte",
            "value": "330000"
        }
    ]
    };
    // gridOptions:<GridOptions>
    bookingList:any[]=[];
    title = 'app';
    columnDefs :any;
    // columnDefs = [
    //     {headerName: 'Van', field: 'brand', checkboxSelection: true }
    // ];

    rowData : any;
        // { make: 'Toyota', model: 'Celica', price: 35000 },
        // { make: 'Ford', model: 'Mondeo', price: 32000 },
        // { make: 'Porsche', model: 'Boxter', price: 72000 }
     
    vanList:any[]=[];
    headernames:any[]=[ {headerName: 'Van', field: 'brand', checkboxSelection: true }];
    day0:Date=new Date("January 1,18");

  constructor( private booking : BookingService, private van : VansService, private date: UtilsService) { }

  ngOnInit() {

  

    this.headernames=[...this.headernames,...this.date.set365Date(this.day0,20)];
      console.log(this.headernames);
      this.columnDefs=this.headernames;
      this.booking.getListBookings()
        .subscribe((l)=>{
            //console.log(new Date(b.startDate).getDay())
            
        });
     this.van.getList()
        .subscribe(van=>{
            van.forEach(v =>{
                console.log(v)
                this.vanList.push({brand:v.brand})
             // this.rowData= this.bookingList.startDate;
            })
            this.rowData=this.vanList;
            console.log(this.rowData)
             console.log(this.vanList)
        });
  }
 

  clearColumnsDef(){
      this.columnDefs=[{headerName: 'Van', field: 'brand', checkboxSelection: true }];
  }

}




  
