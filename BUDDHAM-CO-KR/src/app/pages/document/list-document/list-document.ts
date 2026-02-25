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
import { DocumentType } from '@app/core/enums/document-type';
import { ActivatedRoute, Router } from '@angular/router';

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

  readonly detailUrl = `${Paths.Document.url}/${Paths.ReadDocument.url}`;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly service = inject(DocumentService);
  readonly pageSize = signal(15);
  readonly selectedData = signal<IBuddhistDocument | null>(null);
  readonly data = computed(() => this.service.documentList.value() ?? []);

  // route.data 에서 documentType 가져오기
  readonly documentType = signal<DocumentType | null>(null);

  // 동적 제목
  readonly title = computed(() => {
    const type = this.documentType();
    if (type === null) return '전체문서';
    switch (type) {
      case DocumentType.Sermon: return Paths.Sermon.title;
      case DocumentType.DharmaTalk: return Paths.DharmaTalk.title;
      case DocumentType.Discourse: return Paths.Discourse.title;
      case DocumentType.Tsisho: return Paths.Teisho.title;
      default: return '문서 목록';
    }

  });

  // 필터링된 데이터
  readonly filteredData = computed(() => {
    const allData = this.data();
    const type = this.documentType();

    // 타입이 null 이면 전체 표시
    if (type === null) return allData;

    // 특정 타입만 필터링
    return allData.filter(doc => doc.documentType === type);
  });

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
    // route.data 에서 documentType 읽기
    this.route.data.subscribe(data => {
      const type = data['documentType'];
      this.documentType.set(type ?? null);

      // API 레벨에서 필터링 (옵션)
    })
  }

  loadDocuments(type?: DocumentType) {
    if (type !== undefined) {

      // API 에 타입 파라미터 전달
      // this.service.documentList.reload({ documentType: type });
      this.service.documentList.reload();
    } else {
      // 전체 로드
      this.service.documentList.reload();
    }
  }

  onReceiveData(data: IBuddhistDocument) {
    this.selectedData.set(data);
  }

  reloadData() {
    const type = this.documentType();
    this.loadDocuments(type ?? undefined);
    // this.service.documentList.reload();
  }

  onResetRequested() {
    this.selectedData.set(null);
  }

  goTo() {
    this.router.navigate([`${Paths.Document.url}/${Paths.CreateDocument.url}`]);
  }

}
