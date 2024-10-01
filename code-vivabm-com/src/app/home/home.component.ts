import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, inject, Input, OnInit, signal, Type, ViewChild } from '@angular/core';
import { CodeService } from '@app/services/code.service';
import { CircleProgressComponent } from "../common/circle-progress/circle-progress.component";
import { MarkdownService, MarkdownPipe, LanguagePipe, MarkdownComponent, ClipboardButtonComponent, KatexOptions } from 'ngx-markdown';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    CircleProgressComponent,
    AsyncPipe,
    ClipboardButtonComponent,
    MarkdownComponent, MarkdownPipe, LanguagePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {

  public options: KatexOptions = {
    displayMode: true,
    throwOnError: false,
    errorColor: '#cc0000',
    delimiters: []
  };
  http = inject(HttpClient);
  codeService = inject(CodeService);

  markdownService = inject(MarkdownService);

  ipAddress: string = '0.0.0.0';

  markdown = '#Hello, World!';
  html: string;
  data: any;
  data2: string = "#### Hello, World! \\2^3\\rightarrow 9";
  typescriptMarkdown: any;
  clipboardButton = ClipboardButtonComponent;
  ngAfterViewInit(): void {
    this.data = this.markdownService.parse("const myProp: string = 'value'");

  }

  ngOnInit() {
    this.codeService.isElement.next(false);
    this.codeService.publicIPAddress.subscribe((ip: string) => this.ipAddress = ip);
    this.codeService.isElement.next(false);
  }
}
