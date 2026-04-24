import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { IBuddhistDocument } from '@app/core/interfaces/i-buddhist-document';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { DocumentService } from '@app/core/services/document-service';
import { Paths } from '@app/data/menu-data';
import { BodyTitle } from "@app/shared/body-title/body-title";
import { AccordionTable } from "@app/shared/components/accordion-table/accordion-table";
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { LoadingState } from "@app/shared/loading-state/loading-state";
import { ErrorState } from "@app/shared/error-state/error-state";
import { DOCUMENT_TYPE_LABELS, DocumentType } from '@app/core/enums/document-type';
import { ActivatedRoute, Router } from '@angular/router';
import { IDocumentFilterParams } from '@app/core/interfaces/i-document-filter-params';

@Component({
  selector: 'list-document',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    BodyTitle,
    AccordionTable,
    LoadingState,
    ErrorState
  ],
  templateUrl: './list-document.html',
  styleUrl: './list-document.scss',
})
export class ListDocument {


  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly service = inject(DocumentService);
  readonly selectedData = signal<IBuddhistDocument | null>(null);

  // route.data 에서 documentType 가져오기
  readonly documentType = signal<DocumentType | null>(null);

  // 동적 제목
  readonly title = computed(() => {
    const type = this.documentType();
    if (type === null) return '전체 문서';

    return DOCUMENT_TYPE_LABELS[type] || '문서 목록';
  });

  readonly detailUrl = `${Paths.Document.url}/${Paths.ReadDocument.url}`;

  // 페이지네이션 결과
  readonly pagedData = computed(() => this.service.documentList.value());
  readonly data = computed(() => this.pagedData()?.data ?? []);
  readonly totalCount = computed(() => this.pagedData()?.totalCount ?? 0);
  readonly totalPages = computed(() => this.pagedData()?.totalPages ?? 0);
  readonly hasNextPage = computed(() => this.pagedData()?.hasNextPage ?? false);
  readonly hasPreviousPage = computed(() => this.pagedData()?.hasPreviousPage ?? false);
  // 현재 필터 (서비스에서 가져옴)
  readonly currentFilter = computed(() => this.service.getCurrentFilter());

  readonly columns = signal<IColumnDef[]>([
    { key: 'id', label: 'ID', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 1 },
    { key: 'title', label: '제목', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 1 },
    { key: 'documentType', label: '문서분류', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 1 },
    { key: 'authorName', label: '저자', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 1 },
    { key: 'dharmaDate', label: '법문일시', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 1 },
    { key: 'venue', label: '장소', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 1 },

    // * 확장탭
    { key: 'content', label: '내용', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'summary', label: '요약', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'subTitle', label: '부제목', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'authorId', label: '저자 아이디', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'authorTitle', label: '소속/직책', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'eventName', label: '법회/행사 이름', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'scriptureMasterId', label: '참조경전', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'scriptureParagraphId', label: '참조경전본문', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'scriptureReference', label: '참조구절', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'targetLevel', label: '대상수준', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'tradition', label: '전통', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'audioUrl', label: '오디오', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'videoUrl', label: '비디오', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'thumnailUrl', label: '썸네일', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'durationMinutes', label: '소요시간', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'documentPostType', label: '공개타입', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'isFeatured', label: '추천여부', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'isVerified', label: '검수여부', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'bookmarkCount', label: '북마크/저장 수', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'createAt', label: '생성일', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'updateAt', label: '수정일', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
    { key: 'publishedAt', label: '출판일', showInTable: false, showInTab: true, fontName: 'font-ibm', tabOrder: 4 },
  ]);

  ngOnInit() {
    // route.data에서 documentType 읽기
    this.route.data.subscribe(data => {
      const type = data['documentType'];
      this.documentType.set(type ?? null);

      // 필터 업데이트 (자동으로 리로드됨)
      if (type !== undefined) {
        this.service.updateFilter({ documentType: type });
      } else {
        this.service.resetFilter();
      }
    });
  }

  /**
   * 필터 변경 (자동으로 리로드됨)
   */
  updateFilter(partialFilter: Partial<IDocumentFilterParams>) {
    this.service.updateFilter({
      ...partialFilter,
      pageNumber: 1 // 필터 변경 시 첫 페이지로
    });
  }

  /**
   * 페이지 변경
   */
  changePage(pageNumber: number) {
    this.service.updateFilter({ pageNumber });
  }

  /**
   * 페이지 크기 변경
   */
  changePageSize(pageSize: number) {
    this.service.updateFilter({
      pageSize,
      pageNumber: 1 // 페이지 크기 변경 시 첫 페이지로
    });
  }

  /**
   * 정렬 변경
   */
  changeSort(sortBy: string, sortDirection: 'asc' | 'desc') {
    this.service.updateFilter({ sortBy, sortDirection });
  }

  /**
   * 검색
   */
  search(keyword: string) {
    this.updateFilter({ searchKeyword: keyword });
  }
  /**
    * 검색 초기화
    */
  clearSearch() {
    this.updateFilter({ searchKeyword: undefined });
  }

  /**
   * 추천만 보기 토글
   */
  toggleFeatured() {
    const currentFilter = this.service.getCurrentFilter();
    this.updateFilter({
      isFeatured: currentFilter.isFeatured ? undefined : true
    });
  }

  onReceiveData(data: IBuddhistDocument) {
    this.selectedData.set(data);
  }

  /**
   * 데이터 다시 로드 (현재 필터 유지)
   */
  reloadData() {
    this.service.documentList.reload();
  }

  onResetRequested() {
    this.selectedData.set(null);
  }

  goTo() {
    this.router.navigate([`${Paths.Document.url}/${Paths.CreateDocument.url}`]);
  }
}
