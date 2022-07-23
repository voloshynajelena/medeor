import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../types';
import { RemoveClientModalComponent } from '../client-list/remove-client-modal/remove-client-modal.component';

export enum TabLabelEnum {
  PROFILE = 'Profile',
  NOTIFICATION = 'Notification',
  SECURITY = 'Security',
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  private urlExp =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  private user;

  public userForm = new FormGroup({
    photo: new FormControl(''),
    surname: new FormControl('', [Validators.required]),
    specialties: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(12),
    ]),
  });

  public data: User;
  public userAvatar: string;

  public editMode = false;
  public sending = false;

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (this.user?.userId) {
      this.userService.getUserData(this.user.userId).subscribe((data: User) => {
        this.data = data;
        this.userAvatar = data.photo;
        this.resetFormData();
      });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.setTabRouterParam(params.activeTab);
    });
  }

  enableEditMode(): void {
    this.editMode = true;

    this.userForm.markAllAsTouched();
    this.userForm.updateValueAndValidity();
  }

  disableEditMode(): void {
    this.resetFormData();
    this.editMode = false;
  }

  resetFormData(): void {
    const userData = this.data;

    userData.photo = this.userAvatar;

    for (const key in userData) {
      if (this.userForm.controls.hasOwnProperty(key)) {
        this.userForm.controls[key].setValue(userData[key]);
      }
    }
  }

  setAvatar(url: string): void {
    if (url.match(this.urlExp)) {
      const img = new Image();

      img.addEventListener('error', (event) => (this.data.photo = ''));
      img.addEventListener('load', (event) => (this.data.photo = url));

      img.src = url;
    } else {
      this.data.photo = '';
    }
  }

  submit(): void {
    this.sending = true;

    const controls = this.userForm.controls;
    const formData = JSON.parse(JSON.stringify(this.data));

    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        formData[key] = controls[key].value;
      }
    }

    formData.photo = this.userAvatar = this.data.photo;

    this.userService
      .update({
        userId: this.user.userId,
        token: this.user.usertoken,
        ...formData,
      })
      .subscribe(
        (data) => {
          this.sending = false;

          for (const key in controls) {
            if (controls.hasOwnProperty(key)) {
              this.data[key] = controls[key].value;
            }
          }

          this.disableEditMode();
        },
        (error) => {
          this.sending = false;
          this._snackBar.open('Error. Data was not saved!', 'Hide');
        }
      );
  }

  acceptToRemove(): void {
    const dialogRef = this.dialog.open(RemoveClientModalComponent, {
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userService.delete(this.user.userdId).subscribe((resp) => {
          this.user = null;

          this.authenticationService.logout();
          this.router.navigate(['/login']);
        });
      }
    });
  }

  setTabRouterParam(selectTab?: string): void {
    this.router
      .navigate([], {
        queryParams: { activeTab: selectTab || TabLabelEnum.PROFILE },
      })
      .then();
  }

  tabChangeHandler(event: MatTabChangeEvent): void {
    const tabName = event.tab.textLabel;

    this.router.navigate([], { queryParams: { activeTab: tabName } }).then();
  }
}