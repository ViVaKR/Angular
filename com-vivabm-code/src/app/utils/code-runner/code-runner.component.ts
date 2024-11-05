import { ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClient, HttpContext } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SkipLoading } from '@app/helper/skip-loading-token';
import { ActionService } from '@app/services/action.service';
import { HighlightAuto } from 'ngx-highlightjs';


@Component({
  selector: 'app-code-runner',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HighlightAuto,
    ClipboardModule,
    MatButtonModule
  ],
  templateUrl: './code-runner.component.html',
  styleUrl: './code-runner.component.scss'
})
export class CodeRunnerComponent implements OnInit, AfterViewInit, AfterViewChecked {

  title = 'Code Runner';
  scriptOutput: string;
  runnerUrl = 'https://runner.kimbumjun.com';
  http = inject(HttpClient);
  actionService = inject(ActionService);

  private indent(element: ElementRef) {
    const spaces = '    ';
    const start = element.nativeElement.selectionStart;
    const end = element.nativeElement.selectionEnd;
    const value = element.nativeElement.value;
    element.nativeElement.value = value.substring(0, start) + spaces + value.substring(end);
    element.nativeElement.selectionStart = element.nativeElement.selectionEnd = start + spaces.length;
  }
  @ViewChild("scriptInput") scriptInput!: ElementRef;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.target instanceof HTMLTextAreaElement) {
      if (event.key === 'Tab') {
        event.preventDefault();
        // 4개의 공백을 넣는다.
        switch (event.target) {
          case this.scriptInput.nativeElement:
            this.indent(this.scriptInput);
            break;
        }
      }
    }
  }

  script: any = "#! /usr/bin/env zsh\n\necho 'Hello World'";

  runScript() {

    const script = this.script;
    this.http.post<any>(this.runnerUrl, { script }, {
      context: new HttpContext().set(SkipLoading, true)
    })
      .subscribe({
        next: (data) => {
          this.scriptOutput = data.output;
        },
        error: (error) => {
          this.scriptOutput = error.message;
        }
      });
  }

  clearScript() {
    this.script = '#! /usr/bin/env zsh\n\n';
    this.scriptOutput = '';
    this.scriptInput.nativeElement.focus();
  }
  constructor() {
    this.actionService.footerBarOff();
  }

  ngAfterViewInit(): void {
    this.runScript();
  }

  ngAfterViewChecked(): void { }

  ngOnInit(): void { }
}
