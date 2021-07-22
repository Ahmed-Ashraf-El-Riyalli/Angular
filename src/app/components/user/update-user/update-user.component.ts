import { environment as env } from './../../../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessAPIService } from 'src/app/access-api.service';
import { User } from 'src/app/core/models/user';
import { asyncUniqueEmailValidator } from 'src/app/validators/unique-email.validator';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  private static readonly emailPattern: string =
    '^[a-zA-Z]{3,}([a-zA-Z0-9.]{3,}){0,}@[a-zA-Z]{2,}([a-zA-Z0-9.]{3,}){0,}.com$';

  user: User;

  userForm: FormGroup;
  nameControl: FormControl;
  ageControl: FormControl;
  addressControl: FormControl;
  emailControl: FormControl;

  constructor(private accessAPIService: AccessAPIService, private router: Router) {}

    ngOnInit(): void {
      this.accessAPIService.getOne(this.accessAPIService.userUrl, env.userID).toPromise().then(
        data => this.user = data,
        error => console.log(error)
      ).finally(
        () => {
          this.initFormControls();
          this.createFormGroup();
        }
      );
    }

    private initFormControls(): void {
      this.nameControl = new FormControl(this.user.Name, {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ],
        asyncValidators: [
        ]
      });

      this.ageControl = new FormControl(this.user.Age, {
        validators: [
          Validators.required,
        ],
        asyncValidators: [
        ]
      });

      this.addressControl = new FormControl(this.user.Address, {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ],
        asyncValidators: [
        ]
      });

      this.emailControl = new FormControl(this.user.Email, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(UpdateUserComponent.emailPattern)
        ],
        asyncValidators: [
          asyncUniqueEmailValidator(this.accessAPIService)
        ],
        updateOn: 'blur'
      });
    }

    private createFormGroup(): void {
      this.userForm = new FormGroup({
        name: this.nameControl,
        age: this.ageControl,
        address: this.addressControl,
        email: this.emailControl
      });
    }

    updateUser(): void {
      const localUser: User = {
        ID: this.user.ID,
        Name: this.nameControl.value,
        Age: this.ageControl.value,
        Address: this.addressControl.value,
        Email: this.emailControl.value,
        Password: this.user.Password
      };

      this.accessAPIService.update(this.accessAPIService.userUrl, this.user.ID, localUser).toPromise(
      ).then(
        data => this.user = data,
        error => console.log(error)
      ).finally(
        () => this.router.navigate(['home'])
      )
    }
}
