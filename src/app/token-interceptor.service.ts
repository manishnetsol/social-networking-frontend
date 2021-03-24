import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { CrudService } from './crud.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) { }
  intercept(req:any, next:any) {
    let crudService = this.injector.get(CrudService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${crudService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}