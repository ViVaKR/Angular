import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
