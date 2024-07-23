import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleCreateRequest } from '@app/interfaces/role-create-request';
import { RoleFormComponent } from '@app/membership/role-form/role-form.component';
import { RoleService } from '@app/services/role.service';
import { RoleListComponent } from '../role-list/role-list.component';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { AuthService } from '@app/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    RoleFormComponent,
    RoleListComponent,
    AsyncPipe,
    MatFormFieldModule,
    MatLabel,
    MatSelectModule,
    NgFor,
    NgIf,
    MatInputModule,
    MatButtonModule,
    MatIconButton


  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {


  roleService = inject(RoleService);
  authService = inject(AuthService);

  snackBar = inject(MatSnackBar);
  errorMessage = '';

  role: RoleCreateRequest = {} as RoleCreateRequest;
  roles$ = this.roleService.getRoles();
  users$ = this.authService.getUsers();
  selectedUser: string = '';
  selectedRole: string = '';

  createRole(role: RoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (response) => {

        this.roles$ = this.roleService.getRoles();
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      error: (error: HttpErrorResponse) => {
        this.roles$ = this.roleService.getRoles();
        this.snackBar.open(error.error, 'Close', {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  deleteRole(id: string) {
    this.roleService.deleteRole(id).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      error: (error: HttpErrorResponse) => {
        this.roles$ = this.roleService.getRoles();
        this.snackBar.open(`Error: ${error.error}`, 'Close', {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  assignRole(userId: string, roleId: string) {
    this.roleService.assignRole(userId, roleId).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      error: (error: HttpErrorResponse) => {
        this.roles$ = this.roleService.getRoles();
        this.snackBar.open(`Error: ${error.error}`, 'Close', {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }
}
