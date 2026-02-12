import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { afterNextRender, AfterViewInit, Component, computed, effect, inject, Injector, model, OnInit, output, signal, viewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { AlertService } from '@app/core/services/alert-service';
import { CONTENTCATEGORY_OPTIONS } from '@app/core/enums/content-category';
import { POSTTYPE_OPTIONS } from '@app/core/enums/post-type';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { UserStore } from '@app/core/services/user-store';
import { getLanguageOptions } from '@app/shared/contants/languages.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { Paths } from '@app/data/menu-data';
import { IScriptureContentCreate } from '@app/core/interfaces/i-scripture-content-create';
import { FontSelector } from "@app/shared/font-selector/font-selector";
import { FontSizeSelector } from "@app/shared/font-size-selector/font-size-selector";
import { MatSelectChange } from '@angular/material/select';
import { CdkTableModule } from "@angular/cdk/table";
import { FormCommandExcutorService } from '@app/core/services/form-command-excutor-service';
import { SCRIPTURE_CONTENT } from '@app/forms/form-configs';
import { TranscriptionService } from '@app/core/services/transcription-service';
import { ScriptureService } from '@app/core/services/scripture-service';
import { GenericFormService } from '@app/core/services/generic-form-service';

@Component({
  selector: 'app-write-transcription',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    FontSelector,
    FontSizeSelector,
    CdkTableModule
  ],
  templateUrl: './write-transcription.html',
  styleUrl: './write-transcription.scss',
})
export class WriteTranscription implements OnInit, AfterViewInit {

  title = computed(() => this.data() ? '수정' : '저장');
  data = model<IScriptureContentCreate | null>(null);
  resetRequestd = output<void>();

  private masterService = inject(ScriptureService);
  private transcriptionService = inject(TranscriptionService);
  private excutor = inject(FormCommandExcutorService);
  private injector = inject(Injector);

  public writeForm = inject(GenericFormService<IScriptureContentCreate>);

  readonly alert = inject(AlertService);
  readonly userStore = inject(UserStore);
  readonly languageOptions = getLanguageOptions();

  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);

  currentFont = signal('font-ibm'); // font-selector
  currentFontSize = signal<string>('16px');  // font-size-selector
  readonly masterList = computed(() => this.masterService.masterList.value() ?? []);
  searchTerm = signal<string>('');

  rows = signal<number>(3);

  rowNumbers = (min: number, max: number) =>
    [...Array(max - min + 1).keys()].map((i => i + min));

  readonly lineSpace = 1.8;

  formDirective = viewChild<FormGroupDirective>('formDirective');
  autosize = viewChild<CdkTextareaAutosize>('autosize');

  contentCategroyOptions = CONTENTCATEGORY_OPTIONS;
  postType = POSTTYPE_OPTIONS;

  scriptureParagraphId = signal<number>(Number(this.route.snapshot.paramMap.get('scriptureMasterId')));

  listUrl = signal<string>(
    this.route.snapshot.queryParamMap.get('returnUrl') || Paths.ListTranscription.url
  );

  constructor(

  ) {

    effect(() => {
      const data = this.data();
      if (data) {
        this.writeForm.form.patchValue({
          title: data.title,
          scriptureMasterId: data.scriptureMasterId,
          contentCategory: data.contentCategory,
          transcription: data.transcription,
          tags: data.tags,
          postType: data.postType,
          language: data.language,
          commentary: data.commentary
        });
      }
    });

    effect(() => {
      this.currentFont();
      this.triggerResize();
    });

    effect(() => {
      this.currentFontSize();
      this.triggerResize();
    })
  }

  ngOnInit() {
    this.writeForm.initialize(SCRIPTURE_CONTENT, this.transcriptionService);
  }

  ngAfterViewInit() {
    this.writeForm.form.patchValue({
      userId: this.userStore.userId()
    });
    this.triggerResize();
  }

  triggerResize() {
    afterNextRender(() => {
      this.autosize()?.resizeToFitContent(true);
    }, { injector: this.injector });
  }

  filteredMasterList = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const list = this.masterList();
    if (!term) return list;
    return list?.filter(x => x.title.toLowerCase().includes(term));
  });

  clearSearch() {
    this.searchTerm.set('');
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onChangeRows(event: MatSelectChange<any>) {
    this.rows.set(event.value);
    this.triggerResize();
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
    this.resetRequestd?.emit();
  }

  goToList() {
    this.router.navigateByUrl(this.listUrl());
  }

  async onSubmit(event: MouseEvent) {
    event.preventDefault();

    const payload = this.writeForm.submitValue();

    if (!payload) return;

    const result = await this.excutor.excute(
      () => this.transcriptionService.contentCreate(payload),
      { success: '저장 성공', error: '저장 실패' }
    );

    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequestd.emit();
    }
  }
}
