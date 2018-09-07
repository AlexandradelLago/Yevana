import { Component, OnInit } from '@angular/core';
import {BookingService} from '../services/booking.service';
import {VansService} from '../services/vans.service';
import {UtilsService} from '../services/utils.service';
import {GridOptions} from "ag-grid/main";
@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css']
})
export class BookingsListComponent implements OnInit {

    startDate;email;name;vanName;endDate;total;price;
    rowCount:string;
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
}
  width2 = 600;
    height2 = 400;
    type2 = 'column2d';
    dataFormat2 = 'json';
    dataSource2 = {
    "chart": {
        "caption": "Revenues's per month",
        "subCaption": "Revenue per month and per van in the last 5 months",
        "numberPrefix": "$",
        "theme": "fint"
    },
    "data": [
        {
            "label": "June",
            "value": "880000"
        },
        {
            "label": "July",
            "value": "730000"
        },
        {
            "label": "August",
            "value": "590000"
        },
        {
            "label": "September",
            "value": "520000"
        }
    ]
    };
    public gridOptions:GridOptions;
    showToolPanel;
    bookingList:any[]=[];
    title = 'app';
    columnDefs :any;
    rowData:any=[];
     row:any=[];
     arrayAux:any[]=[];
     rowDataAux:any[]=[];
    vanList:any[]=[];
    headernames:any[]=[ {headerName: 'Van', field: 'brand', checkboxSelection: true }];
    day0:Date=new Date("August 1,18");

  constructor( private booking : BookingService, private van : VansService, private date: UtilsService) {
    this.gridOptions = <GridOptions>{};
   }

  ngOnInit() {

  console.log(this.rowData)

    this.headernames=[...this.headernames,...this.date.set365Date(this.day0,30)];
      console.log(this.headernames);
      this.columnDefs=this.headernames;
    
      this.van.getList()
      .subscribe(vans=>{
        this.booking.getListBookings()
        .subscribe(bookings=>{
          vans.forEach(v=>{
                  this.row={};
                  this.row['brand']=v.brand;
               
                            bookings.forEach(b=>{
                              if (v._id === b._van._id){
                                this.arrayAux = this.date.ArrayDates(b.startDate,b.total)
                                this.arrayAux.forEach(day=>{
                                    this.row[day.toLocaleDateString()]=b._id;
                                })
                              }
                            });      
                            this.rowDataAux.push(this.row);   
                            this.rowData=this.rowDataAux;   
                            console.log(this.rowData)  
              })
              
          })
             
    });


  }
 
  calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
        var model = this.gridOptions.api.getModel();
        var totalRows = this.rowData.length;
        var processedRows = model.getRowCount();
        this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    }
}

drawCells(){
   // set background color on every row
// this is probably bad, should be using CSS classes
this.gridOptions.rowStyle = {background: 'paleTurquoise',padding:'0 0'};

// // set background color on odd rows
// // again, this looks bad, should be using CSS classes
 this.gridOptions.getRowStyle = function(params) {
console.log(params)
    if (params.node.rowIndex % 2 === 0) {
        return { background: 'lightCyan'}
    }
 } 
}

public onReady() {
    console.log('onReady');
    this.calculateRowCount();
    this.drawCells();
   // params.api.sizeColumnsToFit();
  

}

 onSelectionChanged() {
    console.log('selectionChanged');
}

 onBeforeFilterChanged() {
    console.log('beforeFilterChanged');
}

 onAfterFilterChanged() {
    console.log('afterFilterChanged');
}

 onFilterModified() {
    console.log('onFilterModified');
}

 onBeforeSortChanged() {
    console.log('onBeforeSortChanged');
}

 onAfterSortChanged() {
    console.log('onAfterSortChanged');
}

 onRowClicked($event,myFormClient) {
    console.log('onRowClicked: ' + $event.node.data.name);
    console.log(myFormClient)

  $("#startDate").text("your tip has been submitted!");

    this.name=$event.node.data.name;
    this.startDate=$event.node.data.startDate;
}


onCellClicked($event) {
  //  console.log("cell clicked")
   // console.log($event.value);

    this.booking.getBooking($event.value)
    .subscribe(b=>{
        console.log(b);
        this.name = b._user.name;
        this.email=b._user.email;
        this.vanName = b._van.brand;
        this.startDate=new Date (b.startDate);
        this.endDate=b.endDate;
        this.total=b.total;
        this.price=b.price

    })
   
}

 onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
   
}




  clearColumnsDef(){
      this.columnDefs=[{headerName: 'Van', field: 'brand', checkboxSelection: true }];
  }

}




  
