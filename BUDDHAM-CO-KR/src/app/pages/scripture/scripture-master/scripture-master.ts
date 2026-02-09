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

@Component({
  selector: 'app-scripture-master',
  imports: [
    AccordionTable,
    CreateScriptureMaster,
    CommonModule,
    ...MATERIAL_COMMON,
    BodyTitle
  ],
  templateUrl: './scripture-master.html',
  styleUrl: './scripture-master.scss',
})
export class ScriptureMaster {

  readonly title = Paths.ScriptureMaster.title;
  readonly detailUrl = `${Paths.Scripture.url}/${Paths.ReadScriptureMaster.url}`;
  readonly service = inject(ScriptureService);
  readonly pageSize = signal(15);
  readonly selectedData = signal<IScriptureMaster | null>(null);
  readonly data = computed(() => this.service.masterList.value() ?? []);

  columns = signal<IColumnDef[]>([
    // * 핵심 정보
    { key: 'title', label: '제목', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 1 },
    {
      key: 'originalTitle', label: '원문제목', width: 'auto',
      fontName: 'font-hanmun', showInTable: true, showInTab: false, tabOrder: 2,
      pipe: 'truncate', pipeArgs: { limit: 15, suffix: '...' }
    },
    { key: 'translator', label: '번역자', width: '200px', showInTable: true, showInTab: false, tabOrder: 3 },

    // * 확장탭
    { key: 'memo', label: '부가정보', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 0 },
    { key: 'author', label: '저자', showInTable: false, showInTab: true, tabOrder: 4 },
    { key: 'id', label: 'ID', showInTable: false, showInTab: true, tabOrder: 5 },
    { key: 'translatorPeriod', label: '번역한 시기', showInTable: false, showInTab: true, tabOrder: 6 },
    { key: 'structure', label: '책 구성', showInTable: false, showInTab: true, tabOrder: 7 },
    { key: 'coverImageUrl', label: '대표 이미지', showInTable: false, showInTab: true, tabOrder: 8 },
    { key: 'audioUrl', label: '낭독 URL', showInTable: false, showInTab: true, tabOrder: 9 },
    { key: 'collection', label: '경전분류', showInTable: false, showInTab: true, tabOrder: 10 },
    { key: 'totalVerses', label: '총 게송/절 수', showInTable: false, showInTab: true, tabOrder: 11 },
    { key: 'estimatedMinutes', label: '사경 예상시간', showInTable: false, showInTab: true, tabOrder: 12 },

  ]);

  onReceiveData(data: IScriptureMaster) {
    this.selectedData.set(data);
  }

  onResetRequested() {
    this.selectedData.set(null);
  }
}


// ScriptureMaster :  경전명, 저자/역자, 시대/국가, 대장경 분류, 전체 권수
// ScriptureVolum : 권 (상권/중권/하권, 1권 ~ 100권), 경전이 여러 권으로 구분된 경우, 없으면 1권으로 자동 처리
// ScriptureChapter : 품/편, 법구경 --> 무상품/도품/열반품 대부분의 경전이 품 단위를 갖고 있음
// ScriptureSection : 장 / 절 --> 어떤 경전은 품 아래에 장이 있으마 대부분의 경전은 장이 없으므로 선택적
// ScripturParagraph : 문잔/절/게송 단위, 가장 중요한 엔티니, 실제 불경 텍스트가 들어가는 곳
