import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { CrudService } from '../crud.service';
import{Router,ActivatedRoute} from '@angular/router';
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
       private route:ActivatedRoute) {
        this.form = this.fb.group({
          caption: ['', [Validators.required]], 
          });
        }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['post_id'];
    this.service.find(this.id).subscribe(data=>{this.Post=data;
    console.warn(this.Post.caption);
  });
  }

  get f() { return this.form.controls; }

  submit(){
    this.service.updatePost(this.id, this.form.value).subscribe(res => {
         this.router.navigate(['dashboard']);
    })
  }
  
}
