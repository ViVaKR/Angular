import { AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, inject, signal, WritableSignal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IRoleCreateRequest } from '@app/interfaces/i-role-create-request';
import { RoleFormComponent } from '@app/membership/role-form/role-form.component';
import { RoleService } from '@app/services/role.service';
import { RoleListComponent } from '../role-list/role-list.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '@app/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { IResponse } from '@app/interfaces/i-response';
import { IRoleAssignRequest } from '@app/interfaces/i-role-assign-request';
import { IUserDetail } from '@app/interfaces/i-user-detail';
import { BibleService } from '@app/services/bible.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MatIconButton,
    JsonPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatInputModule
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements AfterContentChecked {

  constructor() {
    this.cdref.detach();
  }
  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
  roleService = inject(RoleService);
  authService = inject(AuthService);
  codeService = inject(BibleService);

  snackBar = inject(MatSnackBar);
  errorMessage = '';
  userInfo: WritableSignal<string[]> = signal(['-']);

  cdref = inject(ChangeDetectorRef);
  get userRoles() {
    return this.userInfo().join(', ');
  }

  role: IRoleCreateRequest = {} as IRoleCreateRequest;
  roles$ = this.roleService.getRoles();
  users$ = this.authService.getUsers();
  selectedUser: string = '';
  selectedRole: string = '';

  ngOnInit(): void {
    this.codeService.isElement.next(true);
    this.authService.isAdmin().subscribe({
      next: (response) => {
        if (!response) {
          let ref = this.snackBar.open('You are not authorized to view this page', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });

          ref.afterDismissed().subscribe(() => {
            window.history.back();
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    });
  }

  createRole(role: IRoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (response: IResponse) => {

        this.roles$ = this.roleService.getRoles();
        this.cdref.detectChanges();

        this.snackBar.open(response.message, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      error: (error: HttpErrorResponse) => {
        this.roles$ = this.roleService.getRoles();
        this.cdref.detectChanges();
        this.snackBar.open(error.error, '닫기', {
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
        this.cdref.detectChanges();
        this.snackBar.open(response.message, '닫기', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      error: (error: HttpErrorResponse) => {
        this.roles$ = this.roleService.getRoles();
        this.cdref.detectChanges();
        this.snackBar.open(`Error: ${error.error}`, '닫기', {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  assignRole(userId: string, roleId: string) {

    let assign = {
      userId: userId,
      roleId: roleId
    } as IRoleAssignRequest;

    this.roleService.assignRole(assign).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this.getUserRoles(userId);
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

  getUserRoles(id: string) {
    this.authService.getAccountById(id).subscribe({
      next: (res: IUserDetail) => {
        // this.userInfo = res.roles;
        this.userInfo.set(res.roles);
        this.cdref.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.userInfo.set(['-']);
        this.snackBar.open(`Error: ${error.error}`, 'Close', {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }
}
