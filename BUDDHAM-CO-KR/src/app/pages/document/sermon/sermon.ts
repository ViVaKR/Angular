import { Component } from '@angular/core';
import { ListDocument } from "../list-document/list-document";
import { BodyLayout } from "@app/shared/body-layout/body-layout";

@Component({
  selector: 'app-sermon',
  imports: [
    ListDocument,
  ],
  templateUrl: './sermon.html',
  styleUrl: './sermon.scss',
})
export class Sermon {



}
