import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {VansService} from '../services/vans.service'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  vans: any;

  constructor(private router:Router,
  private vansService:VansService) { }
  
  ngOnInit() {
    this.vansService.getList()
    .subscribe(vans=>{ this.vans = vans; 
     // console.log(this.vans)
    })
  }

  onSubmit(event){
    event.preventDefault();
  }


}






 