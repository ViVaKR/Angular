import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = '닫기'): MatSnackBarRef<TextOnlySnackBar> {
    let ref = this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    return ref;
  }
}
