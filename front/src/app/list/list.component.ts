import { Component, EventEmitter, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {VansService} from '../services/vans.service'
import * as $ from 'jquery';
import 'materialize-css';
import {MaterializeAction} from 'angular2-materialize';
 

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  vans: any;
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private router:Router,
  private vansService:VansService) { }
  
  ngOnInit() {
    this.vansService.getList()
    .subscribe(vans=>{ this.vans = vans; 
     // console.log(this.vans)
    })
     // Or with jQuery

      
  }


  
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }


  onSubmit(event){
    event.preventDefault();
  }


}






 