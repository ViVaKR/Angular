import { Component, computed, inject, signal } from '@angular/core';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { Paths } from '@app/data/menu-data';
import { ScriptureService } from '@app/core/services/scripture-service';
import { AccordionTable } from "@app/shared/components/accordion-table/accordion-table";
import { IScriptureMaster } from '@app/core/interfaces/i-scripture-master';
import { CreateScriptureMaster } from "./create-scripture-master/create-scripture-master";
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { BodyTitle } from "@app/shared/body-title/body-title";
import { ScrollTo } from "@app/shared/scroll-to/scroll-to";

@Component({
  selector: 'app-scripture-master',
  imports: [
    AccordionTable,
    CreateScriptureMaster,
    CommonModule,
    ...MATERIAL_COMMON,
    BodyTitle,
    ScrollTo
  ],
  templateUrl: './scripture-master.html',
  styleUrl: './scripture-master.scss',
})
export class ScriptureMaster {

  readonly title = Paths.ScriptureMaster.title;

  readonly anchorId = signal<string>('createId');

  readonly detailUrl = `${Paths.Scripture.url}/${Paths.ReadScriptureMaster.url}`;
  readonly service = inject(ScriptureService);
  readonly pageSize = signal(15);
  readonly selectedData = signal<IScriptureMaster | null>(null);

  readonly data = computed(() => this.service.masterList.value() ?? []);

  readonly recommendedList = computed(() =>
    (this.service.masterList.value() ?? [])
      .slice() // 원본 보호
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(x => ({ id: x.id, title: x.title }))
  );

  columns = signal<IColumnDef[]>([
    // * 핵심 정보
    { key: 'id', label: 'ID', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 1 },
    { key: 'title', label: '제목', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 2 },
    {
      key: 'originalTitle', label: '원문제목', width: 'auto',
      fontName: 'font-hanmun', showInTable: true, showInTab: false, tabOrder: 3,
      pipe: 'truncate',
      pipeArgs: { limit: 15, suffix: '...' }
    },

    // * 확장탭
    { key: 'memo', label: '부가정보', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'recommendedOrder', label: '추천순서', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 5 },
    { key: 'prerequistiteScriptreId', label: '선수 경전', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 6 },
    { key: 'difficultyLevel', label: '경전 난이도', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 7 },
    { key: 'author', label: '저자', showInTable: false, showInTab: true, tabOrder: 8 },
    { key: 'structureType', label: '경전 구성', showInTable: false, showInTab: true, tabOrder: 9 },
    { key: 'structureDescription', label: '경전구성 상세', showInTable: false, showInTab: true, tabOrder: 10 },
    { key: 'coverImageUrl', label: '대표 이미지', showInTable: false, showInTab: true, tabOrder: 11 },
    { key: 'audioUrl', label: '낭독 URL', showInTable: false, showInTab: true, tabOrder: 12 },
    { key: 'collection', label: '경전 분류', showInTable: false, showInTab: true, tabOrder: 13 },
    { key: 'estimatedMinutes', label: '사경 예상시간', showInTable: false, showInTab: true, tabOrder: 14 },
    { key: 'originalLanguage', label: '원전 언어', showInTable: false, showInTab: true, tabOrder: 15 },
    { key: 'scriptType', label: '문자 체계', showInTable: false, showInTab: true, tabOrder: 16 },
    { key: 'tradition', label: '전통', showInTable: false, showInTab: true, tabOrder: 17 },
    { key: 'translator', label: '번역자', showInTable: false, showInTab: true, tabOrder: 18 },
    { key: 'translationPeriod', label: '번역 시대', showInTable: false, showInTab: true, tabOrder: 19 },
    { key: 'totalVolumes', label: '권', showInTable: false, showInTab: true, tabOrder: 20 },
    { key: 'totalChapters', label: '품', showInTable: false, showInTab: true, tabOrder: 21 },
    { key: 'totalSections', label: '경/절', showInTable: false, showInTab: true, tabOrder: 22 },
    { key: 'totalVerses', label: '게송/문단', showInTable: false, showInTab: true, tabOrder: 23 },
    { key: 'period', label: '경전 성립시대', showInTable: false, showInTab: true, tabOrder: 24 },
  ]);


  onReceiveData(data: IScriptureMaster) {
    this.selectedData.set(data);
  }

  onResetRequested() {
    this.selectedData.set(null);
  }
}
