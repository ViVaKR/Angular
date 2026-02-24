import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { BodyLayout } from "@app/shared/body-layout/body-layout";
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { BodyTitle } from "@app/shared/body-title/body-title";
import { MirrorOfMindService } from '@app/core/services/mirror-of-mind-service';

@Component({
  selector: 'app-qna-mirror-of-mind',
  imports: [
    BodyLayout,
    CommonModule,
    ...MATERIAL_COMMON,
    BodyTitle
  ],
  templateUrl: './qna-mirror-of-mind.html',
  styleUrl: './qna-mirror-of-mind.scss',
})
export class QnaMirrorOfMind {

  readonly title = Paths.QnaMirrorOfMind.title;
  readonly anchorId = signal<string>('createId');
  readonly detailUrl = `${Paths.MirrorOfMind.url}`;
  readonly service = inject(MirrorOfMindService);

}
