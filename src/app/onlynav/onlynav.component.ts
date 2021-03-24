import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onlynav',
  templateUrl: './onlynav.component.html',
  styleUrls: ['./onlynav.component.css']
})
export class OnlynavComponent implements OnInit {
  collapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
