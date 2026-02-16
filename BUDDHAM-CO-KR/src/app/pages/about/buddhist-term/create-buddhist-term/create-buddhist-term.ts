import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { afterNextRender, Component, computed, effect, inject, Injector, input, model, output, signal, viewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { IBuddhistTerm } from '@app/core/interfaces/i-buddhist-term';
import { FormCommandExcutorService } from '@app/core/services/form-command-excutor-service';
import { AboutService } from '@app/core/services/about-service';
import { FontSelector } from "@app/shared/font-selector/font-selector";
import { FontSizeSelector } from "@app/shared/font-size-selector/font-size-selector";
import { MatSelectChange } from '@angular/material/select';
import { BUDDHIST_TERM } from '@app/forms/form-configs';
import { GenericFormService } from '@app/core/services/generic-form-service';

@Component({
  selector: 'app-create-buddhist-term',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    FontSelector,
    FontSizeSelector
  ],
  templateUrl: './create-buddhist-term.html',
  styleUrl: './create-buddhist-term.scss',
})
export class CreateBuddhistTerm {

  mainTitle = Paths.CreateBuddhistTerm.title;
  btnLabel = computed(() => this.data() ? '수정' : '저장');

  private aboutService = inject(AboutService);
  private excutor = inject(FormCommandExcutorService);
  private injector = inject(Injector);
  anchorId = input<string>('anchorId');
  public createForm = inject(GenericFormService<IBuddhistTerm>);

  data = model<IBuddhistTerm | null>(null);
  private route = inject(ActivatedRoute);
  rows = signal<number>(3);
  rowNumbers = (min: number, max: number) =>
    [...Array(max - min + 1).keys()].map((i => i + min));
  resetRequested = output<void>();

  formDirective = viewChild<FormGroupDirective>('formDirective');
  autosize = viewChild<CdkTextareaAutosize>('autosize');

  listUrl = signal<string>(
    this.route.snapshot.queryParamMap.get('returnUrl') ||
    Paths.BuddhistTerm.url
  );

  currentFont = signal('font-noto');
  currentFontSize = signal<string>('16px');
  lineSpace = 1.8;

  constructor() {
    effect(() => {
      const data = this.data();
      if (data) {
        this.createForm.form.patchValue({
          term: data.term,
          explanation: data.explanation,
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

  ngOnInit() {
    this.createForm.initialize(BUDDHIST_TERM, this.aboutService);
  }

  ngAfterViewInit() {
    this.triggerResize();
  }

  triggerResize() {
    afterNextRender(() => {
      this.autosize()?.resizeToFitContent(true);
    }, { injector: this.injector });
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
    this.resetRequested.emit();
  }

  async deleteData(event: MouseEvent, id?: number,) {

    if (!id) return;
    event.preventDefault();

    const result = await this.excutor.excute(
      () => this.aboutService.termDelete(id), {
      success: '삭제 완료',
      error: '삭제에 실패하였습니다.'
    });

    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    } else {
      console.error('삭제오류:', result.error);
    }
  }

  async onSubmit(event: MouseEvent) {
    event.preventDefault();
    const payload = this.createForm.submitValue();
    if (!payload) return;

    const data = this.data()
    const id = data?.id;

    let result;
    if (id) {
      // * 수정
      result = await this.excutor.excute(
        () => this.aboutService.termCreateOrUpdate(payload, id),
        {
          success: '수정 완료',
          error: '수정 실패'
        }
      );
    } else {
      // * 추가
      result = await this.excutor.excute(
        () => this.aboutService.termCreateOrUpdate(payload),
        {
          success: '저장 완료',
          error: '저장 실패'
        }
      );
    }
    if (result.success) {
      this.formDirective()?.resetForm();
      this.resetRequested.emit();
    }
  }
}
