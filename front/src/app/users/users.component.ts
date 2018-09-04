import { Component, OnInit } from '@angular/core';

import {UserService} from '../services/user.service';

import {GridOptions} from "ag-grid/main";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
    name;email;
    public rowCount:string;
    public gridOptions:GridOptions;
    public showGrid:boolean;
   
    columnDefs = [
        {headerName: 'Name', field: 'name', checkboxSelection: true },
        {headerName: 'Email', field: 'email', checkboxSelection: true },
        {headerName: 'Username', field: 'username', checkboxSelection: true },
        {headerName: 'Role', field: 'role', checkboxSelection: true }
    ];
    rowData:any[]=[];
    userRow={};
 rowDataAux:any[]=[];

  constructor( private user : UserService) {
        // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.showGrid = true;


  }
  ngOnInit() {








  }
 


createRowData(){
    this.user.getList()
    .subscribe(u=>{
        u.forEach(item=>{
            this.userRow['name']=item.name;
            this.userRow['email']=item.email;
            this.userRow['username']=item.username;
            this.userRow['role']=item.role;
            this.rowDataAux.push(this.userRow);
            console.log(this.rowData[4])
            this.userRow={};
            
        })
        this.rowData=this.rowDataAux;
    })
  
}

 calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
        var model = this.gridOptions.api.getModel();
        var totalRows = this.rowData.length;
        var processedRows = model.getRowCount();
        this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    }
}

public onReady() {
    console.log('onReady');
    this.calculateRowCount();
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

  $("#email").text("your tip has been submitted!");

    this.name=$event.node.data.name;
    this.email=$event.node.data.email;
}


onCellDoubleClicked($event) {
    console.log('onRowClicked: ' + $event.node.data.name);
   

  $("#email").text("your tip has been submitted!");

    this.name=$event.node.data.name;
    this.email=$event.node.data.email;
}

 onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
   
}

}
