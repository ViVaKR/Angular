import { CommonModule } from '@angular/common';
import { Component, computed, inject, isDevMode, signal } from '@angular/core';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { HelpService } from '@app/core/services/help-service';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { LoadingState } from "@app/shared/loading-state/loading-state";
import { ErrorState } from "@app/shared/error-state/error-state";
import { BodyTitle } from "@app/shared/body-title/body-title";
import { IHelp } from '@app/core/interfaces/i-help';
import { AccordionTable } from "@app/shared/components/accordion-table/accordion-table";

@Component({
  selector: 'app-help',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    LoadingState,
    ErrorState,
    BodyTitle,
    AccordionTable
  ],
  templateUrl: './help.html',
  styleUrl: './help.scss',
})
export class Help {

  readonly title = Paths.Help.title;
  readonly service = inject(HelpService);

  readonly pageSize = signal(10);
  readonly detailUrl = `${Paths.About.url}/${Paths.Help.url}`;
  readonly selectedData = signal<IHelp | null>(null);

  // 단일 data 소스
  readonly data = computed(() => this.service.accumulatedData());

  readonly tableColums = computed(() => this.columns().filter(c => c.showInTable).map(c => c.key));

  columns = signal<IColumnDef[]>([
    { key: 'id', label: 'ID', width: '100px', showInTable: true, showInTab: false },
    { key: 'title', label: '제목', width: 'auto', showInTable: true, showInTab: false },
    { key: 'pinOrder', label: '고정', width: '80px', showInTable: true, showInTab: false },
    {
      key: 'createdAt', label: '작성일', width: '150px', showInTable: true, showInTab: false,
      pipe: 'date', pipeArgs: 'yyyy-MM-dd'
    },
    //
    { key: 'content', label: '내용', showInTable: false, showInTab: true },
    { key: 'annotation', label: '비고', showInTable: false, showInTab: true },
  ]);

  ngOnInit() {
    this.service.resetAndReload(); // 최초 1회 로드
  }

  onReceiveData(data: IHelp) { this.selectedData.set(data); }

  onSearch(keyword: string) { this.service.searchByKeyword(keyword); }

  refresh() { this.service.resetAndReload(); }
}
