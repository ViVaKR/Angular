import { Component, inject, signal } from '@angular/core';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { IScriptureContent } from '@app/core/interfaces/i-scripture-content';
import { ScriptureService } from '@app/core/services/scripture-service';
import { Paths } from '@app/data/menu-data';
import { ReadyPage } from "@app/shared/ready-page/ready-page";

@Component({
  selector: 'app-scripture-content',
  imports: [ReadyPage],
  templateUrl: './scripture-content.html',
  styleUrl: './scripture-content.scss',
})
export class ScriptureContent {
  title = Paths.ScriptureTranscription.title;
  rows = 5;
  detailUrl = `${Paths.Scripture.url}/${Paths.ScriptureTranscription.url}`;
  service = inject(ScriptureService);
  pageSize = signal(15);
  data = signal<IScriptureContent[]>([]);
  selectedData = signal<IScriptureContent | null>(null);
  // dataList = this.service.contentList.value;

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


  ])
}
