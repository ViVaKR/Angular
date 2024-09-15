import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IRoleCreateRequest } from '@app/interfaces/i-role-create-request';

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
    MatIconButton,
    MatIconModule
  ],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss'
})
export class RoleFormComponent {
  @Input({ required: true }) role!: IRoleCreateRequest;
  @Input() errorMessage!: string;
  @Output() addRole = new EventEmitter<IRoleCreateRequest>();

  add() {
    this.addRole.emit(this.role);
  }
}
