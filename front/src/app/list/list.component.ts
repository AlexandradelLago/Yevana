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
    .subscribe(vans=> this.vans = vans);
  }

  onSubmit(event){
    event.preventDefault();
  }

  // addContact(){
  //   console.log("Add contact has been called");

  //    this.vans.push(this.newVan);
  //    console.log(this.vans);
  //    this.newVan = {};
    // add contact to contacts list
    // clear inputs
  

}






 