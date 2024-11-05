import { Component, Input } from '@angular/core';
import { PreparingComponent } from "../../common/preparing/preparing.component";
import { TemplateDocumentComponent } from "../../common/template-document/template-document.component";

@Component({
  selector: 'app-shell-script-camp',
  standalone: true,
  imports: [PreparingComponent, TemplateDocumentComponent],
  templateUrl: './shell-script-camp.component.html',
  styleUrl: './shell-script-camp.component.scss'
})
export class ShellScriptCampComponent {
  @Input() title: any = 'Shell Script Camp';
  // message: any = 'Shell Script 훈련소 준비중';
  document: string = "documents/shell.readme.md";

}
