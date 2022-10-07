import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/types';

@Component({
  selector: 'app-user-icon-dialog',
  templateUrl: './user-icon-dialog.component.html',
  styleUrls: ['./user-icon-dialog.component.scss']
})
export class UserIconDialogComponent {

  public hideImage = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
      public data: User
  ) {}

  changeAvatar(fileInput: any): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = (rs) => {
        this.data.photo = e.target.result;
      };
    };
    reader.readAsDataURL(fileInput.target.files[0]);
  }

  deleteAvatar(): void {
    this.data.photo = '';
  }

}
