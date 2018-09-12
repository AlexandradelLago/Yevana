import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:Object = JSON.parse(localStorage.getItem('user'));
  vanList:any[]=[];
  bookingList:any[]=[];
  date:Date=new Date();
  options:Object= { weekday: 'long', month: 'long', day: 'numeric' };
  dateBeauty=this.date.toLocaleDateString('en-EN', this.options)
  width1 = 500;
  height1 = 300;
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
  width2 = 500;
    height2 = 300;
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





  constructor(private router:Router,
     private route:ActivatedRoute,
    private session : AuthService,
  private userS : UserService) { }

  ngOnInit() {



    // if (!this.user||this.user.role){
    //     this.router.navigate([''])
    // }else{

    // }


  this.session.isLoggedIn()
    .subscribe((u)=>{
        console.log(u);
      console.log("esta logeado")
    })






}
   

}








