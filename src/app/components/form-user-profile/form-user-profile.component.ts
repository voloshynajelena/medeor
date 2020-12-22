import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-user-profile',
  templateUrl: './form-user-profile.component.html',
  styleUrls: ['./form-user-profile.component.less']
})
export class FormUserProfileComponent implements OnInit {
  passwordChange = true;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  // matcher = new MyErrorStateMatcher();
  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor() { }

  ngOnInit(): void {
  }

  togglePasswordChange(): boolean {
    console.log('console: click');
    return this.passwordChange = !this.passwordChange;
  }
}
