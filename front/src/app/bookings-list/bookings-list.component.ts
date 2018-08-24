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

    // rowData = [
    //     { brand: 'Coche1', "8/2/2018": 'idReserva1',  "8/22/2018": 'idReserva1',  "8/17/2018": 'idReserva1'  },
    //     { brand: 'Coche2', "8/5/2018": 'idReserva1',  "8/23/2018": 'idReserva1',  "8/20/2018": 'idReserva1' }
    // ]
    rowData:any=[];
     row:any=[];
     arrayAux:any[]=[];
     rowDataAux:any[]=[];
    vanList:any[]=[];
    headernames:any[]=[ {headerName: 'Van', field: 'brand', checkboxSelection: true }];
    day0:Date=new Date("August 5,18");

  constructor( private booking : BookingService, private van : VansService, private date: UtilsService) { }

  ngOnInit() {

  console.log(this.rowData)

    this.headernames=[...this.headernames,...this.date.set365Date(this.day0,20)];
      console.log(this.headernames);
      this.columnDefs=this.headernames;
    
      this.van.getList()
      .subscribe(van=>{
          van.forEach(v =>{
             // this.vanRow.push({brand:v.brand})
              this.booking.getListBookingsByVan(v._id)
              .subscribe(items=>{
                //  console.log("este es mi row brand")
                  this.row={};
                  this.row['brand']=v.brand;
                 // this.rowData=this.row;
                //  console.log(this.row);
                            items.forEach(b=>{
                              this.arrayAux = this.date.ArrayDates(b.startDate,b.total)
                              this.arrayAux.forEach(day=>{
                                  this.row[day.toLocaleDateString()]=b._id;
                              })
                            });
                            console.log(this.row)
                            
                            this.rowDataAux.push(this.row);
                            console.log("este es el rowData")
                            console.log(this.rowData)
                          
                            console.log("este otra vez row data de verdaddddd")
                            this.rowData=this.rowDataAux;

                            
              })
          })
         
      });



    //   this.van.getList()
    //   .subscribe(van=>{
    //       van.forEach(v =>{
    //           console.log(v)
    //           this.vanList.push({brand:v.brand})
    //        // this.rowData= this.bookingList.startDate;
    //       })
    //        this.rowData=this.vanList;
    //       console.log(this.rowData)
    //        console.log(this.vanList)
    //   });



  }
 








  clearColumnsDef(){
      this.columnDefs=[{headerName: 'Van', field: 'brand', checkboxSelection: true }];
  }

}




  
