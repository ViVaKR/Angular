import { inject, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormService } from "@app/core/services/form-service";
import { ScriptureService } from "@app/core/services/scripture-service";
import { SCRIPTURE_MASTER } from "@app/forms/form-configs";

@Injectable({ providedIn: 'root' })
export class CreateScriptureMasterForm {

  private formService = inject(FormService);
  private scriptureService = inject(ScriptureService);
  public fields = SCRIPTURE_MASTER;

  readonly form: FormGroup = this.formService.createForm(this.fields, this.scriptureService);

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

  reset(value?: any) {
    this.formService.deepResetForm(this.form, value);
  }
}
