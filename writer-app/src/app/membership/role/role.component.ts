import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RoleCreateRequest } from '@app/interfaces/role-create-request';
import { AuthService } from '@app/services/auth.service';
import { MessageService } from '@app/services/message.service';
import { RoleService } from '@app/services/role.service';
import { RoleFormComponent } from '../role-form/role-form.component';
import { RoleListComponent } from '../role-list/role-list.component';
import { AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';

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
    MatInputModule,
    MatButtonModule,
    MatIconButton,
    NgFor,
    NgIf,
    JsonPipe,
    CommonModule,
    FormsModule
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements OnInit {

  helloworld = '';
  setRoles($event: any) {
    this.helloworld = $event.value;
  }

  roleService = inject(RoleService);
  authService = inject(AuthService);
  snackBar = inject(MessageService);
  errorMessage = '';

  role: RoleCreateRequest = {} as RoleCreateRequest;
  temp: any;
  roles$ = this.roleService.getRoles();
  users$ = this.authService.getUserList();
  selectedUser: string = '';
  selectedRole: string = '';
  selectedUserRoles: string = '';
  currentUser: any;

  ngOnInit(): void {
  }

  getUserRoles(id: MatSelectChange) {
    console.log(id);
    this.users$.pipe(map((x) => {
      this.selectedUserRoles = x.filter(f => f.id === id.value).map((y: any) => y.roles).join(', ');
      console.log(this.selectedUserRoles);
    })).subscribe();
  }

  createRole(role: RoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.snackBar.openSnackBar(response.message, '닫기');
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.message;

      }
    });
  }

  deleteRole(id: any) {
    this.roleService.deleteRole(id).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.snackBar.openSnackBar(response.message, '닫기');
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        this.snackBar.openSnackBar(error.error.message, '닫기');
      }
    });
  }

  assignRole(userId: string, roleId: string) {
    this.roleService.assignRole(userId, roleId).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.snackBar.openSnackBar(response.message, '닫기');
      },
      error: (error: HttpErrorResponse) => {
        this.roles$ = this.roleService.getRoles();
        this.errorMessage = error.error.message;
        this.snackBar.openSnackBar(error.error, '닫기');
      }
    });
  }
}
