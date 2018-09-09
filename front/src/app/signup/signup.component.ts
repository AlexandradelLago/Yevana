import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 newUser = {email: '', password: '', username:''};
 // newUser = {password: '', username:''};
  user;error;
  constructor(private session: AuthService,
     private route: Router,
    public toastr : ToastsManager,
  vcr : ViewContainerRef) { 

this.toastr.setRootViewContainerRef(vcr);

  }

  signup() {
  
    this.session.signup(this.newUser)
    .subscribe(data => {
      this.user = data;
      sessionStorage.setItem('user', JSON.stringify(data));
        switch (this.user.role) {
          case 'USER':
            this.route.navigate(['alquiler']);
          break;
          case 'ADMIN':
            this.route.navigate(['admin']);
          break;
        }
      
    });
  }
  ngOnInit() {
  }

}
