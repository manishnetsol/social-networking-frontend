import { Component, OnInit,TemplateRef  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // for delete Confirmation 
  placements = ['top'];
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';
  confirmText = 'Yes';
  cancelText = 'No';
  confirmClicked = false;
  cancelClicked = false;

  path = "http://localhost:8000/"
  myform: FormGroup|any;
  commentform:FormGroup|any;
  modalRef:BsModalRef|any;
  jwtDetails:any;
  constructor(private fb: FormBuilder,private service : CrudService,private modalService: BsModalService) { }

  ngOnInit(): void {
    // for jwt decode 
    this.jwtDetails = localStorage.getItem('token');
    this.jwtDetails = this.getDecodedAccessToken(this.jwtDetails);

    this.myform = this.fb.group({
      caption: [''],
      user_id:[this.jwtDetails.data.id],
      type:['0'],
      post_url:[null]
    });

    // for Comment
    this.commentform=this.fb.group({
      user_id:[this.jwtDetails.data.id],
      comment:[''],
    });
   this.getAllPost();
  }
// for file select
isSelected=false;
file:any;
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.isSelected=true;
      this.file = event.target.files[0];
      this.myform.get('post_url').setValue(this.file);
    }
  }

// Post Data Of Created post to api
  postdata:any;
  submitted = false;
  showPostError = false;
  formSubmit() {
    this.postdata = this.myform.value;
    this.submitted = true;
    const formData = new FormData();
    formData.append('post_url', this.myform.get('post_url').value);
    formData.append('type', this.myform.get('type').value);
    formData.append('user_id', this.myform.get('user_id').value);
    formData.append('caption', this.myform.get('caption').value);
    if (this.myform.controls['caption'].value.length > 0 || this.myform.controls['post_url'].value) {
      this.service.create(formData).subscribe(data => {
        this.showPostError = false;
        this.isSelected=false;
        this.myform.get('caption').setValue("");
        this.myform.controls['post_url'].reset();
        this.getAllPost();
       })
    }
    else {
      this.showPostError = true;
    // alert("Please Insert Something");
    }
}

//To Get All Posts
users : any=[];
getAllPost()
{
  this.service.getUsers2().subscribe(data=>
    {
     this.users=data ;
    });
}

// Delete Post 
getdel(u:any){

  this.service.getdelete(u.post_id).subscribe(data=>{
     this.getAllPost();
  }) 
}

// Like Post
likePost(u:any){
  this.service.createLikes(u.post_id,this.jwtDetails.data.id).subscribe(data=>{
     this.getAllPost();
  });
}

// Post Comment On Post
commentdata:any;
submitcomment(post_id:any)
{
  this.commentdata=this.commentform.value;
  this.service.createComment(post_id,this.commentdata.user_id,this.commentdata.comment).subscribe(data=>{
    this.getComments(post_id);
    this.commentform.controls['comment'].reset();
    this.getAllPost();
  })
}

// to post coomment open comment
openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}

// to Get All Comments
comments:any=[];
getComments(post_id:any)
{
  this.service.getcomments(post_id).subscribe(data=>
    {
     this.comments=data ;
    });
}

// to delete comment

delcomment(cmt:any){
  
  this.service.deletecomment(cmt.comment_id).subscribe(data=>{
     this.getComments(cmt.post_id);
     this.getAllPost();
  }) 
}


// for login

getDecodedAccessToken(token: string): any {
  try{
      return jwt_decode(token);
  }
  catch(Error){
      return null;
  }
}

// Upload Photo using name = 'image'

}

