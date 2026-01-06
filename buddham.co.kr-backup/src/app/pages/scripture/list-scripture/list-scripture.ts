import { Component } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { PageTitle } from '@app/shared/components/page-title/page-title';

@Component({
  selector: 'app-list-scripture',
  imports: [
    PageTitle
  ],
  templateUrl: './list-scripture.html',
  styleUrl: './list-scripture.scss',
})
export class ListScripture {
  title = Paths.ListScripture.title;
}
