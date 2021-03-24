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
    constructor(private fb: FormBuilder,private service : CrudService,private router:Router)
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
    }

    get f() { return this.angForm.controls; }

  postdata(angForm1:any)
{
  this.submitted = true;

  console.log(angForm1.value.username,angForm1.value.email,angForm1.value.password);
  this.service.createUser(this.angForm.value);
    console.log('User created successfully!');
   // this.angForm.reset();
 this.router.navigate(['login']);
}

}
