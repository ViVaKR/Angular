import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActionService } from '@app/services/action.service';
import { CodeService } from '@app/services/code.service';
import katex from 'katex';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MarkdownModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {


  codeService = inject(CodeService);

  ipAddress: string = '0.0.0.0';
  mathExpression: string = 'c = \\pm\\sqrt{a^2 + b^2}';
  actionService = inject(ActionService);

  @ViewChild('mathContainer', { static: false }) mathContainer!: ElementRef;


  ngOnInit() {
    this.codeService.publicIPAddress.subscribe((ip: string) => this.ipAddress = ip);
  }

  ngAfterViewInit() {
    katex.render(this.mathExpression, this.mathContainer.nativeElement, {
      throwOnError: false
    });
  }
}
