import { Component, computed, inject, signal } from '@angular/core';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { IScriptureTranscription } from '@app/core/interfaces/i-scripture-transciption';
import { ScriptureService } from '@app/core/services/scripture-service';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';

@Component({
  selector: 'scripture-transcription',
  imports: [],
  templateUrl: './scripture-transcription.html',
  styleUrl: './scripture-transcription.scss',
})
export class ScriptureTranscription {

  readonly title = Paths.ScriptureTranscription.title;

  readonly detailUrl = `${Paths.Scripture.url}/${Paths.ScriptureTranscription.url}`;
  readonly service = inject(ScriptureService);
  readonly userStore = inject(UserStore);
  readonly pageSize = signal(10);
  readonly selectedData = signal<IScriptureTranscription | null>(null);
  readonly anchorId = signal<string>('createId');

  columns = signal<IColumnDef[]>([

    // 목록
    { key: 'title', label: '제목', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 1 },
    {
      key: 'contentCategory', label: '분류', width: 'auto', fontName: 'font-noto',
      pipe: 'enum',
      showInTable: true, showInTab: false, tabOrder: 2
    },
    {
      key: 'likeCount', label: '좋아요', width: 'auto',
      fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 3
    },
    { key: 'viewCount', label: '조회', width: 'auto', fontName: 'font-noto', showInTable: true, showInTab: false, tabOrder: 4 },
    {
      key: 'createdAt', label: '작성일자', width: 'auto', fontName: 'font-noto',
      showInTable: true, showInTab: false, tabOrder: 5,
      pipe: 'date', pipeArgs: 'yyyy-MM-dd'
    },
    { key: 'authorPseudonym', label: '작성자', width: 'auto', fontName: 'font-ibm', showInTable: true, showInTab: false, tabOrder: 6 },

    // 상세
    { key: 'transcription', label: '본문', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 7 },
    {
      key: 'commentary', label: '메모', fontName: 'font-ibm',
      showInTable: false, showInTab: true, tabOrder: 8
    },
    {
      key: 'updatedAt', label: '수정일자', fontName: 'font-ibm',
      showInTable: false, showInTab: true, tabOrder: 9,
      pipe: 'date', pipeArgs: 'yyyy-MM-dd'
    },
    { key: 'tags', label: '태그', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 11 },
    { key: 'postType', label: '출판상태', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 12 },
    {
      key: 'scriptureMasterTitle', label: '연관 경전',
      fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 13
    },
    { key: 'language', label: '언어', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 14 },
    { key: 'id', label: '글번호', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 15 },
    { key: 'userId', label: '작성자', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 16 },
    { key: 'isVerified', label: '관리자 확인', fontName: 'font-ibm', showInTable: false, showInTab: true, tabOrder: 17 },
  ]);

  readonly data = computed(() => this.service.scriptureTranscriptionList.value() ?? []);

  // 1. 본인글인지 여부
  readonly isOwner = computed(() => {
    const selectedData = this.selectedData();
    const userId = this.userStore.userId();
    return selectedData?.userId === userId;
  });

  // 2. 관리자 여부
  readonly isAdmin = computed(() => this.userStore.isAdmin());

  // 3. 수정 여부
  readonly canManage = computed(() => this.isOwner() || this.isAdmin());

  ngOnInit() {

  }

}
