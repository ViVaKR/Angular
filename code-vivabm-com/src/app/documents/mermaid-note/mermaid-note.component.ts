import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BlankSpaceComponent } from '@app/common/blank-space/blank-space.component';
import { MarkdownModule } from 'ngx-markdown';
import { Input } from 'postcss';

@Component({
  selector: 'app-mermaid-note',
  standalone: true,
  imports: [
    MarkdownModule,
    MatButtonModule,
    BlankSpaceComponent
  ],
  templateUrl: './mermaid-note.component.html',
  styleUrl: './mermaid-note.component.scss'
})
export class MermaidNoteComponent {

}
