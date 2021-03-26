import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CrudService } from '../crud.service';
import{Router} from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit 
{
    angForm: FormGroup|any;
    submitted = false;
    constructor(private fb: FormBuilder,public service : CrudService,private router:Router)
        { }
    ngOnInit(): void 
    {
      this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', [Validators.required,Validators.minLength(5)]],
      // confirmpassword: ['', Validators.required],
      // mobilenumber: ['', Validators.required]
    });
    this.service.showSignUpError = false;
    }

    get f() { return this.angForm.controls; }

  postdata(angForm1:any)
{
  this.submitted = true;

  
  this.service.createUser(this.angForm.value).subscribe(res => {
    this.service.LoginMsg=res.message;
    this.service.LoginSuccess= true;
    this.router.navigate(['login']);
    this.service.showSignUpError=false;
   },
   (err) => {
     this.service.showSignUpError = true;
    this.service.signUpMsg = err.error.message;
    }
   )


    // if(!this.service.showSignUpError){
      
    // }
      
    
}

}
