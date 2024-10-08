import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BibleService } from '@app/services/bible.service';
import { CategoryService } from '@app/services/category.service';
import { BibleListComponent } from "./bible-list/bible-list.component";
import { BibleCategoryComponent } from "./bible-category/bible-category.component";
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { Observable, Subscription } from 'rxjs';
import { IBible } from '@app/interfaces/i-bible';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-bible',
  standalone: true,
  imports: [
    JsonPipe,
    BibleListComponent,
    BibleCategoryComponent,
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    NgIf,
    NgFor,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatButtonModule,
    RouterLink,
    MatTooltipModule
  ],
  templateUrl: './bible.component.html',
  styleUrl: './bible.component.scss'
})
export class BibleComponent implements OnInit, OnDestroy {

  categoryService = inject(CategoryService);
  bibleService = inject(BibleService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  cdredf = inject(ChangeDetectorRef);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);

  isExpand: boolean = false;
  subscription!: Subscription;
  bibles$: Observable<IBible[]> | undefined;
  windowWidth: number = window.innerWidth;

  myIp = '0.0.0.0';

  @ViewChild('target') target!: HTMLDivElement;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.isExpand = event.target.innerWidth < 989;
    this.cdredf.detectChanges();
  }

  constructor() {
    this.isExpand = window.innerWidth < 989;
  }

  toggleWidth() {
    this.isExpand = !this.isExpand;
    this.cdredf.detectChanges();
  }

  ngOnInit() {
    this.bibleService.isElement.next(true);
    this.bibles$ = this.bibleService.getBibles();
  }

  goTo(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
