import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CrudService } from '../crud.service';
import{Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,public Loginservice : CrudService , private router:Router) { 
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
      });
  }
  ngOnInit(): void {
  }
  get f() { return this.angForm.controls; }
  postdata(angForm1:any){
  this.submitted = true;
  this.Loginservice.loginUser(this.angForm.value).subscribe(res => {
    localStorage.setItem('token', res.jwt); // Stored token in Local Storage
    this.router.navigate(['dashboard']);
     this.Loginservice.showLoginError = false;
     this.Loginservice.LoginSuccess = false;
    },
  (err) => {
   this.Loginservice.LoginSuccess=false;
   this.Loginservice.showLoginError = true;
    this.Loginservice.LoginMsg = err.error.message;
    
  }
)


  // console.log('Login successfully!');
 
  

}


}

