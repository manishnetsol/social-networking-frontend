import { Component, OnInit,TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  jwtDetails:any;
  path = "http://localhost:8000/";
  commentform:FormGroup|any;
  modalRef:BsModalRef|any;
  constructor(private service: CrudService,private router:Router,private fb:FormBuilder,private modalService: BsModalService) { }

  // for delete Confirmation 
  placements = ['top'];
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';
  confirmText = 'Yes';
  cancelText = 'No';
  confirmClicked = false;
  cancelClicked = false;

  ngOnInit(): void {
    // for jwt decode 
    this.jwtDetails = localStorage.getItem('token');
    this.jwtDetails = this.service.getDecodedAccessToken(this.jwtDetails);
    this.commentform=this.fb.group({
      user_id:[this.jwtDetails.data.id],
      comment:[''],
    });
    this.getAllPost();
  }

  // to get user posts
users : any=[];
getAllPost()
{
  this.service.getUserPosts(this.jwtDetails.data.id).subscribe(data=>
    {
     this.users=data ;
    });
}
// check user
checkUser(u:any){
  if(u.user_id==this.jwtDetails.data.id){
    this.service.checkUserValue = true;
    return true;
  }
  else{
    this.service.checkUserValue = false;
    return false;
  }
}

editPost(u:any){
  this.service.find(u.post_id).subscribe(data=>{
    this.checkUser(u);
    this.service.checkUserError = false;
    this.router.navigate(['/editpost',u.post_id]);

},
(err)=>{
  this.service.checkUserError = true;
});
}

likePost(u:any){
  this.service.createLikes(u.post_id,this.jwtDetails.data.id).subscribe(data=>{
     this.getAllPost();
  });
}

                                  // for Comments
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

// delete Post
getdel(u:any){

  this.service.getdelete(u.post_id).subscribe(data=>{
     this.getAllPost();
  }) 
}
}
