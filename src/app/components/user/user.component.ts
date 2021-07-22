import { environment as env } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessAPIService } from 'src/app/access-api.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  user: User;

  constructor(private accessAPIService: AccessAPIService, private router: Router) {}

  ngOnInit(): void {
    this.refreshView();
  }

  onSubmit(): void {
    this.router.navigate(['user/update']);
  }

  private refreshView(): void {
    this.accessAPIService.getOne(this.accessAPIService.userUrl, env.userID).subscribe(
      data => this.user = data,
      error => console.log(error)
    );
  }

}
