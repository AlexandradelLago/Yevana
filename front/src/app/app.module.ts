//materialize
import 'materialize-css';

//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { MaterializeModule } from 'angular2-materialize';
import * as $ from 'jquery';

// routes
import { routes } from './routes/app.routing'
import { RouterModule } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
// services
import {VansService} from './services/vans.service';
import {AuthService} from './services/auth.service';
import { BookingService } from './services/booking.service';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    BookingComponent,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    AdminNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CalendarModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [VansService,AuthService,BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }


