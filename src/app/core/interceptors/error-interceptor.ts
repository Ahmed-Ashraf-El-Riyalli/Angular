import { Observable, of } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // The logic will be here ...
    console.log('in the error interceptor => ', req, next);

    // catch the errors globally instead of HandleErrorService
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('Error Interceptor => ', error.message);
        return of(error);
      })
    );
  }
}
