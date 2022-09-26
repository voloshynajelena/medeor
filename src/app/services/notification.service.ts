import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration = 3000;
  buttonText = 'ok';

  constructor(private _snackBar: MatSnackBar) {}

  private openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: this.duration,
      verticalPosition: this.verticalPosition,
    });
  }

  throwError(message: string): void {
    this.openSnackBar(`Error: ${message}`, this.buttonText);
  }
}
