import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SharedPage } from '@app/shared/components/shared-page/shared-page';
import { Router } from '@angular/router';
import { SeoService } from '@app/core/services/seo-service';
import { MenuService } from '@app/core/services/menu-service';
import { Paths } from '@app/data/menu-data';
import { DocumentService } from '@app/core/services/document-service';
import { IBuddhistDocument } from '@app/core/interfaces/i-buddhist-document';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { BodyTitle } from "@app/shared/body-title/body-title";
import { CreateScriptureMaster } from "../scripture/scripture-master/create-scripture-master/create-scripture-master";
import { AccordionTable } from "@app/shared/components/accordion-table/accordion-table";

@Component({
  selector: 'app-document',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    BodyTitle,
    AccordionTable
  ],
  templateUrl: './document.html',
  styleUrl: './document.scss',
  host: { 'class': 'route-document' }
})
export class Document implements OnInit {

  readonly title = Paths.Document.url;
  readonly detailUrl = `${Paths.Document.url}/${Paths.ReadDocument.url}`;
  readonly service = inject(DocumentService);
  readonly pageSize = signal(15);
  readonly selectedData = signal<IBuddhistDocument | null>(null);
  readonly data = computed(() => this.service.documentList.value() ?? []);


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

  onReceiveData(data: IBuddhistDocument) {
    this.selectedData.set(data);
  }

  onResetRequested() {
    this.selectedData.set(null);
  }

  private seoService = inject(SeoService);
  private router = inject(Router);
  private menuService = inject(MenuService);
  readonly menus = this.menuService.documentMenus();

  ngOnInit(): void {
    this.createSeo();
  }

  createSeo() {
    this.seoService.updateMetaTags({
      title: `문서 - Buddhist Scripture`,
      description: '불교경전에 관련한 문서 및 불화등의 관련 자료실입니다.',
      keywords: `Buddha, 불교 경전, 불교문서, 불교해설서, 불교자료실, 불교예절, 불교상식`,
      url: `https://buddham.co.kr/document`,
      type: 'website',
      twitterCard: 'summary'
    });
  }

  goTo = (url: string) => this.router.navigate([url]);
}


