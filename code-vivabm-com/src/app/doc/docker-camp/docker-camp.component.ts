import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownModule } from 'ngx-markdown';
import katex from 'katex';
import * as mermaid from 'mermaid';
import { PreparingComponent } from "../../common/preparing/preparing.component";

@Component({
  selector: 'app-docker-camp',
  standalone: true,
  imports: [
    MarkdownModule,
    MatButtonModule,
    PreparingComponent
  ],
  templateUrl: './docker-camp.component.html',
  styleUrl: './docker-camp.component.scss'
})
export class DockerCampComponent {
  @Input() title: string = 'Docker Camp';
  @Input() message: string = '준비중입니다.';
}
