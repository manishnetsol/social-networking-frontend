import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { CrudService } from '../crud.service';
import{Router,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
  id:any;
  Post:any;
  form: FormGroup;
  constructor(private fb:FormBuilder,
    private service : CrudService ,
     private router:Router,
       private route:ActivatedRoute, private location:Location) {
        this.form = this.fb.group({
          caption: ['', [Validators.required]], 
          });
        }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['post_id'];
    this.service.find(this.id).subscribe((data)=>{this.Post=data;
      this.form.setValue({
        caption: this.Post.caption
      })
  },
  (err)=>{
    this.location.back();
  });
}

  get f() { return this.form.controls; }
 
  submit(){
    this.service.updatePost(this.id, this.form.value).subscribe(res => {
        // for storing history of routes 
      this.location.back();
        
    })
  }
  
}
