import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserService} from "../../services/user.service";

@Component({
  selector: 'app-form-user-profile',
  templateUrl: './form-user-profile.component.html',
  styleUrls: ['./form-user-profile.component.less']
})
export class FormUserProfileComponent implements OnInit {
  passwordChange = true;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  user = JSON.parse(localStorage.getItem('currentUser'));
  // matcher = new MyErrorStateMatcher();
  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('userId: ', this.user.userId);
    console.log('token: ', this.user.token);
    this.userService.getAll(this.user.userId, this.user.token).subscribe(
      (data: any) => {
        console.log('data: ', data);
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  togglePasswordChange(): boolean {
    console.log('console: click');
    return this.passwordChange = !this.passwordChange;
  }
}
