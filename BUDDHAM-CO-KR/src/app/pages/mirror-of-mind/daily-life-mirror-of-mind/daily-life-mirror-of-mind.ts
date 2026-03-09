import { Component } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { BodyTitle } from "@app/shared/body-title/body-title";

@Component({
  selector: 'daily-life-mirror-of-mind',
  imports: [BodyTitle],
  templateUrl: './daily-life-mirror-of-mind.html',
  styleUrl: './daily-life-mirror-of-mind.scss',
})
export class DailyLifeMirrorOfMind {

  title = Paths.DailyLifeMirrorOfMind.title;
}
