import { Component, effect, inject, input, signal, WritableSignal } from '@angular/core';
import { CreateRoleForm } from './create-role-form';
import { CreateRoleCommand } from './create-role-command';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { AlertService } from '@app/core/services/alert-service';

@Component({
  selector: 'app-create-role',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON

  ],
  templateUrl: './create-role.html',
  styleUrl: './create-role.scss',
})
export class CreateRole {

  id = input<string | null>(null);
  name = input<string | null>(null);
  description = input<string | null>(null);

  mode = signal<boolean>(true);
  title = signal<string | null>('역할');

  alertService = inject(AlertService);

  constructor(
    public roleForm: CreateRoleForm,
    private command: CreateRoleCommand
  ) {

    effect(() => {
      this.mode.set(this.id() == '' || this.id() == null);
      if (!this.mode()) {
        this.title.set('역할수정')
        this.roleForm.form.patchValue({
          name: this.name(),
          description: this.description()
        });
      } else {
        this.title.set('역할생성');
        this.roleForm.form.reset();
      }
    });

  }

  async onDeleteRole(event: MouseEvent) {
    event.preventDefault();

    const name = this.name();
    if (name == null || name == null) return;
    try {
      await this.command.deleteRole(name);
    } finally {
      this.roleForm.form.reset();
    }
  }

  onSubmit(event: MouseEvent) {
    event.preventDefault();
    const payload = this.roleForm.submitValue();
    if (!payload) {
      this.alertService.openSheet([{
        title: '폼 생성에 실패했습니다.',
        content: 'this.roleForm'
      }]);
      return;
    }
    const id = this.id();

    try {
      this.mode()
        ? this.command.execute(payload) // 생성
        : this.command.execute(payload, id!); // 수정
    } finally {
      this.roleForm.form.reset();
    }
  }
}
