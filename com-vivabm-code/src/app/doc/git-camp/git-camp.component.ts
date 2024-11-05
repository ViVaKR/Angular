import { Component, Input } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";
import { TemplateDocumentComponent } from "../../common/template-document/template-document.component";

@Component({
  selector: 'app-git-camp',
  standalone: true,
  imports: [PreparingComponent, TemplateDocumentComponent],
  templateUrl: './git-camp.component.html',
  styleUrl: './git-camp.component.scss'
})
export class GitCampComponent {

  @Input() title: any = 'Git Camp';

  document: string = "documents/git.readme.md";
}
