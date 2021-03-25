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
  constructor(private fb: FormBuilder,private service : CrudService , private router:Router) { 
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
  console.log(angForm1.value.email,angForm1.value.password);
  this.service.loginUser(this.angForm.value);
  console.log('Login successfully!');
  // console.log(this.displayData());
  //this.angForm.reset();
  this.router.navigate(['dashboard']);
  this.service.showLoginError = false;

}


}

