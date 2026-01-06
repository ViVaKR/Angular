import { Component, computed, Directive, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RoleService } from '@app/core/services/role-service';
import { IRole } from '@app/core/interfaces/i-role';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-auth-role',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
    MatDividerModule
  ],
  templateUrl: './auth-role.html',
  styleUrl: './auth-role.scss',
})
export class AuthRole {

  // roleService = inject(RoleService);

  // // computed 로 파생 데이터
  // roleCount = computed(() => this.roleService.roles().length);
  // hasRoles = computed(() => this.roleService.roles().length > 0);

  // roles = this.roleService.roles;

  // fb = inject(FormBuilder);
  // form: FormGroup = this.fb.group({
  //   authRole: ['', Validators.required]
  // });

  // constructor() {
  //   // ✅ effect로 역할 변경 감지
  //   this.roleService.refresh();
  //   effect(() => {
  //     const roles = this.roleService.roles();
  //     console.log('역할 목록 업데이트됨:', roles);

  //     // 첫 번째 역할로 자동 선택(옵션)
  //     if (roles.length > 0 && !this.form.value.authRole) {
  //       this.form.patchValue({ authRole: roles[0].id });
  //     }
  //   })
  // }

  // onSubmit(event: Event) {
  //   // TODO
  //   event.preventDefault();
  //   if (this.form.valid) {
  //     const selectedRoleId = this.form.value.authRole;
  //     const selectedRole = this.roleService.roles().find(x => x.id === selectedRoleId);
  //     console.log('선택된 역할:', selectedRoleId);
  //   }
  // }
}
/*

클래스(TypeScript): 데이터와 로직을 담당
템플릿(HTML): 화면 표시를 담당 - 컴포넌트의 UI를 정의하는 HTML 코드, 쉽게 말하여 사용자가 화면에서 보게 될 내용을 작성하는 곳.

@Directive({
  selector: '[dropZone]',
  exportAs: 'dropZone'
})
export class DropZone { ... }
 */
