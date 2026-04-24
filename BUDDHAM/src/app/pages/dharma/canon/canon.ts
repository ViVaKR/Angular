import { CommonModule } from '@angular/common';
import { Component, computed, inject, isDevMode, signal } from '@angular/core';
import { ICanonView } from '@app/core/interfaces/dharma/i-canon-schema';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { CanonService } from '@app/core/services/dharma/canon-service';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';
import { BodyTitle } from '@app/shared/body-title/body-title';
import { AccordionTable } from '@app/shared/components/accordion-table/accordion-table';
import { ErrorState } from '@app/shared/error-state/error-state';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { LoadingState } from '@app/shared/loading-state/loading-state';

@Component({
  selector: 'app-canon',
  imports: [CommonModule, ...MATERIAL_COMMON, LoadingState, ErrorState, BodyTitle, AccordionTable],
  templateUrl: './canon.html',
  styleUrl: './canon.scss',
})
export class Canon {
  readonly title = Paths.Canon.title;
  public readonly isDevelopment = isDevMode();
  readonly detailUrl = `${Paths.Dharma.url}/${Paths.ReadCanon.url}`;
  readonly service = inject(CanonService);
  readonly userStore = inject(UserStore);
  readonly pageSize = signal(10);
  readonly selectedData = signal<ICanonView | null>(null);
  readonly anchorId = signal<string>('createId');

  readonly columns = signal<IColumnDef[]>([
    { key: 'id', label: 'ID', width: '100px', showInTable: true, showInTab: false, tabOrder: 1 },
    {
      key: 'title', label: '제목', width: 'auto', pipe: 'truncate',
      pipeArgs: {
        limit: 15,
        mode: 'default',
        suffix: '...'
      },
      showInTable: true,
      showInTab: false,
      tabOrder: 2,
    },
    { key: 'createdAt', label: '작성일', width: '150px', showInTable: true, showInTab: false, pipe: 'date', pipeArgs: 'yyyy-MM-dd', tabOrder: 3, },
    { key: 'pseudonym', label: '글쓴이', width: '150px', showInTable: true, showInTab: false, tabOrder: 4, },
    { key: 'replyCount', label: '댓글수', showInTable: true, showInTab: false, tabOrder: 6 },

    /* detail */
    { key: 'details', label: '경전상세', showInTable: false, showInTab: true, tabOrder: 11 },
  ]);

  readonly data = computed(() => this.service.accumulatedData());

  ngOnInit() {
    this.service.reload();
  }

  onReceiveData(data: ICanonView) { this.selectedData.set(data); }
  onSearch(keyword: string) { this.service.search(keyword.trim()); }
  refresh() { this.service.reset(); }
  reloadData() { this.service.reload(); }
  onResetRequested() { this.selectedData.set(null); }
}
