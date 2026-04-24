import { Component } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { BodyTitle } from "@app/shared/body-title/body-title";

@Component({
  selector: 'dharma-mirror-of-mind',
  imports: [BodyTitle],
  templateUrl: './dharma-mirror-of-mind.html',
  styleUrl: './dharma-mirror-of-mind.scss',
})
export class DharmaMirrorOfMind {

  title = Paths.DharmaMirrorOfMind.title;
}
