import { Observable, of } from 'rxjs';
import { AccessAPIService } from 'src/app/access-api.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<any> {

  constructor(private accessAPIService: AccessAPIService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id: number = route.params.id;

    return this.accessAPIService.getOne(this.accessAPIService.productUrl, id).pipe(
      catchError(() => {
        return of('Not Found');
      })
    );
  }

}
