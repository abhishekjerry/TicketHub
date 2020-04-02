
// ************************this Piece of code doesnot work******** THROWS ERROR******this.interceptor.intercept is not a function***** //
// ----------------------------------------------------------------------------------------------------------------------------- //
// import { Injectable, Injector } from '@angular/core';
// import { HttpInterceptor } from '@angular/common/http';
// import { AuthService} from './auth.service';
// @Injectable()
// export class TokenInterceptorService implements HttpInterceptor {
//   constructor(private injector: Injector ) { }
//   intercept(req, next) {
//     const authService = this.injector.get(AuthService);
//     const tokenizedReq = req.clone({
//       setHeaders: {
//         authorization: `Bearer ${authService.getToken()}`
//       }
//     });
//     return next.handel(tokenizedReq);
//   }
// }
// --------------------------------------------------CODE NOT WORKING------------------------------------------------------------------- //

import { Injectable, Injector } from '@angular/core';
import { AuthService} from './auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(request);
  }
}





