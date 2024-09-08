
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { DialogComponent } from '@app/dialog/dialog.component';

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
export class BottomSheetOverviewSheetComponent {


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

  openDialog(): void {
    this._bottomSheetRef.dismiss();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        content: '',
      },
    });

    dialogRef.afterClosed().subscribe(_ => { });
  }
}
