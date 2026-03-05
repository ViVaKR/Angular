import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { BodyTitle } from "@app/shared/body-title/body-title";
import { IQna } from '@app/core/interfaces/i-qna';
import { QnaService } from '@app/core/services/qna-service';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { LoadingState } from "@app/shared/loading-state/loading-state";
import { ErrorState } from "@app/shared/error-state/error-state";
import { AccordionTable } from "@app/shared/components/accordion-table/accordion-table";
import { QnaCreate } from "./qna-create/qna-create";

@Component({
  selector: 'app-qna-mirror-of-mind',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    BodyTitle,
    LoadingState,
    ErrorState,
    AccordionTable,
    QnaCreate
  ],
  templateUrl: './qna-mirror-of-mind.html',
  styleUrl: './qna-mirror-of-mind.scss',
})
export class QnaMirrorOfMind {

  readonly title = Paths.QnaMirrorOfMind.title;
  readonly detailUrl = `${Paths.MirrorOfMind.url}`;

  readonly service = inject(QnaService);

  readonly pageSize = signal(10);
  readonly selectedData = signal<IQna | null>(null);
  readonly anchorId = signal<string>('createId');

  // data source
  readonly data = computed(() => this.service.accumulatedData());

  readonly tableColums = computed(() => this.columns().filter(x => x.showInTab).map(x => x.key));

  columns = signal<IColumnDef[]>([
    { key: 'id', label: 'ID', width: '100px', showInTable: true, showInTab: false, tabOrder: 1 },
    { key: 'title', label: '제목', width: 'auto', showInTable: true, showInTab: false, tabOrder: 2 },
    {
      key: 'createdAt', label: '작성일', width: '150px',
      showInTable: true, showInTab: false,
      pipe: 'date', pipeArgs: 'yyyy-MM-dd', tabOrder: 3
    },
    {
      key: 'pseudonym', label: '글쓴이', width: '150px',
      showInTable: true, showInTab: false, tabOrder: 4
    },
    {
      key: 'likeCount', label: '좋아요', width: '100px',
      showInTable: true, showInTab: false,
      pipe: 'like',
      tabOrder: 5
    },


    // detail
    { key: 'content', label: '내용', showInTable: false, showInTab: true, tabOrder: 11 },
    {
      key: 'modifiedAt', label: '수정일', pipe: 'date', pipeArgs: 'yyyy-MM-dd',
      showInTable: false, showInTab: true, tabOrder: 12
    },

    { key: 'replyCount', label: '댓글수', showInTable: false, showInTab: true, tabOrder: 13 },
    { key: 'isLikedByMe', label: '나의 좋아요', showInTable: false, showInTab: true, tabOrder: 14 },
  ]);

  ngOnInit() {
    this.service.resetAndReload(); // 최초 1회 로드
  }

  onReceiveData(data: IQna) { this.selectedData.set(data); }

  onSearch(keyword: string) { this.service.searchByKeyword(keyword); }

  refresh() { this.service.resetAndReload(); }

  reloadData() {
    this.service.reload();
  }

  onResetRequested() {
    this.selectedData.set(null);
  }

  onLikeClick(item: IQna): void {

    // 좋아요 업데이트
    const updated = this.service.accumulatedData().map(x =>
      x.id === item.id
        ? {
          ...x, isLikedByMe: !x.isLikedByMe,
          likeCount: x.isLikedByMe ? x.likeCount - 1 : x.likeCount + 1
        }
        : x);

    this.service.state.update(prev => ({ ...prev, data: updated }));

    // API 호출
    this.service.toggleLike(item.id as number).subscribe({
      next: (res) => {
        // 서버값으로 정확히 동기화
        this.service.state.update(prev => ({
          ...prev,
          data: prev.data.map(x => x.id === item.id
            ? { ...x, isLikedByMe: res.isLiked, likeCount: res.likeCount }
            : x)
        }));
      },
      error: () => {
        // 실패시 롤백
        this.service.state.update(prev => ({
          ...prev,
          data: prev.data.map(x => x.id === item.id ? item : x)
        }));
      }
    });

  }

}
