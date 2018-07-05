import { Routes } from '@angular/router'

import { AppComponent } from '../app.component';
import { ListComponent } from '../list/list.component';
import { BookingComponent } from '../booking/booking.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';


export const routes:Routes = [
    {path:"", component:HomeComponent},
    {path:"login", component:LoginComponent},
    {path:"alquiler/vans" , component:ListComponent},
    {path:"alquiler/vans/:id" , component:BookingComponent}
    // {path:"private", component:MyPrivatePageComponent},
    // {path:"profile", component:MyProfileComponent},
    // {path:"profile/:id", component:NewProfileComponent},

]

