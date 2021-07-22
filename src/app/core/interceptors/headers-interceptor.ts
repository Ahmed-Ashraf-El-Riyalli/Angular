import { environment as env } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // The logic will be here ...
    console.log('in the headers interceptor => ', req, next);

    if(env.isAuthorize) {

      const token = this.getToken();

      const modifiedRequest = req.clone({
        // url: req.url.replace('http', 'https'),
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      console.log('in the headers interceptor (Modified Request)=> ', modifiedRequest);

      return next.handle(modifiedRequest);
    }

    return next.handle(req);
  }

  private getToken(): string {
    return sessionStorage.getItem('token');
  }
}
