import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { afterNextRender, Component, computed, effect, inject, Injector, model, output, signal, viewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBuddhistTermDTO } from '@app/core/interfaces/i-buddhist-term-dto';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { CreateBuddhistTermCommand } from './create-buddhist-term-command';
import { CreateBuddhistTermForm } from './create-buddhist-term-form';

@Component({
  selector: 'app-create-buddhist-term',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
  ],
  templateUrl: './create-buddhist-term.html',
  styleUrl: './create-buddhist-term.scss',
})
export class CreateBuddhistTerm {

  title = computed(() => this.data() ? '수정' : '저장');
  data = model<IBuddhistTermDTO | null>(null);
  resetRequested = output<void>();

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  formDirective = viewChild<FormGroupDirective>('formDirective');
  autosize = viewChild<CdkTextareaAutosize>('autosize');

  listUrl = signal<string>(
    this.route.snapshot.queryParamMap.get('returnUrl') ||
    Paths.BuddhistTerm.url
  );
  currentFont = signal('font-noto');
  currentFontSize = signal<string>('16px');
  lineSpace = 1.8;

  constructor(
    public createForm: CreateBuddhistTermForm,
    public command: CreateBuddhistTermCommand,
    private injector: Injector
  ) {
    effect(() => {
      const data = this.data();
      if (data) {
        this.createForm.form.patchValue({
          term: data.term,
          explanation: data.explanation
        });
        this.triggerResize();
      }
    });

    effect(() => {
      this.currentFont();
      this.triggerResize();
    });

    effect(() => {
      this.currentFontSize();
      this.triggerResize();
    });
  }

  ngAfterViewInit() {
    this.triggerResize();
  }

  triggerResize() {
    afterNextRender(() => {
      this.autosize()?.resizeToFitContent(true);
    }, { injector: this.injector });
  }

  onFontChanged(font: string) {
    this.currentFont.set(font);
  }

  onFontSizeChanged(size: string) {
    this.currentFontSize.set(size);
  }

  resetForm(event: Event) {
    event.preventDefault();
    this.formDirective()?.resetForm();
    this.resetRequested.emit();
  }

  goBack() {
    this.router.navigateByUrl(this.listUrl());
  }

  onUpdateSubmit(event: MouseEvent) {
    event.preventDefault();
    const payload = this.createForm.submitValue();
    if (!payload) return;
  }

  onSubmit(event: MouseEvent) {
    event.preventDefault();
    const payload = this.createForm.submitValue();
    if (!payload) return;
    this.command.excute(payload);
    this.formDirective()?.resetForm();
    this.resetRequested.emit();
  }


}
