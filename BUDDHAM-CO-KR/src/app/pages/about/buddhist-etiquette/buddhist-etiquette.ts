import { Component, inject, signal } from '@angular/core';
import { IBuddhistTerm } from '@app/core/interfaces/i-buddhist-term';
import { AboutService } from '@app/core/services/about-service';
import { Paths } from '@app/data/menu-data';
import { AccordionTable } from "@app/shared/components/accordion-table/accordion-table";
import { IColumnDef } from '@app/core/interfaces/i-column-def';

@Component({
  selector: 'app-buddhist-etiquette',
  imports: [AccordionTable],
  templateUrl: './buddhist-etiquette.html',
  styleUrl: './buddhist-etiquette.scss',
})
export class BuddhistEtiquette {

  title = Paths.BuddhistTerm.title;
  detailUrl = 'About/ReadBuddistTerm';
  service = inject(AboutService);
  rows = signal<number>(3);
  data = signal<IBuddhistTerm[]>([]);
  selectedData = signal<IBuddhistTerm | null>(null);
  pageSize = signal(10);

  dataList = this.service.termList.value;
  columns = signal<IColumnDef[]>([
    { key: 'id', label: 'ID', width: '7%', showInTable: true, showInTab: false, tabOrder: 1 },
    { key: 'term', label: '용어', width: 'auto', showInTable: true, showInTab: false, tabOrder: 2 },
    { key: 'pseudonym', label: '작성자', width: '12%', showInTable: true, showInTab: false, tabOrder: 3 },

    // Detail
    { key: 'explanation', label: '설명', showInTable: false, showInTab: true, tabOrder: 4 },
    { key: 'userId', label: '작성자 아이디', showInTable: true, showInTab: false, tabOrder: 5 }
  ]);

  onReceiveData(data: IBuddhistTerm) {
    this.selectedData.set(data);
  }
}
