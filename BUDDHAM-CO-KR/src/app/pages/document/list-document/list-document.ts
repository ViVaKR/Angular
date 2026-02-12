import { Component, inject, signal } from '@angular/core';
import { IBuddhistDocument } from '@app/core/interfaces/i-buddhist-document';
import { DocumentService } from '@app/core/services/document-service';
import { Paths } from '@app/data/menu-data';

@Component({
  selector: 'app-list-document',
  imports: [],
  templateUrl: './list-document.html',
  styleUrl: './list-document.scss',
})
export class ListDocument {

  readonly title = Paths.ListDocument.title;
  readonly detailUrl = `${Paths.Document.url}/${Paths.ReadDocument.url}`;
  readonly service = inject(DocumentService);

  readonly pageSize = signal(15);
  readonly selectedData = signal<IBuddhistDocument | null>(null);


}
