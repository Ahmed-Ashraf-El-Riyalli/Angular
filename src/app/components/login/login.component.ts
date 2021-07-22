import { LoginModel } from './../../core/models/login-model';
import { environment as env } from './../../../environments/environment';
import { Router } from '@angular/router';
import { AccessAPIService } from 'src/app/access-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  private static readonly emailPattern: string =
    '^[a-zA-Z]{3,}([a-zA-Z0-9.]{3,}){0,}@[a-zA-Z]{2,}([a-zA-Z0-9.]{3,}){0,}.com$';

  emailControl: FormControl;
  passwordControl: FormControl;
  loginForm: FormGroup;
  isNotAuthorize: boolean;

  constructor(private accessAPIService: AccessAPIService,
              private router: Router) {

    this.initFormControls();
    this.createForm();
    this.isNotAuthorize = false;
  }

  private initFormControls(): void {
    this.emailControl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(LoginComponent.emailPattern)
      ],
      asyncValidators: [
      ],
      updateOn: 'blur'
    });
    this.passwordControl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3)
      ],
      asyncValidators: [
      ],
      updateOn: 'blur'
    });
  }

  private createForm(): void {
    this.loginForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });
  }

  onSubmit(): void {
    // send to server
    if(this.loginForm.valid) {

      const urlSection = 'Login';

      const user: LoginModel = {
        Email: this.emailControl.value,
        Password: this.passwordControl.value
      };

      this.checkUser(urlSection, user).then(
        () => {
          if(!env.isAuthorize)
            this.isNotAuthorize = true;
        }
      );
    }
  }

  onReset(): void {
    // clear the form
    this.loginForm.reset();
  }

  private saveToken(tokenObject: {token: string, ID: number} | null): void {

    // save the token in the session storage for example
    if(tokenObject != null) {
      const tokenString = tokenObject.token;
      const userID = tokenObject.ID;

      env.isAuthorize = true;
      env.userID = userID;
      console.log(userID);
      sessionStorage.setItem('token', tokenString);

      this.router.navigate(['home']);
    }
  }

  private async checkUser(urlSection: string, user: LoginModel): Promise<any> {

    return this.accessAPIService.add(urlSection, user).subscribe(
      data => this.saveToken(data),
      error => console.log('checkUser Error => ', error)
    )
  }


}
