import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActionService } from '@app/services/action.service';
import { CodeService } from '@app/services/code.service';
import katex from 'katex';
import { MarkdownModule } from 'ngx-markdown';
import { Subscription } from 'rxjs';

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
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  codeService = inject(CodeService);
  actionService = inject(ActionService);
  codeServiceSubscription: Subscription;
  ipAddress: string = '0.0.0.0';
  expression: string = 'R_{\\mu\\nu} - \\frac{1}{2}Rg_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4}T_{\\mu\\nu}';
  @ViewChild('mathContainer', { static: false }) mathContainer!: ElementRef;
  ngOnInit() {
    this.codeServiceSubscription = this.codeService.publicIPAddress.subscribe((ip: string) => this.ipAddress = ip);
  }

  ngAfterViewInit() {
    katex.render(this.expression, this.mathContainer.nativeElement, {
      throwOnError: false
    });
    this.actionService.progressBarOff();
  }

  ngOnDestroy(): void {
    if (this.codeServiceSubscription) {
      this.codeServiceSubscription.unsubscribe();
    }
  }

}
