import { Observable, of } from 'rxjs';
import { AccessAPIService } from 'src/app/access-api.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<any> {

  constructor(private accessAPIService: AccessAPIService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.accessAPIService.getAll(this.accessAPIService.productUrl).pipe(
      catchError(() => {
        return of('Not Found');
      })
    );
  }

}
