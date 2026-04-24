import { Component, effect, inject, signal } from '@angular/core';
import { CreateTodaySutra } from "./create-today-sutra/create-today-sutra";
import { AccordionTable } from '@app/shared/components/accordion-table/accordion-table';
import { Paths } from '@app/data/menu-data';
import { ITodaySutra } from '@app/core/interfaces/i-today-sutra';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { TodaySutraService } from '@app/core/services/today-sutra-service';
import { BodyTitle } from "@app/shared/body-title/body-title";

@Component({
  selector: 'app-today-sutra',
  imports: [
    CreateTodaySutra,
    AccordionTable,
    BodyTitle
  ],
  templateUrl: './today-sutra.html',
  styleUrl: './today-sutra.scss',
})
export class TodaySutra {

  title = Paths.TodaySutra.title;
  rows = 20;
  detailUrl = 'MemberShip/ReadTodaySutra';
  service = inject(TodaySutraService);
  pageSize = signal(5);
  data = signal<ITodaySutra[]>([]);
  selectedData = signal<ITodaySutra | null>(null);

  dataList = this.service.myList.value;

  columns = signal<IColumnDef[]>([
    // 핵심 정보 (테이블 + 탭)
    { key: 'id', label: 'ID', width: '7%', showInTable: true, showInTab: true, tabOrder: 1 },
    { key: 'title', label: '제목', width: 'auto', showInTable: true, showInTab: true, tabOrder: 2 },
    {
      key: 'createdAt', label: '작성일자',
      width: '15%', showInTable: true, showInTab: true,
      tabOrder: 3,
      pipe: 'date',
      pipeArgs: 'yyyy-MM-dd'
    },
    {
      key: 'pseudonym', label: '작성자', width: '15%',
      showInTable: true, showInTab: true, tabOrder: 4
    },

    // 부가 정보 (탭만)
    { key: 'sutra', label: '내용', showInTable: false, showInTab: true, tabOrder: 0 },
  ]);

  constructor() {
    effect(() => {
      const list = this.dataList();
      if (list) this.data.set(list);
    })
  }

  onReceiveData(data: ITodaySutra) {
    this.selectedData.set(data);
  }

  onResetRequested() {
    this.selectedData.set(null); // 초기화
  }
}
