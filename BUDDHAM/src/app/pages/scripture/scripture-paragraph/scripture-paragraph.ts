import { Component, computed, inject, isDevMode, signal } from '@angular/core';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { ScriptureService } from '@app/core/services/scripture-service';
import { Paths } from '@app/data/menu-data';
import { AccordionTable } from "@app/shared/components/accordion-table/accordion-table";
import { CreateScriptureParagraph } from "./create-scripture-paragraph/create-scripture-paragraph";
import { BodyTitle } from "@app/shared/body-title/body-title";
import { ScrollTo } from "@app/shared/scroll-to/scroll-to";
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { IScriptureParagraphListDTO } from '@app/core/interfaces/i-scripture-paragraph-list-dto';
import { LoadingState } from "@app/shared/loading-state/loading-state";
import { ErrorState } from "@app/shared/error-state/error-state";
import { ISearchConfig } from '@app/core/interfaces/i-search-config';

@Component({
  selector: 'app-scripture-paragraph',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    AccordionTable, CreateScriptureParagraph, BodyTitle, ScrollTo,
    LoadingState,
    ErrorState
  ],
  templateUrl: './scripture-paragraph.html',
  styleUrl: './scripture-paragraph.scss',
})
export class ScriptureParagraph {

  readonly title = Paths.ScriptureParagraph.title;
  readonly anchorId = signal<string>('createId');
  readonly detailUrl = `${Paths.Scripture.url}/${Paths.ReadScriptureParagraph.url}`;
  readonly service = inject(ScriptureService);
  readonly pageSize = signal(10);
  readonly selectedData = signal<IScriptureParagraphListDTO | null>(null);
  readonly data = computed(() => this.service.paragraphList.value() ?? []);

  // 로컬 검색 전략 추가
  readonly searchConfig: ISearchConfig = {
    strategy: 'local',
    localThreshold: 1,
    serverThreshold: 9999, // 서버 호출없음
  }

  public isDevelopment = isDevMode();

  columns = signal<IColumnDef[]>([
    {
      key: 'id', label: 'ID', width: '100px',
      placeHoder: '글 번호',
      fontName: 'font-poppins',
      showInTable: true, showInTab: false, tabOrder: 1
    },
    {
      key: 'masterTitle', label: '경전제목', width: 'auto',
      placeHoder: '경전제목',
      fontName: 'font-noto',
      showInTable: true, showInTab: false, tabOrder: 2
    },
    {
      key: 'title', label: '구문제목', width: 'auto',
      placeHoder: '구문제목',
      fontName: 'font-noto',
      showInTable: true, showInTab: false, tabOrder: 3
    },
    {
      key: 'masterOriginalTitle', label: '원전제목', width: 'auto',
      placeHoder: '원전 제목',
      fontName: 'font-noto',
      showInTable: true, showInTab: false, tabOrder: 4
    },
    {
      key: 'masterChineseTitle', label: '한문제목', width: 'auto',
      placeHoder: '한문 제목',
      fontName: 'font-noto',
      showInTable: true, showInTab: false, tabOrder: 5
    },

    // * 내용 * //
    {
      key: 'content', label: '경전내용', width: 'auto', fontName: 'font-poppins',
      showInTable: false, showInTab: true, tabOrder: 10
    },
    {
      key: 'originalContent', label: '경전원문', width: 'auto', fontName: 'font-poppins',
      showInTable: false, showInTab: true, tabOrder: 11
    },

    {
      key: 'masterStructureType', label: 'STRUCTRURE', width: '110px',
      placeHoder: '경전 구조',
      fontName: 'font-noto',
      showInTable: false, showInTab: true, tabOrder: 13,
      pipe: 'enum', pipeArgs: 'label',
      enumType: 'ScriptureStructureType'
    },

    {
      key: 'volumeTitle', label: '권/장/회', width: 'auto', fontName: 'font-noto',
      showInTable: false, showInTab: true, tabOrder: 14
    },

    {
      key: 'chapterTitle', label: '품/경', width: 'auto', fontName: 'font-noto',
      showInTable: false, showInTab: true, tabOrder: 15
    },

    {
      key: 'sectionTitle', label: '장', width: 'auto', fontName: 'font-noto',
      showInTable: false, showInTab: true, tabOrder: 16
    },

    {
      key: 'verseTitle', label: '절/게송', width: 'auto', fontName: 'font-noto',
      showInTable: false, showInTab: true, tabOrder: 17
    },
    {
      key: 'volume', label: 'VOLUME', width: '110px',
      placeHoder: '권 卷, 니까야 Nikāya, 아함, 깐주르',
      fontName: 'font-noto',
      showInTable: false, showInTab: true, tabOrder: 20
    },
    {
      key: 'chapter', label: 'CHAPTER', width: '110px',
      placeHoder: '품 品 Vagga, 분 分, 칙 則',
      fontName: 'font-noto',
      showInTable: false, showInTab: true, tabOrder: 21
    },
    {
      key: 'section', label: 'SECTION', width: '110px',
      placeHoder: '경 Sutta, 단락, 절, 품',
      fontName: 'font-noto',
      showInTable: false, showInTab: true, tabOrder: 22
    },
    {
      key: 'verse', label: 'VERSE', width: '110px',
      placeHoder: '게송, 절 Gāthā',
      fontName: 'font-noto',
      showInTable: false, showInTab: true, tabOrder: 23
    }
  ]);

  onReceiveData(data: IScriptureParagraphListDTO) {
    this.selectedData.set(data);
  }

  reloadData() {
    this.service.paragraphList.reload();
  }

  onResetRequested() {
    this.selectedData.set(null);
  }
}
