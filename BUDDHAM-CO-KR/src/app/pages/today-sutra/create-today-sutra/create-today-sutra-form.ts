import { inject, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TodaySutraService } from "@app/core/services/today-sutra-service";
import { FormService } from "@app/core/services/form-service";
import { TODAYSUTRA_FORM_CONFIG } from "@app/forms/form-configs";

@Injectable({ providedIn: 'root' })
export class CreateTodaySutraForm {

  private formService = inject(FormService);
  private todaySutraService = inject(TodaySutraService);

  public fields = TODAYSUTRA_FORM_CONFIG;

  readonly form: FormGroup = this.formService.createForm(this.fields, this.todaySutraService);

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
  // CreateTodaySutraForm에 추가
  reset(value?: any) {
    this.formService.deepResetForm(this.form, value);
    // this.formService.resetForm(this.form, value);
  }
}
