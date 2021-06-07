import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import {GLOBAL_ENDPOINT} from "../utils/app.endpoints";

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private tokenService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req.clone({ url: GLOBAL_ENDPOINT + req.url });
    const token = this.tokenService.getToken();
    if (token != null) {
      intReq = intReq.clone({ headers: intReq.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next.handle(intReq);
  }
}

export const interceptorRequestProvider = [{provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true}];
