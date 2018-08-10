import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}




  