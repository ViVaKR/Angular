import { Component } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { PageTitle } from "@app/shared/components/page-title/page-title";

@Component({
  selector: 'app-write-scripture',
  imports: [PageTitle],
  templateUrl: './write-scripture.html',
  styleUrl: './write-scripture.scss',
})
export class WriteScripture {
  title = Paths.WriteScripture.title;
}
