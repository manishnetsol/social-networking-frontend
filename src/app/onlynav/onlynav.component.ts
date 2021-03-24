import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-onlynav',
  templateUrl: './onlynav.component.html',
  styleUrls: ['./onlynav.component.css']
})
export class OnlynavComponent implements OnInit {
  collapsed = true;
  constructor(public crudservice:CrudService) { }

  ngOnInit(): void {
    
  }

}
