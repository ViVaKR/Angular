import { inject, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormService } from "@app/core/services/form-service";
import { RoleService } from "@app/core/services/role-service";
import { ROLE_FORM_CONFIG } from "@app/forms/form-configs";

@Injectable({ providedIn: 'root' })
export class CreateRoleForm {
  private formService = inject(FormService);
  private roleService = inject(RoleService);

  public fields = ROLE_FORM_CONFIG;

  readonly form: FormGroup = this.formService.createForm(this.fields, this.roleService);

  submitValue() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return null;
    }
    return this.form.getRawValue();
  }

  hasError(fieldName: string, errorType: string): boolean {
    return this.formService.hasError(this.form, fieldName, errorType);
  }

  isFieldPending(fieldName: string): boolean {
    return this.formService.isFieldPending(this.form, fieldName);
  }
}
