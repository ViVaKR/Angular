import { Component } from '@angular/core';
import { ReadyPage } from "@app/shared/ready-page/ready-page";
import { ListDocument } from "../list-document/list-document";

@Component({
  selector: 'app-discourse',
  imports: [ReadyPage, ListDocument],
  templateUrl: './discourse.html',
  styleUrl: './discourse.scss',
})
export class Discourse {

}
