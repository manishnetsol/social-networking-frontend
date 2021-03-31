import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CrudService } from './crud.service';



@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {
  constructor(private _crudService: CrudService , private _router: Router) {}
  canActivate(): boolean {
    // If token is present, return true
    if (!this._crudService.checkUserValue){
      this._router.navigate(['/dashboard']);
      return false;
    }
    else {
      return true;
    }
  }
}
