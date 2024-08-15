import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllMatModule } from '@app/materials/all-mat/all-mat.module';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    AllMatModule
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ok() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
