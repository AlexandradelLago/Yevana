import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { GridOptions } from "ag-grid/main";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    name; email;username;role;
    public rowCount: string;
    public gridOptions: GridOptions;
    public showGrid: boolean;
    // checking the edit 
    public gridApi;
    public gridColumnApi;

    columnDefs = [
        { headerName: 'Name', field: 'name', cellStyle: { color: 'white', 'background-color': 'teal' }, editable: true },
        { headerName: 'Email', field: 'email', editable: true },
        { headerName: 'Username', field: 'username', editable: true },
        { headerName: 'Role', field: 'role', editable: true }
        //, checkboxSelection: true }
    ];
    rowData: any[] = [];
    userRow = {};
    rowDataAux: any[] = [];



    constructor(private user: UserService) {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{};
        this.createRowData();
        this.showGrid = true;
        this.drawCells();

      
    }
    ngOnInit() {



    }

    drawCells() {
        // set background color on every row
        // this is probably bad, should be using CSS classes
        this.gridOptions.rowStyle = { background: 'paleTurquoise', padding: '0 0' };

        // // set background color on odd rows
        // // again, this looks bad, should be using CSS classes
        this.gridOptions.getRowStyle = function (params) {
            // console.log(params)
            if (params.node.rowIndex % 2 === 0) {
                return { background: 'lightCyan' }
            }
        }
    }

    createRowData() {
        this.user.getList()
            .subscribe(u => {
                u.forEach(item => {
                    this.userRow['name'] = item.name;
                    this.userRow['email'] = item.email;
                    this.userRow['username'] = item.username;
                    this.userRow['role'] = item.role;
                    this.rowDataAux.push(this.userRow);
                    console.log(this.rowData[4])
                    this.userRow = {};

                })
                this.rowData = this.rowDataAux;
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

    public onReady(params) {
        console.log('onReady');
        this.calculateRowCount();
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
         params.api.sizeColumnsToFit();
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

    onRowClicked($event, myFormClient) {
        console.log('onRowClicked: ' + $event.node.data.name);
        console.log($event)

        $("#email").val("works!");

        this.name = $event.node.data.name;
        this.username = $event.node.data.username;
        this.role = $event.node.data.role;
        this.email=$event.node.data.email;
    }


    onCellDoubleClicked($event) {
        console.log('onCellDoubleClicked: ' + $event.node.data.name);
       // $("#email").val("works");
      //  this.name = $event.node.data.name;
        // this.email=$event.node.data.email;

        // this.gridOptions.api.startEditingCell({
        //     rowIndex: 0,
        //     colKey: 'name'
        // });

        // // stop editing
        // this.gridOptions.api.stopEditing();

        // // print details of editing cell
        // var cellDefs = this.gridOptions.api.getEditingCells();
        // cellDefs.forEach(function (cellDef) {
        //     console.log(cellDef.rowIndex);
        //     console.log(cellDef.column.getId());
        //     console.log(cellDef.floating);
        // });


    }

    onQuickFilterChanged($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);

    }

}


    // to add in the html
// <div style="position: absolute; top: 0; left: 0;">
//     <div style="padding: 2px;">
//         <button (click)="onBtStartEditing()">edit (0)</button>
//         <button (click)="onBtStartEditing(46)">edit (0, Delete)</button>
//         <button (click)="onBtStartEditing(null, 'T')">edit (0, 'T')</button>
//         <button (click)="onBtStartEditing(null, null, 'top')">edit (0, Top)</button>
//         <button (click)="onBtStartEditing(null, null, 'bottom')">edit (0, Bottom)</button>
//         &nbsp;
//         &nbsp;
//         &nbsp;
//         <button (click)="onBtStopEditing()">stop ()</button>
//         <button (click)="onBtNextCell()">next ()</button>
//         <button (click)="onBtPreviousCell()">previous ()</button>
//         &nbsp;
//         &nbsp;
//         &nbsp;
//         <button (click)="onBtWhich()">which ()</button>
//     </div>
// </div>
//

    //+++++++++++++++++++++++++ ADDED to EDIT the CELLS


    // onBtStopEditing() {
    //     this.gridApi.stopEditing();
    //   }

    //   onBtStartEditing(key, char, pinned) {
        //     this.gridApi.setFocusedCell(0, "lastLame", pinned);
        //     this.gridApi.startEditingCell({
        //       rowIndex: 0,
        //       colKey: "lastName",
        //       rowPinned: pinned,
        //       keyPress: key,
        //       charPress: char
        //     });
        //   }
        
        //   onBtNextCell() {
        //     this.gridApi.tabToNextCell();
        //   }
        
        //   onBtPreviousCell() {
        //     this.gridApi.tabToPreviousCell();
        //   }
        
        //   onBtWhich() {
        //     let cellDefs = this.gridApi.getEditingCells();
        //     if (cellDefs.length > 0) {
        //       var cellDef = cellDefs[0];
        //       console.log(
        //         "editing cell is: row = " +
        //           cellDef.rowIndex +
        //           ", col = " +
        //           cellDef.column.getId() +
        //           ", floating = " +
        //           cellDef.floating
        //       );
        //     } else {
        //       console.log("no cells are editing");
        //     }
        //   }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++
