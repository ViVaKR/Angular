import { CommonModule } from '@angular/common';
import { Component, computed, inject, isDevMode, OnInit, signal } from '@angular/core';
import { IDharmaScriptureView } from '@app/core/interfaces/dharma/i-scripture';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';
import { BodyTitle } from '@app/shared/body-title/body-title';
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
  readonly detailUrl = `${Paths.DharmaScripture.url}/${Paths.DharmaScriptureEditor}`;
  readonly service = inject(DharmaScriptureService);
  readonly userStore = inject(UserStore);
  readonly pageSize = signal(10);
  readonly selectedData = signal<IDharmaScriptureView | null>(null);
  readonly anchorId = signal<string>('createId');

  readonly data = computed(() => this.service.accumulatedData());
  readonly isAdmin = computed(() => this.userStore.isAdmin());
  readonly canManage = computed(() => this.isAdmin());

  // #region Columns
  readonly columns = signal<IColumnDef[]>([
    { key: 'id', label: 'ID', width: 'auto', showInTable: true, showInTab: false, tabOrder: 1 },
    {
      key: 'nameKr',
      label: '제목',
      width: 'auto',
      showInTable: true,
      showInTab: false,
      tabOrder: 2,
    },
    {
      key: 'nameCn',
      label: '한문제목',
      width: '',
      showInTable: true,
      showInTab: false,
      tabOrder: 3,
    },
    {
      key: 'originName',
      label: '원어제목',
      width: 'auto',
      showInTable: true,
      showInTab: false,
      tabOrder: 4,
    },

    {
      key: 'totalVolumes',
      label: 'Volumes',
      width: 'auto',
      showInTable: true,
      showInTab: false,
      tabOrder: 5,
    },
    {
      key: 'totalChapters',
      label: 'Chapters',
      width: 'auto',
      showInTable: true,
      showInTab: false,
      tabOrder: 6,
    },
    {
      key: 'totalSections',
      label: 'Sections',
      width: 'auto',
      showInTable: true,
      showInTab: false,
      tabOrder: 8,
    },
    {
      key: 'totalVerses',
      label: 'Verses',
      width: 'auto',
      showInTable: true,
      showInTab: false,
      tabOrder: 9,
    },
    {
      key: 'primaryCategory',
      label: '범주',
      width: 'auto',
      showInTable: true,
      showInTab: false,
      tabOrder: 10,
    },

    /* detail */
    {
      key: 'majorCategory',
      label: '기본카테고리',
      width: 'auto',
      showInTable: false,
      showInTab: true,
      tabOrder: 1,
    },
  ]);
  // #endregion

  ngOnInit(): void {
    this.service.reload();
  }

  onReceiveData(data: IDharmaScriptureView) {
    this.selectedData.set(data);
  }

  onSearch(keyword: string) {
    this.service.search(keyword.trim());
  }

  reset() {
    this.service.reset();
  }

  reload() {
    this.service.reload();
  }
}
