import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {EditpostComponent} from './editpost/editpost.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { CrudGuard } from './crud.guard';

const routes: Routes = [
  {
    path:'',
    component:RegistrationComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'editpost/:post_id',
    component:EditpostComponent,
    canActivate:[CrudGuard]
  },
 {
   path:'dashboard',
   component:DashboardComponent,
   canActivate:[CrudGuard]
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
