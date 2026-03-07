import { CommonModule } from '@angular/common';
import { Component, computed, inject, isDevMode, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentCategory, CONTENTCATEGORY_OPTIONS } from '@app/core/enums/content-category';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { IScriptureContent } from '@app/core/interfaces/i-scripture-content';
import { ScriptureService } from '@app/core/services/scripture-service';
import { UserStore } from '@app/core/services/user-store';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { LoadingState } from "@app/shared/loading-state/loading-state";
import { ErrorState } from "@app/shared/error-state/error-state";
import { AccordionTable } from "@app/shared/components/accordion-table/accordion-table";

@Component({
  selector: 'app-scripture-content',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    LoadingState,
    ErrorState,
    AccordionTable
  ],
  templateUrl: './scripture-content.html',
  styleUrl: './scripture-content.scss',
})
export class ScriptureContent {

  readonly service = inject(ScriptureService);
  readonly route = inject(ActivatedRoute);
  readonly userStroe = inject(UserStore);

  readonly ContentCategoryOptions = CONTENTCATEGORY_OPTIONS;

  // 페이지네이션 결과
  readonly pagedData = computed(() => this.service.scriptureContentList.value());
  readonly data = computed(() => this.pagedData()?.data ?? []);
  // readonly totalCount = computed(() => this.service.getContentFilter());

  pageSize = signal(15);
  selectedData = signal<IScriptureContent | null>(null);

  readonly rows = 10;

  public isDevelopment = isDevMode();

  columns = signal<IColumnDef[]>([
    // * 핵심정보
    { key: 'id', label: 'ID', width: '10%', fontName: 'font-robot-con', showInTable: true, showInTab: false, tabOrder: 1 },
    { key: 'scriptureMasterId', label: '경전', width: 'auto', fontName: 'font-noto', showInTable: false, showInTab: true, tabOrder: 2 }, // 경전 마스터
    { key: 'subCategoryType', label: '카테고리', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: true, tabOrder: 3 }, // 사경, 번역, 요약, 주석, 자유글쓰기
    { key: 'userId', label: '글쓴이', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: true, tabOrder: 4 },
    { key: 'title', label: '제목', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 5 }, // 제목
    { key: 'subTitle', label: '부 제목', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 6 }, // 부 제목
    { key: 'likeCount', label: '좋아용' },
    { key: 'viewCount', label: '조회수' },
    { key: 'postType', label: '게시물 유형' }, // 초안, 검토, 게시, 숨김
    { key: 'createdAt', label: '작성일자' },
    { key: 'updatedAt', label: '수정일자' },

    // * 확장탭
    { key: 'body', label: '본문', width: 'auto', fontName: 'font-noto', showInTable: false, showInTab: true, tabOrder: 0 },
    { key: 'tags', label: '태그', width: 'auto', fontName: 'font-noto', showInTable: false, showInTab: true, tabOrder: 1 },


  ]);

  ngOnInit() {
    // 초기 필터 설정 (내 사경만 보기 등)
    this.loadMyContent();
  }

  loadMyContent() {
    // 로그인한 사용자의 사경
    const currentUserId = this.userStroe.userId();
    if (currentUserId === null) return;
    this.service.updateContentFilter({
      userId: currentUserId,
      pageNumber: 1
    });
  }

  loadContentByScripture(scriptureMasterId: number) {
    this.service.updateContentFilter({
      scriptureMasterId,
      pageNumber: 1
    });
  }

  filterByCategory(category: ContentCategory) {
    this.service.updateContentFilter({
      contentCategory: category,
      pageNumber: 1
    });
  }

  search(keyword: string) {
    this.service.updateContentFilter({
      searchKeyword: keyword,
      pageNumber: 1
    });
  }

  changePage(pageNumber: number) {
    this.service.updateContentFilter({ pageNumber });
  }

  onReceiveData(data: IScriptureContent) {
    this.selectedData.set(data);
  }

  reloadData() {
    this.service.scriptureContentList.reload();
  }
}
