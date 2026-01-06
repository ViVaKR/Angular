import { Component } from '@angular/core';
import { PageTitle } from "@app/shared/components/page-title/page-title";

@Component({
  selector: 'app-infomation',
  imports: [PageTitle],
  templateUrl: './infomation.html',
  styleUrl: './infomation.scss',
})
export class Infomation {
  readonly title = '정보 마당';
}
