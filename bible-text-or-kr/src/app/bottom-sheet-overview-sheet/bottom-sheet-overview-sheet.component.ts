
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogComponent } from '@app/dialog/dialog.component';
import { ITodayMassage } from '@app/interfaces/i-today-massage';
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
  loginInfo = this.authService.getUserDetail();
  ngOnInit(): void {
    // this.authService.getUserDetail()?.id
  }

  openDialog(): void {
    this._bottomSheetRef.dismiss();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        content: '',
      },
    });


    dialogRef.afterClosed().subscribe(data => {
      const sendData: ITodayMassage = {
        id: 0,
        userId: this.loginInfo?.id ?? '',
        message: data,
        createdAt: new Date("2024-09-09"),
      };

      this.messageService.postBible(sendData).subscribe({
        next: (res) => {
          this.snackBar.open('메세지가 성공적으로 전송되었습니다.', '닫기', {
            duration: 2000,
          });
        },
        error: (err) => {
          this.snackBar.open('메세지 전송에 실패하였습니다.' + err.message, '닫기', {
            duration: 2000,
          });
        }
      })
    });
  }
}
