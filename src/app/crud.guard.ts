import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CrudGuard implements CanActivate {
  constructor(private _crudService: CrudService, private _router: Router) {}
  canActivate(): boolean {
    // If token is present, return true
    if (this._crudService.loggedInUser()) {
      return true
    }
    else {
      // else go to login page
      this._router.navigate(['/login'])
      return false
    }
  }
}