import { Component } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { PageTitle } from "@app/shared/components/page-title/page-title";

@Component({
  selector: 'app-home-scripture',
  imports: [PageTitle],
  templateUrl: './home-scripture.html',
  styleUrl: './home-scripture.scss',
})
export class HomeScripture {

  title = Paths.HomeScripture.title;
}
