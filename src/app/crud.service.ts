import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import{HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  LoginMsg:any;
  signUpMsg:any;
  LoginSuccess = false;
  showSignUpError=true;

  apiUrl2="http://localhost:8000/";
  constructor(private http : HttpClient,private router :Router) { }
// create user
  createUser(formvalues:any){
    return this.http.post<any>(this.apiUrl2 +"users", JSON.stringify(formvalues))
  }
//get user
  getUsers2()
  {
     return this.http.get(this.apiUrl2+"posts");
  } 

  //login


  showLoginError = false;
  
  error:any
  user_id:any;
    loginUser(formvalues:any) {
      return this.http.post<any>(this.apiUrl2 +"login", JSON.stringify(formvalues))
    }
  
    loggedInUser() {
      return !!localStorage.getItem('token'); // It will return only true or false
    }
    getToken() {
      return localStorage.getItem('token')
    }
// logged Out
logoutUser() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
  //for creating posts
  create(formvalues:any){
    return this.http.post(this.apiUrl2 +"posts", formvalues)
  }
 //delete post
  getdelete(post_id:number){
    return this.http.delete(this.apiUrl2+'posts/'+post_id);
  }
  //update post
  updatePost(id:number,caption:any){
    return this.http.put(this.apiUrl2+'posts/'+id,JSON.stringify(caption));
  }
  //find post 
  find(post_id:any) {
    return this.http.get(this.apiUrl2 + 'posts/' + post_id);
  }

  // //like post
  // like(formvalues:any){
  //   return this.http.post(this.apiUrl2 +"likes", JSON.stringify(formvalues))
  // }
  
//get likes
  getLikes()
  {
     return this.http.get(this.apiUrl2+"likes");
  }

  //create likes
  createLikes(post_id:any,user_id:any){
    return this.http.post<any>(this.apiUrl2 +"likes", JSON.stringify({user_id,post_id}));
  }

// create comments
   createComment(post_id:any,user_id:any,comment:any)
   {
     return this.http.post(this.apiUrl2 + "comments" ,JSON.stringify({user_id,post_id,comment}));
   }

  //  get all delete
   getcomments(comment_id:any)
   {
      return this.http.get(this.apiUrl2+"comments/"+comment_id);
   }

  //  delete comment

  deletecomment(comment_id:number){
    return this.http.delete(this.apiUrl2+'comments/'+comment_id);
  }
} 
