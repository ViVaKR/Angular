import { CommonModule } from '@angular/common';
import { Component, computed, inject, isDevMode, OnInit, signal } from '@angular/core';
import { IDharmaScriptureView } from '@app/core/interfaces/dharma/i-scripture';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';
import { BodyTitle } from '@app/shared/body-title/body-title';
import { IScriptureComment } from '@app/shared/comment-board/interfaces/i-scripture-comment';
import { IThreadConfig } from '@app/shared/comment-board/interfaces/i-thread-config';
import { DharmaScriptureCommentService } from '@app/shared/comment-board/service/dharma-scripture-comment-service';
import { AccordionTable } from '@app/shared/components/accordion-table/accordion-table';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { DharmaScriptureService } from './services/dharma-scripture';

@Component({
  selector: 'app-dharma-scripture',
  imports: [CommonModule, ...MATERIAL_COMMON, BodyTitle, AccordionTable],
  templateUrl: './dharma-scripture.html',
  styleUrl: './dharma-scripture.scss',
})
export class DharmaScripture implements OnInit {
  /*  */
  readonly title = Paths.DharmaScripture.title;
  readonly isDevelopment = isDevMode();
  readonly detailUrl = `${Paths.Dharma.url}/${Paths.DharmaScriptureViewer.url}`;
  readonly service = inject(DharmaScriptureService);
  readonly commentService = inject(DharmaScriptureCommentService); // 댓글 서비스
  readonly userStore = inject(UserStore);
  readonly pageSize = signal(10);
  readonly selectedData = signal<IDharmaScriptureView | null>(null);
  readonly anchorId = signal<string>('createId');

  readonly data = computed(() => this.service.accumulatedData());
  readonly isAdmin = computed(() => this.userStore.isAdmin());
  readonly canManage = computed(() => this.isAdmin());

  // 🔥 3개 타입 아규먼트 명시
  readonly threadConfig: IThreadConfig<
    IDharmaScriptureView,                        // T
    IScriptureComment,                           // U
    { isLiked: boolean; likeCount: number }      // R
  > = {
      fetchRepliesUrl: this.commentService.getRepliesUrl,
      createCommentFn: this.commentService.createComment, // (root: IDharmaScriptureView) ✅
      createReplyFn: this.commentService.createReply,   // (target: IScriptureComment) ✅
      toggleLikeFn: this.commentService.toggleLike,
      getAvatarUrlFn: this.commentService.getAvatarUrl,
    };

  // #region Columns
  readonly columns = signal<IColumnDef[]>([


    {
      key: 'nameKr', label: '제목',
      width: 'auto', showInTable: true,
      showInTab: false, tabOrder: 1, position: 'header'
    },
    {
      key: 'originName', label: '원어제목',
      width: 'auto', showInTable: true,
      showInTab: false, tabOrder: 2, position: 'header'
    },

    {
      key: 'nameEn', label: '영문제목',
      width: 'auto', showInTable: true, showInTab: false,
      tabOrder: 3, position: 'header'
    },

    {
      key: 'nameCn', label: '한문제목',
      width: 'auto', showInTable: true, showInTab: false, tabOrder: 4,
      position: 'header'
    },
    {
      key: 'tier', label: '티어',
      width: 'auto', showInTable: true, showInTab: false,
      tabOrder: 5, position: 'badge'
    },

    /* detail */
    {
      key: 'originLang', label: '경전언어',
      width: 'auto', showInTable: false, showInTab: true, tabOrder: 10,
      position: 'grid'
    },


    {
      key: 'totalVolumes', label: 'Volumes',
      width: 'auto', showInTable: false, showInTab: true, tabOrder: 11,
      position: 'grid'
    },
    {
      key: 'totalChapters', label: 'Chapters',
      width: 'auto', showInTable: false, showInTab: true, tabOrder: 12,
      position: 'grid'
    },
    {
      key: 'chapterUnit', label: '단위', width: 'auto',
      showInTable: false, showInTab: true, tabOrder: 13
    },
    {
      key: 'totalSections', label: 'Sections',
      width: 'auto',
      showInTable: false, showInTab: true, tabOrder: 14
    },
    {
      key: 'totalVerses', label: 'Verses',
      width: 'auto', showInTable: false, showInTab: true, tabOrder: 15
    },
    {
      key: 'primaryCategory', label: '범주',
      width: 'auto', showInTable: false, showInTab: true, tabOrder: 16,
      position: 'badge'
    },

    {
      key: 'majorCategory', label: '기본카테고리',
      width: 'auto', showInTable: false, showInTab: true, tabOrder: 17,
      position: 'badge'
    },
    {
      key: 'id', label: 'ID',
      width: 'auto', showInTable: false, showInTab: true, tabOrder: 100
    },
    {
      key: 'details', label: '상세',
      width: 'auto', showInTable: false, showInTab: true, tabOrder: 200,
      position: 'content'
    }

  ]);
  // #endregion

  ngOnInit(): void {
    this.service.reload();
  }

  onReceiveData(data: IDharmaScriptureView) { this.selectedData.set(data); }
  onSearch(keyword: string) { this.service.search(keyword.trim()); }
  reset() { this.service.reset(); }
  reload() { this.service.reload(); }
}


/*

 - 원어 언어 코드
 - PALI: 팔리어 (상좌부)
 - SANS: 산스크리트어 (대승/밀교)
 - TIBE: 티베트어
 - HANS: 한문 (동아시아 원창작)
 - KORE: 한국어 (근현대 저술)

*/
