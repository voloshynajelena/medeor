import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {

    constructor(private _snackBar: MatSnackBar) { }

    private openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 4000,
        });
    }

    throwError(message: string) {
        this.openSnackBar(`Error: ${message}`, 'ok')
    }
}
