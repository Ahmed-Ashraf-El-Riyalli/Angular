import { Router } from '@angular/router';
import { AccessAPIService } from './../../access-api.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateFormPasswordMatch } from '../../validators/form.validator';
import { validateName } from '../../validators/name.validator';
import { asyncUniqueEmailValidator } from 'src/app/validators/unique-email.validator';
import { User } from 'src/app/core/models/user';
import { environment as env } from './../../../environments/environment';
import { RegistrationModel } from 'src/app/core/models/registration-model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent {

  private static readonly emailPattern: string =
    '^[a-zA-Z]{3,}([a-zA-Z0-9.]{3,}){0,}@[a-zA-Z]{2,}([a-zA-Z0-9.]{3,}){0,}.com$';
    // valid email: abc@abc.com | abc.ar@abc.ar.com | abc01.ar01@abc.ar.com
    // invalid email: 123abc@abc.com | abc@abc.xyz | ab@a.com

  private static readonly namePattern: RegExp = /[0-9]/g;
  // private static readonly namePattern: string = '/^[a-zA-Z]{3,}$/';

  registrationForm: FormGroup;
  nameControl: FormControl;
  ageControl: FormControl;
  addressControl: FormControl;
  emailControl: FormControl;
  passwordControl: FormControl;
  confirmPasswordControl: FormControl;

  constructor(private accessAPIService: AccessAPIService,
              private router: Router) { }

  ngOnInit(): void {
    this.initFormControls();
    this.createForm();
  }

  initFormControls(): void {
    this.nameControl = new FormControl('', {
      validators: [
        Validators.required,
        // Validators.pattern(RegistrationComponent.namePattern)
        Validators.minLength(3),
        validateName(RegistrationComponent.namePattern)
      ],
      updateOn: 'blur'
    });

    this.ageControl = new FormControl('', {
      validators: [
        Validators.required,
      ],
      asyncValidators: [
      ]
    });

    this.addressControl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3)
      ],
      asyncValidators: [
      ]
    });

    this.emailControl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(RegistrationComponent.emailPattern)
      ],
      asyncValidators: [
        asyncUniqueEmailValidator(this.accessAPIService)
      ],
      updateOn: 'blur'
    });

    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]);
    this.confirmPasswordControl = new FormControl('', [
      Validators.required,
    ]);
  }

  createForm(): void {
    this.registrationForm = new FormGroup({
      name: this.nameControl,
      age: this.ageControl,
      address: this.addressControl,
      email: this.emailControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl
      },
      validateFormPasswordMatch('password', 'confirmPassword')
    );
  }

  onSubmit(): void {
    const user: RegistrationModel = {
      Name: this.nameControl.value,
      Age: this.ageControl.value,
      Address: this.addressControl.value,
      Email: this.emailControl.value,
      Password: this.passwordControl.value,
      ConfirmPassword: this.confirmPasswordControl.value
    };

    this.accessAPIService.add(this.accessAPIService.registrationUrl, user).subscribe(
      (data) => {
        console.log(data);
        this.saveToken(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onReset(): void {
    // clear the form
    // we will get an exception if we
    // didn't disable the validators
    this.nameControl.clearValidators();
    this.registrationForm.reset();
  }

  nameOnInput(): void {
    this.nameControl.setValidators([
      Validators.required,
      Validators.minLength(3),
      validateName(RegistrationComponent.namePattern)
    ]);
  }

  private saveToken(tokenObject: {token: string, ID: number} | null): void {

    if(tokenObject != null) {
      // save the token in the session storage for example
      const tokenString = tokenObject.token;
      const userID = tokenObject.ID;

      env.isAuthorize = true;
      env.userID = userID;

      console.log(userID);

      sessionStorage.setItem('token', tokenString);

      this.router.navigate(['home']);
    }
  }
}
