import { AccessAPIService } from './../access-api.service';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UniqueEmailValidatorService implements AsyncValidator {

  constructor(private accessAPIService: AccessAPIService) { }

  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {

    return this.accessAPIService.isUniqueEmail(control.value).pipe(
      map((response: {isUnique: Boolean}) => response.isUnique ? null : { existingEmail: true }),
      catchError(() => of(null))
    )
  }

}
