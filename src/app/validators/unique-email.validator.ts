import { Observable, of } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { AccessAPIService } from '../access-api.service';
import { catchError, map } from 'rxjs/operators';

export function asyncUniqueEmailValidator(accessAPIService: AccessAPIService): AsyncValidatorFn {

  return (control: AbstractControl): Observable<ValidationErrors> => {

    return accessAPIService.isUniqueEmail(control.value).pipe(

      map((response: {isUnique: boolean}) => {
        return response.isUnique ? null : {existingEmail: true};
      }),
      catchError(() => of(null))
    );
  };
}
