import { Component } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { PageTitle } from "@app/shared/components/page-title/page-title";

@Component({
  selector: 'app-backup-scripture',
  imports: [PageTitle],
  templateUrl: './backup-scripture.html',
  styleUrl: './backup-scripture.scss',
})
export class BackupScripture {
  title = Paths.BackupScripture.title;
}
