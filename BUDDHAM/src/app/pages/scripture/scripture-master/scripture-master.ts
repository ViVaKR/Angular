import { Component, computed, inject, isDevMode, signal } from '@angular/core';
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
import { LoadingState } from "@app/shared/loading-state/loading-state";
import { ErrorState } from "@app/shared/error-state/error-state";
import { ISearchConfig } from '@app/core/interfaces/i-search-config';
import { UserStore } from '@app/core/services/user-store';

@Component({
  selector: 'scripture-master',
  imports: [
    AccordionTable,
    CreateScriptureMaster,
    CommonModule,
    ...MATERIAL_COMMON,
    BodyTitle,
    ScrollTo,
    LoadingState,
    ErrorState
  ],
  templateUrl: './scripture-master.html',
  styleUrl: './scripture-master.scss',
})
export class ScriptureMaster {

  readonly title = Paths.ScriptureMaster.title;
  readonly detailUrl = `${Paths.Scripture.url}/${Paths.ReadScriptureMaster.url}`;

  readonly service = inject(ScriptureService);
  readonly userStore = inject(UserStore);
  readonly anchorId = signal<string>('createId');
  readonly pageSize = signal(10);
  readonly selectedData = signal<IScriptureMaster | null>(null);

  readonly data = computed(() => this.service.masterList.value() ?? []);

  // 로컬 검색 전략 추가
  readonly searchConfig: ISearchConfig = {
    strategy: 'local',
    localThreshold: 1,
    serverThreshold: 9999, // 서버 호출없음
  }

  public isDevelopment = isDevMode();

  //  1.  본인글인지 여부
  readonly isOwner = computed(() => {
    const item = this.selectedData();
    const userId = this.userStore.userId();
    return item?.userId === userId;
  });

  // 2. 관리자 여부
  readonly isAdmin = computed(() => this.userStore.isAdmin());

  // 3. 수정가능 여부
  readonly canManage = computed(() => this.isOwner() || this.isAdmin());

  columns = signal<IColumnDef[]>([
    // * 핵심 정보
    {
      key: 'title', label: '경전제목', width: 'auto', fontName: 'font-noto',
      showInTable: true, showInTab: false, tabOrder: 1
    },
    {
      key: 'originalTitle', label: '원문제목', width: 'auto',
      fontName: 'font-hanmun', showInTable: true, showInTab: false, tabOrder: 2,
      pipe: 'truncate',
      pipeArgs: { limit: 15, suffix: '...' }
    },
    {
      key: 'chineseTitle', label: '한문제목', width: 'auto',
      fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 3,
      pipe: 'truncate',
      pipeArgs: { limit: 10, suffix: '...' }
    },
    {
      key: 'mainCategoryType', label: '카테고리',
      width: 'auto', fontName: 'font-noto',
      showInTable: true, showInTab: false,
      pipe: 'enum', pipeArgs: 'label', tabOrder: 4,
      enumType: 'MainCategoryType'
    },

    // * 확장탭
    { key: 'memo', label: '부가정보', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 14 },
    { key: 'recommendedOrder', label: '추천순서', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 15 },

    { key: 'prerequistiteScriptreId', label: '선수 경전', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 16 },
    { key: 'difficultyLevel', label: '경전 난이도', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 17 },
    { key: 'author', label: '저자', showInTable: false, showInTab: true, tabOrder: 18 },
    { key: 'structureType', label: '경전 구성', showInTable: false, showInTab: true, tabOrder: 19 },
    { key: 'structureDescription', label: '경전구성 상세', showInTable: false, showInTab: true, tabOrder: 20 },
    { key: 'coverImageUrl', label: '대표 이미지', showInTable: false, showInTab: true, tabOrder: 21 },
    { key: 'audioUrl', label: '낭독 URL', showInTable: false, showInTab: true, tabOrder: 22 },
    { key: 'collection', label: '경전 분류', showInTable: false, showInTab: true, tabOrder: 23 },
    { key: 'estimatedMinutes', label: '사경 예상시간', showInTable: false, showInTab: true, tabOrder: 24 },
    { key: 'originalLanguage', label: '원전 언어', showInTable: false, showInTab: true, tabOrder: 25 },
    { key: 'scriptType', label: '문자 체계', showInTable: false, showInTab: true, tabOrder: 26 },
    { key: 'tradition', label: '전통', showInTable: false, showInTab: true, tabOrder: 27 },
    { key: 'translator', label: '번역자', showInTable: false, showInTab: true, tabOrder: 28 },
    { key: 'translationPeriod', label: '번역 시대', showInTable: false, showInTab: true, tabOrder: 29 },
    { key: 'totalVolumes', label: '권', showInTable: false, showInTab: true, tabOrder: 30 },
    { key: 'totalChapters', label: '품', showInTable: false, showInTab: true, tabOrder: 31 },
    { key: 'totalSections', label: '경/절', showInTable: false, showInTab: true, tabOrder: 32 },
    { key: 'totalVerses', label: '게송/문단', showInTable: false, showInTab: true, tabOrder: 33 },
    { key: 'period', label: '경전 성립시대', showInTable: false, showInTab: true, tabOrder: 34 },

    { key: 'id', label: 'ID', fontName: 'font-noto', showInTable: false, showInTab: true, tabOrder: 36 },
    { key: 'userId', label: 'USER ID', fontName: 'font-noto', showInTable: false, showInTab: true, tabOrder: 37 },
  ]);

  onReceiveData(data: IScriptureMaster) {
    this.selectedData.set(data);
  }

  reloadData() {
    this.service.masterList.reload();
  }

  onResetRequested() {
    this.selectedData.set(null);
  }
}
