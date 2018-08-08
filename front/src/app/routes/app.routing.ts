import { Routes } from '@angular/router'

import { AppComponent } from '../app.component';
import { ListComponent } from '../list/list.component';
import { BookingComponent } from '../booking/booking.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import {DashboardComponent} from '../dashboard/dashboard.component'
import {SeasonComponent} from '../season/season.component';
import {BookingsListComponent} from '../bookings-list/bookings-list.component';
import {ClientComponent} from '../client/client.component';

export const routes:Routes = [
    {path:"", component:HomeComponent},
    {path:"login", component:LoginComponent},
    {path:"alquiler" , component:ListComponent},
    {path:"alquiler/:id" , component:BookingComponent},
    {path:"alquiler/:id/client" , component:ClientComponent},
    {path:"admin", component:DashboardComponent},
    {path:"admin/bookings", component:BookingsListComponent},
    {path:"admin/season", component:SeasonComponent}
]

