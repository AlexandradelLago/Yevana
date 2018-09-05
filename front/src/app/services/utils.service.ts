import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

    
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
}

set365Date (day1, numofDays){
  var headers=[];
  var options = { weekday: 'narrow', month: 'short', day: 'numeric' };
  let yesterday = day1;
  for (let i=0;i<=numofDays;i++){
      let today = this.addDays(yesterday,1);
      headers.push({ headerName: today.toLocaleDateString('es-ES', options), field: today.toLocaleDateString(), cellRenderer:bookingCellRenderer} );
      yesterday=today;
  }
return headers;
}


}



function bookingCellRenderer(params) {
  //console.log(params.value)
  var allColumnIds = [];
  params.columnApi.getAllColumns().forEach(function(column) {
    allColumnIds.push(column.colId);
  });
  params.columnApi.autoSizeColumns(allColumnIds);
  var booked = "free";
  if (params.value) var booked = "<div style='background:blue; height:30px; margin:0px  0px; border: 2px solid red; border-radius: 25px width:100%'> </div>";
  return booked;
}
