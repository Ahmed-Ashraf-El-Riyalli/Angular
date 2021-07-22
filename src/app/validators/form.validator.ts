import { ValidatorFn, FormGroup } from '@angular/forms';

export function validateFormPasswordMatch(pass:string,
  confirmPass:string): ValidatorFn {

  return (formGroup: FormGroup): null => {

    const password = formGroup.controls[pass];
    const confirmPassword = formGroup.controls[confirmPass];

    if(password.dirty && confirmPassword.dirty &&
      confirmPassword.value !== password.value) {

      confirmPassword.setErrors({
        passwordNotMatch: true
      });
    } else if(confirmPassword.value == password.value && confirmPassword.dirty){
      confirmPassword.setErrors(null);
    }

    return null;
  };
}
