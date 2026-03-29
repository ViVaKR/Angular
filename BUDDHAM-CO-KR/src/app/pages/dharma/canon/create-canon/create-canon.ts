import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Injector, input, model, output, signal, viewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { getEnumOptions } from '@app/core/enums/enum-utils';
import { PinOrder, pinOrderLabel } from '@app/core/enums/pin-order';
import { ICanonCreateOrUpdate, ICanonEntry } from '@app/core/interfaces/dharma/i-canon-schema';
import { AlertService } from '@app/core/services/alert-service';
import { CanonService } from '@app/core/services/dharma/canon-service';
import { FormCommandExcutorService } from '@app/core/services/form-command-excutor-service';
import { GenericFormService } from '@app/core/services/generic-form-service';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';
import { CANON_FORM_CONFIG } from '@app/forms/form-configs';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { BodyTitle } from "@app/shared/body-title/body-title";

@Component({
  selector: 'app-create-canon',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    BodyTitle
  ],
  templateUrl: './create-canon.html',
  styleUrl: './create-canon.scss',
})
export class CreateCanon {

  title = Paths.CreateCanon.title;
  btnLabel = computed(() => this.data() ? '수정' : '저장');

  data = model<ICanonCreateOrUpdate | null>(null);

  readonly icon = 'post_add';

  readonly service = inject(CanonService);
  readonly excutor = inject(FormCommandExcutorService);
  readonly createForm = inject(GenericFormService<ICanonEntry>);
  readonly injector = inject(Injector);
  readonly alert = inject(AlertService);
  readonly anchorId = input<string>('anchorId');
  readonly userStore = inject(UserStore);

  resetRequested = output<void>();

  currentFont = signal('font-ibm');
  currentFontSize = signal('16px');
  rows = signal<number>(10);
  rowNumbers = (min: number, max: number) => [...Array(max - min + 1).keys()].map(i => i + min);

  lineSpace = 1.8;
  autosize = viewChild<CdkTextareaAutosize>
  formDirective = viewChild<FormGroupDirective>('formDirective');

  pinOrderOptions = getEnumOptions(PinOrder);

  readonly isAdmin = computed(() => {
    return this.userStore.userRoles().includes('Admin');
  });

  constructor() {
    effect(() => {
      const data = this.data();
      if (data) {
        this.createForm.form.patchValue({});
      }
    });

    effect(() => {
      this.currentFont();
    });

    effect(() => {
      this.currentFontSize();
    });
  }

  ngOnInit(): void {
    this.createForm.initialize(CANON_FORM_CONFIG, this.service)
  }

  resetForm(event: Event) {
    event.preventDefault();
    this.formDirective()?.resetForm();
    this.resetRequested.emit();
  }

  getPinLabel = pinOrderLabel;

  async onDelete(id: number): Promise<void> {
    const result = await this.excutor.excute(
      () => this.service.delete(id),
      {
        success: '삭제 완료'
      }
    );

    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }
  async onSubmit(event: Event): Promise<void> {

    event.preventDefault();

    const payload = this.createForm.submitValue();
    if (!payload) return;
    const data = this.data();
    const id = data?.id;

    const result = await this.excutor.excute(
      () => id
        ? this.service.createOrUpdate(payload, id)
        : this.service.createOrUpdate(payload),
      {
        success: id ? '수정 완료' : '저장 완료'
      }
    );

    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }

}
