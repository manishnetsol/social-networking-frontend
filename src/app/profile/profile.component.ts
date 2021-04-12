import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  jwtDetails:any;
  constructor(private service: CrudService) { }

  ngOnInit(): void {
    // for jwt decode 
    this.jwtDetails = localStorage.getItem('token');
    this.jwtDetails = this.service.getDecodedAccessToken(this.jwtDetails);
  }

}
