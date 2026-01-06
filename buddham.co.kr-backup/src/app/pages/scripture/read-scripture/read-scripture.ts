import { Component } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { PageTitle } from "@app/shared/components/page-title/page-title";

@Component({
  selector: 'app-read-scripture',
  imports: [PageTitle],
  templateUrl: './read-scripture.html',
  styleUrl: './read-scripture.scss',
})
export class ReadScripture {
  title = Paths.ReadScripture.title;
}
