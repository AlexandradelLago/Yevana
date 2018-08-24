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
  var headers=[day1.toLocaleDateString()];
  for (let i=0;i<=numofDays;i++){
    console.log(`{ headerName: ${this.addDays(headers[headers.length-1],1).toLocaleDateString()}, field: ${this.addDays(headers[headers.length-1],1)} } `);
      headers.push(this.addDays(headers[headers.length-1],1).toLocaleDateString());

  }
return headers;
}




}
