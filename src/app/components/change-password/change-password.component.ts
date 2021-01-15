import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {

  // hide entered password symbols by default
  hideOld = true;
  hideNew = true;
  hideConfirm = true;

  // form group
  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    // form builder
    this.changePasswordForm = this.formBuilder.group({
      oldPass: ['', Validators.required],
      newPass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required],
    });
  }
  
  // convenience getter for easy access to form fields
  get f(): any { return this.changePasswordForm.controls; }

  // reset form (button cancel)
  resetForm() {
    this.changePasswordForm.reset();
  }

  // submit form
  changePassword() {
      // stop here if form is invalid
      if (this.changePasswordForm.invalid) {
        console.log('Form is NOT submitted!');
        return;
      }
      console.log('Form is submitted!');
      // this.changePasswordForm.reset();
  }

  // get error meassage for old password input
  getErrorMessageOldPass() {
    if (this.f.oldPass.hasError('required')) {
      return 'Old password is required';
    }
  }

  // get error meassage for new password input
  getErrorMessageNewPass() {
    if (this.f.newPass.hasError('required')) {
      return 'New password is required';
    }
    return this.f.newPass.hasError('minlength') ? 'Password must be at least 6 characters' : '';
  }

  // get error meassage for confirm password input
  getErrorMessageConfirmPass() {
    if (this.f.confirmPass.hasError('required')) {
      return 'Confirmation a new password is required';
    }
  }
}
