import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Injector, input, model, OnInit, output, signal, viewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { IQnaCreateOrUpdate } from '@app/core/interfaces/i-qna';
import { AlertService } from '@app/core/services/alert-service';
import { FormCommandExcutorService } from '@app/core/services/form-command-excutor-service';
import { GenericFormService } from '@app/core/services/generic-form-service';
import { QnaService } from '@app/core/services/qna-service';
import { QNA } from '@app/forms/form-configs';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { BodyTitle } from "@app/shared/body-title/body-title";
import { PinOrder } from '@app/core/enums/pin-order';
import { getEnumOptions } from '@app/core/enums/enum-utils';
import { MatSelectChange } from '@angular/material/select';
import { UserStore } from '@app/core/services/user-store';

@Component({
  selector: 'qna-create',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    BodyTitle
  ],
  templateUrl: './qna-create.html',
  styleUrl: './qna-create.scss',
})
export class QnaCreate implements OnInit {

  title = '데이터 관리';
  btnLabel = computed(() => this.data() ? '수정' : '저장');
  data = model<IQnaCreateOrUpdate | null>(null);
  readonly userStore = inject(UserStore);
  isAdmin = computed(() => {
    return this.userStore.userRoles().includes('Admin');
  })

  acnchorId = input<string>('anchorId');
  icon = 'post_add';

  readonly qnaService = inject(QnaService);

  readonly excutor = inject(FormCommandExcutorService);
  readonly injector = inject(Injector);
  readonly alert = inject(AlertService);

  createForm = inject(GenericFormService<IQnaCreateOrUpdate>);
  resetRequested = output<void>();
  currentFont = signal('font-ibm'); // font-selector
  currentFontSize = signal<string>('16px'); // font-size-selector
  rows = signal<number>(10);
  rowNumbers = (min: number, max: number) =>
    [...Array(max - min + 1).keys()].map(i => i + min);

  lineSpace = 1.8;
  formDirective = viewChild<FormGroupDirective>('formDirective');
  autosize = viewChild<CdkTextareaAutosize>('autosize');

  pinOrderOptions = getEnumOptions(PinOrder);

  constructor() {
    effect(() => {
      const data = this.data();
      if (data) {
        this.createForm.form.patchValue({
          title: data.title,
          content: data.content,
          pinOrder: data.pinOrder
        });
      }
    });

    // font
    effect(() => {
      this.currentFont();
    });

    effect(() => {
      this.currentFontSize();
    });
  }

  ngOnInit(): void {
    this.createForm.initialize(QNA, this.qnaService);
  }

  resetForm(event: Event) {
    event.preventDefault();
    this.formDirective()?.resetForm();
    this.resetRequested.emit();
  }

  // 좀 더 친절한 라벨링을 원하실 때
  getPinLabel(key: string): string {
    switch (key) {
      case 'NotFixed': return '고정 안 함';
      case 'GeneralFixed': return '일반 고정';
      case 'ImportantFixed': return '중요 공지';
      case 'TopFixed': return '최상단 고정';
      default: return key;
    }
  }

  async OnDelete(id: number): Promise<void> {
    const result = await this.excutor.excute(
      () => this.qnaService.deleteQna(id),
      {
        success: '삭제 완료'
      }
    );

    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }

  onSelectionChange(event: MatSelectChange) {
    console.log('--> ', event.value, event.source);
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    const payload = this.createForm.submitValue();
    if (!payload) return;
    const data = this.data();
    const id = data?.id;

    const result = await this.excutor.excute(
      () => id
        ? this.qnaService.qnaCreateOrUpdate(payload, id)
        : this.qnaService.qnaCreateOrUpdate(payload),
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
