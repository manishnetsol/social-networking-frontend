import { Component } from '@angular/core';
import { CrudService } from './crud.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'social-media';
  users : any=[];
  constructor(private service : CrudService) { }

  ngOnInit(): void {
    this.service.getUsers2().subscribe(data=>
      {
       this.users=data;
        console.log(this.users);
      } 
    );
  }

}
