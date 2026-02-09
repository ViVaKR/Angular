import {
  afterNextRender, Component, computed, effect,
  Injector, input, model, output, viewChild
} from '@angular/core';
import { CreateTodaySutraCommand } from './create-today-sutra-command';
import { CreateTodaySutraForm } from './create-today-sutra-form';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormGroupDirective } from '@angular/forms';
import { ITodaySutra } from '@app/core/interfaces/i-today-sutra';

@Component({
  selector: 'app-create-today-sutra',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
  ],
  templateUrl: './create-today-sutra.html',
  styleUrl: './create-today-sutra.scss',
})
export class CreateTodaySutra {

  title = computed(() => this.data() ? '수정' : '저장');
  data = model<ITodaySutra | null>(null);
  rows = input<number>();
  resetRequested = output<void>();
  formDirective = viewChild<FormGroupDirective>('formDirective');
  autosize = viewChild<CdkTextareaAutosize>('autosize');
  lineSpace = 1.8;

  constructor(
    public createForm: CreateTodaySutraForm,
    private command: CreateTodaySutraCommand,
    private injector: Injector
  ) {

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

  onSubmit(event: Event) {
    event.preventDefault();
    const payload = this.createForm.submitValue();
    if (!payload) return;

    const data = this.data();
    const id = data?.id; // todaySutra 에서 직접 가져오기
    try {
      if (id) {
        this.command.excute(payload, id); // 수정
      } else {
        this.command.excute(payload) // 생성
      }
    } finally {
      this.formDirective()?.resetForm();
    }
  }
}
