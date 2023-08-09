import { style } from '@angular/animations';
import { Component, ElementRef, Renderer2} from '@angular/core';


@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent
{
  contents: string = '';

  constructor()
  {
    this.contents = 'Hello, World';
    
  }

  title: string = "Code Editor";

  tagInput(event: Event)
  {
    this.title = (event.target as HTMLDivElement).innerHTML;
  }

  setStyle(event: Event, editor: HTMLDivElement)
  {


    editor.innerHTML = (event.target as HTMLButtonElement).innerText;

    editor.style.color = 'red';
  }
}
