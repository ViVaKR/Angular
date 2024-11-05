import { AfterViewInit, ChangeDetectorRef, Component, HostListener, inject, signal } from '@angular/core';
import { LeftMenuComponent } from "../common/left-menu/left-menu.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { IMenu } from '@app/interfaces/i-menu';
import { Title } from '@angular/platform-browser';
import { ScrollArrowComponent } from "../common/scroll-arrow/scroll-arrow.component";
import { CodeService } from '@app/services/code.service';

@Component({
  selector: 'app-doc',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LeftMenuComponent,
    ScrollArrowComponent
  ],
  templateUrl: './doc.component.html',
  styleUrl: './doc.component.scss'
})
export class DocComponent implements AfterViewInit {

  readonly panelOpenState = signal(false);

  myIp = '0.0.0.0';
  minWidth: number = 1024;

  windowWidth: number = window.innerWidth;
  isMobile: boolean = this.windowWidth < this.minWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    // this.setIsMobile = event.target.innerWidth <= this.minWidth;
    // this.cdref.detectChanges();
  }
  set setIsMobile(isMobile: boolean) {
    this.isMobile = isMobile;
  }

  get getIsMobile(): boolean {
    return this.isMobile;
  }

  router = inject(Router);
  route = inject(ActivatedRoute);

  toggleWidth() {
    this.setIsMobile = !this.getIsMobile;
  }

  codeService = inject(CodeService);
  cdref = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.isMobile = this.windowWidth < this.minWidth;
    this.codeService.publicIPAddress.subscribe((ip: string) => { this.myIp = ip; });
    this.cdref.detectChanges();
  }

  onClickedMenu($event: IMenu) {
    let param = { id: $event.id, title: $event.title, param: $event.param }

    this.router.navigate([$event.url], { relativeTo: this.route, queryParams: param });
  }
}
