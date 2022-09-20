import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public hideOld = true; // hide entered password symbols by default
  public hideNew = true;
  public hideConfirm = true;
  public changePasswordForm: FormGroup;
  public changeSuccess = false;
  public changeError = false;
  public loader = false;
  public isOldValid = false;
  public isNewValid = false;
  public isConfirmValid = false;

  private user: { userId: string; token: string }; // user data from local storage
  private userFull: User; // user data from server
  private currentPass: string;
  private newPass: string;
  private newUser: { id: string; pass: string };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    // get current user data
    this.userService.getUserData(this.user.userId).subscribe((data) => {
      this.userFull = data;
      this.currentPass = this.userFull.pass; // get current user password
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
  private currentPasswordCheck(control: FormControl): ValidationErrors {
    const value = control.value;
    const currentPassword = this.currentPass;

    if (value === currentPassword) {
      return null;
    }
    return { oldPassNotCorrect: 'Incorrect current password' };
  }

  // validator for new password - it shouldn't be the same as old
  private newPasswordNotAsOld(control: FormControl): ValidationErrors {
    const value = control.value;
    const currentPassword = this.currentPass;

    if (value !== currentPassword) {
      return null;
    }
    return { newPassNotAsOld: 'New password must be different from old' };
  }

  // validator to confirm new password
  private confirmNewPassword(group: FormGroup): ValidationErrors {
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
  public getErrorMessageOldPass(): string {
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
  public getErrorMessageNewPass(): string {
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
  public getErrorMessageConfirmPass(): string {
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
  public oldPassOninput(): void {
    if (this.f.oldPass.valid) {
      this.isOldValid = true;
    }
    if (this.f.oldPass.invalid) {
      this.isOldValid = false;
    }
  }

  // show-hide icon done for new pass
  public newPassOninput(): void {
    if (this.f.newPass.valid) {
      this.isNewValid = true;
    }
    if (this.f.newPass.invalid) {
      this.isNewValid = false;
    }
  }

  // show-hide icon done for confirm pass
  public confirmPassOninput(): void {
    if (this.f.confirmPass.valid) {
      this.isConfirmValid = true;
    }
    if (this.f.confirmPass.invalid) {
      this.isConfirmValid = false;
    }
  }

  // cancel button
  public cancelChange(): void {
    this.changeError = false; // hide error message
    this.changeSuccess = false; // hide success message
    this.loader = false; // loader stop

    // hide icons done
    this.isOldValid = false;
    this.isNewValid = false;
    this.isConfirmValid = false;
  }

  // submit form
  public changePassword(): void {
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
        // change data for front end untill page will reload
        this.userFull = data;
        this.currentPass = this.userFull.pass;
        this.changeSuccess = true;
        this.loader = false;

        setTimeout(() => {
          this.changeSuccess = false;
        }, 2000);
      },
      (error) => {
        // TODO: show error message
        this.changeError = true;
      }
    );

    // 5 // reset form after submitting
    this.changePasswordForm.reset();

    // 6 // set errors to null and update validators
    // TODO: fix this
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
  public contactUsModalOpen(): void {
    this.dialog.open(ContactUsModalComponent, { data: this.userFull });
    this.changeError = false;
    this.loader = false;
  }
}
