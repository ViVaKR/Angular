import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { afterNextRender, AfterViewInit, Component, computed, effect, inject, Injector, model, output, signal, viewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { CreateScriptureMasterCommand } from './create-scripture-master-command';
import { CreateScriptureMasterForm } from './create-scripture-master-form';
import { IScriptureMaster } from '@app/core/interfaces/i-scripture-master';
import { ORIGINAL_LANG_OPTIONS } from '@app/core/enums/original-language';
import { TRADITION_OPTIONS } from '@app/core/enums/tradition';
import { FileUploader } from "@app/shared/file-uploader/file-uploader";
import { AlertService } from '@app/core/services/alert-service';
import { FontSelector } from "@app/shared/font-selector/font-selector";
import { FontSizeSelector } from "@app/shared/font-size-selector/font-size-selector";
import { BodyTitle } from "@app/shared/body-title/body-title";

@Component({
  selector: 'create-scripture-master',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    FileUploader,
    FontSelector,
    FontSizeSelector,
    BodyTitle
  ],
  templateUrl: './create-scripture-master.html',
  styleUrl: './create-scripture-master.scss',
})
export class CreateScriptureMaster implements AfterViewInit {

  title = computed(() => this.data() ? '수정' : '저장');
  data = model<IScriptureMaster | null>(null);
  resetRequested = output<void>();

  alert = inject(AlertService);

  currentFont = signal('font-ibm'); // font-selector
  currentFontSize = signal<string>('16px'); // font-size-selector

  lineSpace = 1.8;

  formDirective = viewChild<FormGroupDirective>('formDirective');
  autosize = viewChild<CdkTextareaAutosize>('autosize');

  imageUploader = viewChild<FileUploader>('imageUploader');
  audioUploader = viewChild<FileUploader>('audioUploader');

  traditionOptions = TRADITION_OPTIONS;
  originalLang = ORIGINAL_LANG_OPTIONS;

  constructor(
    public createForm: CreateScriptureMasterForm,
    private command: CreateScriptureMasterCommand,
    private injector: Injector
  ) {

    effect(() => {
      const data = this.data();
      if (data) {
        this.createForm.form.patchValue({
          title: data.title,
          originalTitle: data.originalTitle,
          originalLanguage: data.originalLanguage,
          tradition: data.tradition,
          period: data.period,
          author: data.author,
          translator: data.translator,
          translationPeriod: data.translationPeriod,
          structure: data.structure,
          collection: data.collection,
          coverImageUrl: data.coverImageUrl,
          audioUrl: data.audioUrl,
          recommendedOrder: data.recommendedOrder,
          totalVerses: data.totalVerses,
          estimatedMinutes: data.estimatedMinutes,
          memo: data.memo
        });
        this.triggerResize();
      }
    });

    //  font 변경 감지
    effect(() => {
      this.currentFont(); // 의존성 추적
      this.triggerResize();
    });

    effect(() => {
      this.currentFontSize(); // 의존성 추적
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

  // * font-selector - 단순히 siganl 만 업데이트
  onFontChanged(font: string) {
    this.currentFont.set(font);
  }

  // * font-size-selector - 단순히 signal 만 업데이트
  onFontSizeChanged(size: string) {
    this.currentFontSize.set(size);
  }

  resetForm(event: Event) {
    event.preventDefault();
    this.formDirective()?.resetForm();
    this.resetRequested.emit();
  }

  onImageUploaded(fileUrl: string): void {
    this.createForm.form.patchValue({
      coverImageUrl: fileUrl
    });
    this.alert.openSheet([{
      title: '커버 이미지 업로드 완료',
      content: fileUrl
    }]);
  }

  /**
   * 오디오 파일 업로드 완료 핸들러
   * @param fileUrl void
   */
  onAudioUploaded(fileUrl: string): void {
    this.createForm.form.patchValue({
      audioUrl: fileUrl
    });

    this.alert.openSheet([{
      title: '오디오 파일 업로드 완료',
      content: fileUrl
    }]);

  }

  /**
   * 이미지 업로드 트리거
   */
  triggerImageUpload(): void {
    this.imageUploader()?.openFilePicker();
  }

  /**
   * 오디오 업로드 트리거
   */
  triggerAudioUpload(): void {
    this.audioUploader()?.openFilePicker();
  }

  /**
   * 폼 제출
   * @param event MouseEvent
   * @returns void
   */
  onSubmit(event: MouseEvent) {
    event.preventDefault();
    const payload = this.createForm.submitValue();
    if (!payload) return;
    const data = this.data();
    const id = data?.id;
    if (id) {
      this.command.excute(payload, id); // * 수정
    } else {
      this.command.excute(payload); // * 추가
    }
    this.formDirective()?.resetForm();
    this.resetRequested.emit();
  }
}
