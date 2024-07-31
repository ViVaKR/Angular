import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RoleCreateRequest } from '@app/interfaces/role-create-request';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    NgIf,
    NgFor,
    MatSnackBarModule,
    CommonModule,
    MatButtonModule,
    MatIconButton,
    MatIconModule
  ],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss'
})
export class RoleFormComponent {
  @Input({ required: true }) role!: RoleCreateRequest;
  @Input() errorMessage!: string;
  @Output() addRole: EventEmitter<RoleCreateRequest> = new EventEmitter<RoleCreateRequest>();

  add() {
    this.addRole.emit(this.role);
  }
}
