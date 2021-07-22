import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor() { }

  logError(error: HttpErrorResponse): Observable<never> {
    if(error instanceof ErrorEvent) {
      console.log('Client Side Error');
    } else {
      console.log('Server Side Error');
    }

    return throwError('Something went wrong');
  }
}
