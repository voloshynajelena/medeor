import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types';

@Component({
  selector: 'app-user-icon-dialog',
  templateUrl: './user-icon-dialog.component.html',
  styleUrls: ['./user-icon-dialog.component.scss']
})
export class UserIconDialogComponent {

  public hideImage = false;
  // public sending = false;
  // private user;

  constructor(
    @Inject(MAT_DIALOG_DATA)
      public data: User,
      // private userService: UserService,
      // private snackBar: MatSnackBar,
  ) {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));
  }


  changeAvatar(fileInput: any): void {
    // this.sending = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = (rs) => {
        this.data.photo = e.target.result;
        // this.changeAvatarData();
      };
    };
    reader.readAsDataURL(fileInput.target.files[0]);
  }

  deleteAvatar(): void {
    // this.sending = true;
    this.data.photo = '';
    // this.changeAvatarData();
  }

  // private changeAvatarData(): void {
  //   this.userService
  //     .update({
  //       userId: this.user.userId,
  //       token: this.user.usertoken,
  //       ...this.data,
  //     })
  //     .subscribe(
  //       (data) => {
  //         this.sending = false;
  //         // updating user data after edit
  //         this.userService.changeUserData(data);
  //       },
  //       (error) => {
  //         this.sending = false;
  //         this.snackBar.open(
  //           'Error. Data was not saved! Description: ' + error,
  //           'Hide'
  //         );
  //       }
  //     );
  // }

}
