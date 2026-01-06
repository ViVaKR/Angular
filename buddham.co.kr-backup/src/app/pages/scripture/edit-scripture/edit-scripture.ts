import { Component } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { PageTitle } from "@app/shared/components/page-title/page-title";

@Component({
  selector: 'app-edit-scripture',
  imports: [PageTitle],
  templateUrl: './edit-scripture.html',
  styleUrl: './edit-scripture.scss',
})
export class EditScripture {
  title = Paths.EditScripture.title;
}
