import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { IBuddhistTerm } from '@app/core/interfaces/i-buddhist-term';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { AboutService } from '@app/core/services/about-service';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { AccordionTable } from "@app/shared/components/accordion-table/accordion-table";
import { BodyTitle } from "@app/shared/body-title/body-title";
import { CreateBuddhistTerm } from './create-buddhist-term/create-buddhist-term';

@Component({
  selector: 'app-buddhist-term',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    AccordionTable,
    BodyTitle,
    CreateBuddhistTerm
  ],
  templateUrl: './buddhist-term.html',
  styleUrl: './buddhist-term.scss',
})
export class BuddhistTerm {

  title = Paths.BuddhistTerm.title;
  detailUrl = 'About/ReadBuddistTerm';
  private service = inject(AboutService);
  anchorId = signal<string>('createId');
  pageSize = signal(10);
  readonly data = computed(() => this.service.termList.value() ?? []);
  selectedData = signal<IBuddhistTerm | null>(null);

  columns = signal<IColumnDef[]>([
    { key: 'id', label: 'ID', width: '10%', showInTable: true, showInTab: false, tabOrder: 1 },
    { key: 'term', label: '용어', width: 'auto', showInTable: true, showInTab: false, tabOrder: 2 },
    { key: 'pseudonym', label: '작성자', width: '25%', showInTable: true, showInTab: false, tabOrder: 3 },

    // Detail
    { key: 'explanation', label: '설명', showInTable: false, showInTab: true, tabOrder: 4 }
  ]);

  onReceiveData(data: IBuddhistTerm) {
    this.selectedData.set(data);
  }

  onResetRequested() {
    this.selectedData.set(null);
  }
}
