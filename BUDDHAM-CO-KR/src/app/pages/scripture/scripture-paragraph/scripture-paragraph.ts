import { Component, computed, inject, signal } from '@angular/core';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { IScriptureParagraph } from '@app/core/interfaces/i-scripture-paragraph';
import { ScriptureService } from '@app/core/services/scripture-service';
import { Paths } from '@app/data/menu-data';
import { AccordionTable } from "@app/shared/components/accordion-table/accordion-table";
import { CreateScriptureParagraph } from "./create-scripture-paragraph/create-scripture-paragraph";

@Component({
  selector: 'app-scripture-paragraph',
  imports: [AccordionTable, CreateScriptureParagraph],
  templateUrl: './scripture-paragraph.html',
  styleUrl: './scripture-paragraph.scss',
})
export class ScriptureParagraph {

  readonly title = Paths.ScriptureParagraph.title;
  readonly detailUrl = `${Paths.Scripture.url}/${Paths.ReadScriptureParagraph.url}`;
  readonly service = inject(ScriptureService);
  readonly pageSize = signal(15);
  readonly selectedData = signal<IScriptureParagraph | null>(null);

  readonly data = computed(() => this.service.paragraphList.value() ?? []);

  columns = signal<IColumnDef[]>([
    { key: 'id', label: 'ID', width: 'auto', fontName: 'font-poppins', showInTable: true, showInTab: false, tabOrder: 1 },
    {
      key: 'mainCategoryType', label: '카테고리',
      width: 'auto', fontName: 'font-noto',
      showInTable: true, showInTab: false,
      pipe: 'enum', pipeArgs: 'label', tabOrder: 2
    },
    { key: 'scriptureMasterTitle', label: '경전제목', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 3 },
    { key: 'book', label: '권/장', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 4 },
    { key: 'chapter', label: '품/경', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 5 },
    { key: 'section', label: '장', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 6 },
    { key: 'passage', label: '절/게송', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 7 },

    // * 내용 * //
    { key: 'content', label: '경전내용', width: 'auto', fontName: 'font-poppins', showInTable: false, showInTab: true, tabOrder: 8 },
    { key: 'originalContent', label: '경전원문', width: 'auto', fontName: 'font-poppins', showInTable: false, showInTab: true, tabOrder: 9 },
    { key: 'bookTitle', label: '권/장/회', width: 'auto', fontName: 'font-noto', showInTable: false, showInTab: true, tabOrder: 10 },
    { key: 'chapterTitle', label: '품/경', width: 'auto', fontName: 'font-noto', showInTable: false, showInTab: true, tabOrder: 11 },
    { key: 'sectionTitle', label: '장', width: 'auto', fontName: 'font-noto', showInTable: false, showInTab: true, tabOrder: 12 },
    { key: 'passageTitle', label: '절/게송', width: 'auto', fontName: 'font-noto', showInTable: false, showInTab: true, tabOrder: 13 },
  ]);

  onReceiveData(data: IScriptureParagraph) {
    this.selectedData.set(data);
  }

  onResetRequested() {
    this.selectedData.set(null);
  }
}
