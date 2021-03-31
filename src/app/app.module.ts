import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule}  from '@angular/forms';
import { FormsModule}  from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditpostComponent } from './editpost/editpost.component';
import { OnlysidebarComponent } from './onlysidebar/onlysidebar.component';
import { OnlynavComponent } from './onlynav/onlynav.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { CrudGuard } from './crud.guard';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { EditGuard } from './edit.guard';




//import{CollapseModule} from 'ngx-bootstrap/collapse';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    EditpostComponent,
    OnlysidebarComponent,
    OnlynavComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
  
  ],
  providers: [
    EditGuard,CrudGuard,EditpostComponent,DashboardComponent,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true // So that we can use multiple interceptors if required
  }
  
 
],
  bootstrap: [AppComponent]
})
export class AppModule { }
