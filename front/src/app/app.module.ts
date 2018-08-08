//materialize
import 'materialize-css';

//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Import angular2-fusioncharts
import { FusionChartsModule } from 'angular2-fusioncharts';
 
// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';
// Import FusionCharts Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import * as OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
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
import { SeasonComponent } from './season/season.component';
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';

// services
import {VansService} from './services/vans.service';
import {AuthService} from './services/auth.service';
import { BookingService } from './services/booking.service';
import { UserService } from './services/user.service';






@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    BookingComponent,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    AdminNavComponent,
    SeasonComponent,
    BookingsListComponent,
    DashboardComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CalendarModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
       // Specify FusionChartsModule as an import 
    // and pass FusionCharts and Charts as a dependency
    // You can pass all other FusionCharts modules such as Charts, PowerCharts
    // Maps, Widgets e.t.c. after FusionCharts
    FusionChartsModule.forRoot(FusionCharts, Charts,FintTheme,OceanTheme)
  ],
  providers: [VansService,AuthService,BookingService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }


