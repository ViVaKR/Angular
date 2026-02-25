import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MongoService } from '@app/core/services/mongo-service';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { BodyTitle } from "@app/shared/body-title/body-title";

@Component({
  selector: 'app-home-mirror-of-mind',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    BodyTitle
  ],
  templateUrl: './home-mirror-of-mind.html',
  styleUrl: './home-mirror-of-mind.scss',
})
export class HomeMirrorOfMind {

  title = Paths.HomeMirrorOfMind.title;
  mongoService = inject(MongoService);

}
