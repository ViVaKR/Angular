
import { DatePipe, formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogComponent } from '@app/dialog/dialog.component';
import { IResponse } from '@app/interfaces/i-response';
import { ITodayMessage } from '@app/interfaces/i-today-massage';
import { AuthService } from '@app/services/auth.service';
import { TodayMessageService } from '@app/services/today-message.service';

@Component({
  selector: 'app-bottom-sheet-overview-sheet',
  standalone: true,
  imports: [
    MatListModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    DialogComponent
  ],
  templateUrl: './bottom-sheet-overview-sheet.component.html',
  styleUrl: './bottom-sheet-overview-sheet.component.scss'
})
export class BottomSheetOverviewSheetComponent implements OnInit {


  router = inject(Router);
  dialog = inject(MatDialog);

  ngOnInit(): void { }

  goTo(url: string) {
    this._bottomSheetRef.dismiss();
    this.router.navigate([url]);
  }

  _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetOverviewSheetComponent>>(MatBottomSheetRef);

  openLink(event: MouseEvent, url: string): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
    this.router.navigate([url]);
  }

  messageService = inject(TodayMessageService);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);

  openDialog(): void {
    this._bottomSheetRef.dismiss();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        content: '',
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (this.authService.isLoggedIn() === false) return;
      let id = this.authService.getUserDetail()?.id;
      if (id === '') return;
      const sendData: ITodayMessage = {
        id: 0,
        userId: id!,
        message: data,
      };

      this.messageService.postMessage(sendData).subscribe({
        next: (res: IResponse) => {
          if (res.isSuccess) {
            this.snackBar.open('메세지가 등록되었습니다.', '확인', { duration: 2000 });
          } else {
            this.snackBar.open('메세지 등록에 실패하였습니다.', '확인', { duration: 2000 });
          }
        }
      })
    });
  }
}
