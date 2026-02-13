import { Component } from '@angular/core';
import { ReadyPage } from "@app/shared/ready-page/ready-page";
import { ListDocument } from "../list-document/list-document";

@Component({
  selector: 'app-teisho',
  imports: [ReadyPage, ListDocument],
  templateUrl: './teisho.html',
  styleUrl: './teisho.scss',
})
export class Teisho {

}
