import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration: number = 3000;
  buttonText: string = 'ok';

  constructor(private _snackBar: MatSnackBar) {}

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.duration,
      verticalPosition: this.verticalPosition,
    });
  }

  throwError(message: string) {
    return this.openSnackBar(`Error: ${message}`, this.buttonText);
  }
}
