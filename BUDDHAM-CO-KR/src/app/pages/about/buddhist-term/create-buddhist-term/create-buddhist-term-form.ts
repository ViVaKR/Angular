import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BuddhistTermService } from '@app/core/services/buddhist-term-service';
import { FormService } from '@app/core/services/form-service';
import { BUDDHIST_TERM } from '@app/forms/form-configs';

@Injectable({
  providedIn: 'root',
})
export class CreateBuddhistTermForm {
  private formServce = inject(FormService);
  private buddhistTermService = inject(BuddhistTermService);
  public fields = BUDDHIST_TERM;

  readonly form: FormGroup = this.formServce.createForm(this.fields, this.buddhistTermService);

  submitValue() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return null;
    }
    return this.form.getRawValue();
  }

  hasError(fieldName: string, errorType: string): boolean {
    return this.formServce.hasError(this.form, fieldName, errorType);
  }

  ifsFieldPending(fieldName: string): boolean {
    return this.formServce.isFieldPending(this.form, fieldName);
  }

  reset(value?: any) {
    this.formServce.deepResetForm(this.form, value);
  }

}
