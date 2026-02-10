import {
  afterNextRender, Component, computed, effect,
  Injector, model, output, signal, viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormGroupDirective } from '@angular/forms';
import { ITodaySutra } from '@app/core/interfaces/i-today-sutra';
import { FontSelector } from "@app/shared/font-selector/font-selector";
import { FontSizeSelector } from "@app/shared/font-size-selector/font-size-selector";
import { MatSelectChange } from '@angular/material/select';
import { FormCommandExcutorService } from '@app/core/services/form-command-excutor-service';
import { TodaySutraService } from '@app/core/services/today-sutra-service';
import { FormCreateService } from '@app/core/services/form-create-service';
import { TODAYSUTRA } from '@app/forms/form-configs';

@Component({
  selector: 'app-create-today-sutra',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    FontSelector,
    FontSizeSelector
  ],
  templateUrl: './create-today-sutra.html',
  styleUrl: './create-today-sutra.scss',
})
export class CreateTodaySutra {

  btnLabel = computed(() => this.data() ? '수정' : '저장');
  data = model<ITodaySutra | null>(null);

  resetRequested = output<void>();
  formDirective = viewChild<FormGroupDirective>('formDirective');
  autosize = viewChild<CdkTextareaAutosize>('autosize');

  currentFont = signal('font-ibm');
  currentFontSize = signal<string>('20px');
  rows = signal<number>(10);
  rowNumbers = (min: number, max: number) =>
    [...Array(max - min + 1).keys()].map((i => i + min));
  lineSpace = 1.8;

  constructor(
    private todaySutraService: TodaySutraService,
    public createForm: FormCreateService,
    private excutor: FormCommandExcutorService,
    private injector: Injector
  ) {
    this.createForm.initialize(TODAYSUTRA);
    effect(() => {
      const data = this.data();
      if (data) {
        this.createForm.form.patchValue({
          title: data.title,
          sutra: data.sutra
        });
      }
    });
  }

  ngAfterViewInit() {
    this.triggerResize();
  }

  triggerResize() {
    afterNextRender(() => {
      this.autosize()?.resizeToFitContent(true);
    }, { injector: this.injector, })
  }

  public fontOptions = (min: number, max: number) =>
    [...Array(max - min + 1).keys()].map(i => `${i + min}px`);

  resetForm(event: Event) {
    event.preventDefault();
    this.formDirective()?.resetForm();
    this.resetRequested.emit(); // 부모에게 알림
  }
  onChangeRows(event: MatSelectChange<any>) {
    this.rows.set(event.value)
    this.triggerResize();
  }

  onFontChanged(font: string) {
    this.currentFont.set(font);
  }

  onFontSizeChanged(size: string) {
    this.currentFontSize.set(size);
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const payload = this.createForm.submitValue();
    if (!payload) return;
    const data = this.data();
    const id = data?.id;
    let result;
    if (id) {
      // * 생성
      result = await this.excutor.excute(
        () => this.todaySutraService.createOrUpdate(payload, id),
        { success: '수정 완료', error: '수정 실패' }
      );
    } else {
      // * 추가
      result = await this.excutor.excute(
        () => this.todaySutraService.createOrUpdate(payload),
        { success: '저장 완료', error: '저장 실패' }
      )
    }
    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }
}
