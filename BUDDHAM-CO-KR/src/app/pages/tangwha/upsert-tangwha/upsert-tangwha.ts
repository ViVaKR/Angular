import { Component, computed, effect, inject, Injector, input, model, OnInit, output, signal, viewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { TANAGWHATIER_OPTIONS } from '@app/core/enums/tangwha-tier';
import { ITangwhaSchema, ITangwhaUpsert } from '@app/core/interfaces/tangwha/i-tangwha';
import { AlertService } from '@app/core/services/alert-service';
import { FormCommandExcutorService } from '@app/core/services/form-command-excutor-service';
import { GenericFormService } from '@app/core/services/generic-form-service';
import { TangwhaService } from '@app/core/services/tangwha/tangwha-service';
import { TANGWHA_CONFIG } from '@app/forms/form-configs';
import { FileUploader } from '@app/shared/file-uploader/file-uploader';

@Component({
  selector: 'app-upsert-tangwha',
  imports: [],
  templateUrl: './upsert-tangwha.html',
  styleUrl: './upsert-tangwha.scss',
})
export class UpsertTangwha implements OnInit {

  title = "탱화 관리";

  data = model<ITangwhaSchema | null>(null);
  anchorId = input<string>('anchorId');
  resetRequested = output<void>();

  readonly icon = 'post_add';
  readonly lineSpace = 1.8;
  searchText = signal<string>('');

  readonly service = inject(TangwhaService);
  readonly excutor = inject(FormCommandExcutorService);
  readonly injector = inject(Injector);
  readonly alert = inject(AlertService);
  createForm = inject(GenericFormService<ITangwhaUpsert>);

  btnLabel = computed(() => this.data() ? '수정' : '저장');

  formDirective = viewChild<FormGroupDirective>('formDirective');
  imageUploader = viewChild<FileUploader>('imageUploader');

  tierOptions = TANAGWHATIER_OPTIONS;

  constructor() {
    effect(() => {
      const data = this.data();

      if (data) {
        this.createForm.form.patchValue({
          title: data.title,
          chineseTitle: data.chineseTitle,
          category: data.category,
          tier: data.tier,
          era: data.era,
          temple: data.temple,
          description: data.description,
          thumbnailUrl: data.thumbnailUrl,
          imageUrl: data.imageUrl
        });
      }
    });
  }

  ngOnInit(): void {
    this.createForm.initialize(TANGWHA_CONFIG, this.service);
  }

  clearSearch() {
    this.searchText.set('');
  }

  resetForm(event: Event) {
    event.preventDefault();
    this.formDirective()?.resetForm();
    this.resetRequested.emit();
  }

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
        ? this.service.upSert(payload, id)
        : this.service.upSert(payload),
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
