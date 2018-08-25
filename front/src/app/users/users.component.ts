import { Component, OnInit } from '@angular/core';

import {UserService} from '../services/user.service';

import {GridOptions} from "ag-grid/main";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
    
    public rowCount:string;
    private gridOptions:GridOptions;
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
 


private createRowData(){
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

private calculateRowCount() {
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

private onSelectionChanged() {
    console.log('selectionChanged');
}

private onBeforeFilterChanged() {
    console.log('beforeFilterChanged');
}

private onAfterFilterChanged() {
    console.log('afterFilterChanged');
}

private onFilterModified() {
    console.log('onFilterModified');
}

private onBeforeSortChanged() {
    console.log('onBeforeSortChanged');
}

private onAfterSortChanged() {
    console.log('onAfterSortChanged');
}

private onRowClicked($event) {
    console.log('onRowClicked: ' + $event.node.data.name);
}

public onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
}

}
