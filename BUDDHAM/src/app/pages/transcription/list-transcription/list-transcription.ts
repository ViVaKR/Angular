import { Component, computed, inject, isDevMode, signal } from '@angular/core';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { Paths } from '@app/data/menu-data';
import { BodyTitle } from "@app/shared/body-title/body-title";
import { AccordionTable } from "@app/shared/components/accordion-table/accordion-table";
import { TranscriptionService } from '@app/core/services/transcription-service';
import { MatAnchor } from "@angular/material/button";
import { Router } from '@angular/router';
import { IScriptureContentRead } from '@app/core/interfaces/i-scripture-content-read';
import { LoaderService } from '@app/core/services/loader-service';
import { LoadingState } from "@app/shared/loading-state/loading-state";
import { ErrorState } from "@app/shared/error-state/error-state";
import { ISearchConfig } from '@app/core/interfaces/i-search-config';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';

@Component({
  selector: 'app-list-transcription',
  imports: [
    BodyTitle,
    AccordionTable,
    MatAnchor,
    LoadingState,
    ErrorState,
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './list-transcription.html',
  styleUrl: './list-transcription.scss',
})
export class ListTranscription {

  readonly title = Paths.ListTranscription.title;
  readonly anchorId = signal<string>('createId');
  readonly detailUrl = `${Paths.Transcription.url}/${Paths.ReadTranscription.url}`;
  readonly service = inject(TranscriptionService);
  readonly loaderService = inject(LoaderService);
  private router = inject(Router);

  readonly pageSize = signal(10);
  readonly selectedData = signal<IScriptureContentRead | null>(null);

  readonly data = computed(() => this.service.contentList.value() ?? []);
  // 로컬 검색 전략 추가
  readonly searchConfig: ISearchConfig = {
    strategy: 'local',
    localThreshold: 1,
    serverThreshold: 9999, // 서버 호출없음
  }

  readonly isDevelopment = isDevMode();

  columns = signal<IColumnDef[]>([

    // 목록
    { key: 'title', label: '제목', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 1 },
    {
      key: 'contentCategory', label: '분류', width: 'auto', fontName: 'font-noto',
      pipe: 'enum',
      showInTable: true, showInTab: false, tabOrder: 2
    },
    {
      key: 'likeCount', label: '좋아요', width: 'auto',
      fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 3
    },
    { key: 'viewCount', label: '조회', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 4 },
    {
      key: 'createdAt', label: '작성일자', width: 'auto', fontName: 'font-noto',
      showInTable: true, showInTab: false, tabOrder: 5,
      pipe: 'date', pipeArgs: 'yyyy-MM-dd'
    },
    { key: 'authorPseudonym', label: '작성자', width: 'auto', fontName: 'font-ibm', showInTable: true, showInTab: false, tabOrder: 6 },

    // 상세
    { key: 'transcription', label: '본문', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 7 },
    {
      key: 'commentary', label: '메모', fontName: 'font-ibm',
      showInTable: false, showInTab: true, tabOrder: 8
    },
    {
      key: 'updatedAt', label: '수정일자', fontName: 'font-ibm',
      showInTable: false, showInTab: true, tabOrder: 9,
      pipe: 'date', pipeArgs: 'yyyy-MM-dd'
    },
    { key: 'tags', label: '태그', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 11 },
    { key: 'postType', label: '출판상태', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 12 },
    {
      key: 'scriptureMasterTitle', label: '연관 경전',
      fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 13
    },
    { key: 'language', label: '언어', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 14 },
    { key: 'id', label: '글번호', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 15 },
    { key: 'userId', label: '작성자', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 16 },
    { key: 'isVerified', label: '관리자 확인', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 17 },
  ]);

  onReceiveData(data: IScriptureContentRead) {
    this.selectedData.set(data);
  }

  onResetRequested() {
    this.selectedData.set(null);
  }

  reloadData() {
    this.service.contentList.reload();
  }

  goTo() {
    this.router.navigate(['Transcription/WriteTranscription'], {
      queryParams: { returnUrl: this.router.url }
    });
  }
}
