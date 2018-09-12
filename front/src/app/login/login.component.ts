import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as $ from 'jquery';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logingUser = {password: '', username:''};
  user;error;

  constructor(public toastr : ToastsManager,
    vcr: ViewContainerRef,
    private session: AuthService, 
    private route: Router) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

    showSuccess() {
      this.toastr.success(`Wellcome to Yevana,${this.logingUser.username}!`, 'Success!', {toastLife: 1000, showCloseButton:true});
    }
  
    showError() {
      this.toastr.error('This is not good!', 'Oops!');
    }
  
    showWarning() {
      this.toastr.warning('You are being warned.', 'Alert!');
    }
  
    showInfo() {
      this.toastr.info('Just some information for you.');
    }
    
    showCustom() {
      this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
    }


  login() {
    console.log("llego dentro de login")
    this.session.login(this.logingUser)
    .subscribe((data) => {
      console.log("dentro de la session")
      
      this.user = data;
      console.log(this.user);
      this.showSuccess();
      sessionStorage.setItem('user', JSON.stringify(data));

      setTimeout(()=>{
        switch (this.user.role) {
          case 'USER':
            this.route.navigate(['alquiler']);
          break;
          case 'ADMIN':
            this.route.navigate(['admin']);
          break;
        }
      }, 800);
      
    });
  }




  ngOnInit() {
    $(document).ready(function() {
      ($('.parallax') as any).parallax();
    });
  }

}
