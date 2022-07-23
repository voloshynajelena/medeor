import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsModalComponent } from 'src/app/modules/_shared/components/contact-us-modal/contact-us-modal.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: [
    trigger('showHide', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
      ]),
      transition('* => void', [animate('0.3s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ChangePasswordComponent implements OnInit {
  // hide entered password symbols by default
  hideOld = true;
  hideNew = true;
  hideConfirm = true;
  // form group
  changePasswordForm: FormGroup;
  // user data from local storage
  user: { userId: string; token: string };
  // user data from server
  userFull: User;
  // current password
  currentPass: string;
  // new user password
  newPass: string;
  // new user with changed password
  newUser: { id: string; pass: string };
  // show message if pass is changed
  changeSuccess = false;
  // show message if error of pass change
  changeError = false;
  // loader for button submit
  loader = false;
  // icons done
  isOldValid = false;
  isNewValid = false;
  isConfirmValid = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // get userId and token from local storage
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    // get current user data
    this.userService.getUserData(this.user.userId).subscribe((data) => {
      this.userFull = data;
      // get current user password
      this.currentPass = this.userFull.pass;
    });

    // form builder
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPass: [
          '',
          [Validators.required, this.currentPasswordCheck.bind(this)],
        ],
        newPass: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.newPasswordNotAsOld.bind(this),
          ],
        ],
        confirmPass: ['', Validators.required],
      },
      {
        validator: Validators.compose([this.confirmNewPassword]),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.changePasswordForm.controls;
  }

  // validator for old password - is entered value a real current password
  currentPasswordCheck(control: FormControl): ValidationErrors {
    const value = control.value;
    const currentPassword = this.currentPass;

    if (value === currentPassword) {
      return null;
    }
    return { oldPassNotCorrect: 'Incorrect current password' };
  }

  // validator for new password - it shouldn't be the same as old
  newPasswordNotAsOld(control: FormControl): ValidationErrors {
    const value = control.value;
    const currentPassword = this.currentPass;

    if (value !== currentPassword) {
      return null;
    }
    return { newPassNotAsOld: 'New password must be different from old' };
  }

  // validator to confirm new password
  confirmNewPassword(group: FormGroup): ValidationErrors {
    const valueConfirm = group.controls['confirmPass'].value;
    const valueNewPass = group.controls['newPass'].value;
    const valueConfirmCtrl = group.controls['confirmPass'];

    if (valueConfirm === valueNewPass) {
      return null;
    }
    valueConfirmCtrl.setErrors({
      confirmPassNoMatch: 'Does not match to new password',
    });
  }

  // get error message for old pass input
  getErrorMessageOldPass() {
    // error if current password is missing
    if (this.f.oldPass.hasError('required')) {
      return 'Old password is required';
    }

    // error if current password is incorrect
    if (this.f.oldPass.getError('oldPassNotCorrect')) {
      return this.f.oldPass.getError('oldPassNotCorrect');
    }
  }

  // get error message for new pass input
  getErrorMessageNewPass() {
    // error if new password is missing
    if (this.f.newPass.hasError('required')) {
      return 'New password is required';
    }

    // error if new password is less then 6 symbols
    if (this.f.newPass.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }

    // error if new pass is the same as current
    if (this.f.newPass.getError('newPassNotAsOld')) {
      return this.f.newPass.getError('newPassNotAsOld');
    }
  }

  // get error message for confirm pass input
  getErrorMessageConfirmPass() {
    // error if confirm pass is missing
    if (this.f.confirmPass.hasError('required')) {
      return 'Confirmation a new password is required';
    }

    // error if confirm pass doesnt match to a new pass
    if (this.f.confirmPass.getError('confirmPassNoMatch')) {
      return this.f.confirmPass.getError('confirmPassNoMatch');
    }
  }

  // show-hide icon done for old pass
  oldPassOninput() {
    if (this.f.oldPass.valid) {
      this.isOldValid = true;
    }
    if (this.f.oldPass.invalid) {
      this.isOldValid = false;
    }
  }

  // show-hide icon done for new pass
  newPassOninput() {
    if (this.f.newPass.valid) {
      this.isNewValid = true;
    }
    if (this.f.newPass.invalid) {
      this.isNewValid = false;
    }
  }

  // show-hide icon done for confirm pass
  confirmPassOninput() {
    if (this.f.confirmPass.valid) {
      this.isConfirmValid = true;
    }
    if (this.f.confirmPass.invalid) {
      this.isConfirmValid = false;
    }
  }

  // cancel button
  cancelChange() {
    // hide error message
    this.changeError = false;

    // hide success message
    this.changeSuccess = false;

    //loader stop
    this.loader = false;

    // hide icons done
    this.isOldValid = false;
    this.isNewValid = false;
    this.isConfirmValid = false;
  }

  // submit form
  changePassword() {
    // 0 // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }

    // 1 // loader start
    this.loader = true;

    // 2 // new pass initialization
    this.newPass = this.changePasswordForm.controls['newPass'].value;

    // 3 // user with new pass initialization
    this.newUser = {
      id: this.user.userId,
      pass: this.newPass,
    };

    // 4 // send new pass to server
    this.userService.updatePatch(this.newUser).subscribe(
      (data) => {
        //change data for front end untill page will reload
        this.userFull = data;
        this.currentPass = this.userFull.pass;

        // show success message
        this.changeSuccess = true;

        //loader stop
        this.loader = false;

        // hide success message after 2 sec
        setTimeout(() => {
          this.changeSuccess = false;
        }, 2000);
      },
      (error) => {
        // show error message
        this.changeError = true;
      }
    );

    // 5 // reset form after submitting
    this.changePasswordForm.reset();

    // 6 // set errors to null and update validators
    for (const control in this.changePasswordForm.controls) {
      this.changePasswordForm.controls[control].setErrors(null);
      this.changePasswordForm.controls[control].updateValueAndValidity();
    }

    // 7 // hide icons done
    this.isOldValid = false;
    this.isNewValid = false;
    this.isConfirmValid = false;
  }

  // contact us if error
  contactUsModalOpen() {
    this.dialog.open(ContactUsModalComponent, { data: this.userFull });

    // hide error message
    this.changeError = false;

    //loader stop
    this.loader = false;
  }
}
