import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MongoService } from '@app/core/services/mongo-service';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';

@Component({
  selector: 'app-home-mirror-of-mind',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON
  ],
  templateUrl: './home-mirror-of-mind.html',
  styleUrl: './home-mirror-of-mind.scss',
})
export class HomeMirrorOfMind {
  mongoService = inject(MongoService);
}
