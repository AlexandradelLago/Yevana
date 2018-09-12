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
    day0:Date=new Date("September 1,18");

  constructor( private booking : BookingService, private van : VansService, private date: UtilsService) {
    this.gridOptions = <GridOptions>{};
   }

  ngOnInit() {

  console.log(this.rowData)

    this.headernames=[...this.headernames,...this.date.set365Date(this.day0,60)];
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




  
