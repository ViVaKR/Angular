import { ChangeDetectionStrategy, Component, inject, Inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog'
import { IDialogData } from '@app/interfaces/i-dialog-data';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {

  dialogRef = inject(MatDialogRef<DialogComponent>);
  data = inject<IDialogData>(MAT_DIALOG_DATA);
  content = model(this.data.content); // 내용을 가져옴

  onNoClick(): void {
    this.dialogRef.close();
  }
}
