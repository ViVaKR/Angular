import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject, Input, OnDestroy, signal, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '@app/interfaces/i-category';
import { CategoryService } from '@app/services/category.service';
import { Subscription } from 'rxjs';
import { ScrollArrowComponent } from '@app/scroll-arrow/scroll-arrow.component';
import { BibleListComponent } from '../bible-list/bible-list.component';
import { BibleService } from '@app/services/bible.service';
import { bibleChapters } from './bibleChapters';

@Component({
  selector: 'app-bible-category',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatGridListModule,
    CommonModule,
    NgFor,
    NgIf,
    MatIconModule,
    MatTooltipModule,
    ScrollArrowComponent
  ],

  templateUrl: './bible-category.component.html',
  styleUrl: './bible-category.component.scss'
})
export class BibleCategoryComponent implements AfterViewInit, OnDestroy {

  verseArray = bibleChapters;

  @Input() isExpanded!: boolean;
  @ViewChild('BibleListComponent') bibleList!: BibleListComponent;

  bibleService = inject(BibleService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  scroll(element: HTMLSpanElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  goTo(url: string, id: number) {
    if (id > -1)
      this.router.navigate([url], { relativeTo: this.route, queryParams: { id: id } });
    else
      this.router.navigate([url], { relativeTo: this.route });
  }

  temp = 10;

  readonly panelOpenState = signal(false);
  categoryService = inject(CategoryService);
  snackBar = inject(MatSnackBar);

  categories!: ICategory[];
  subscription!: Subscription;
  currentKey: any;

  constructor() {

    console.log('current route', this.router.url);
  }
  ngAfterViewInit(): void {

    this.subscription = this.categoryService.getCategories().subscribe({
      next: (categories: ICategory[]) => {
        this.categories = categories;
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open('Error loading categories ' + error.message, '닫기');
      }
    });
  }

  filterBibleList(id: number, chapter: number) {
    if (this.router.url !== '/Bible/BibleList') {
      this.snackBar.open('바이블 목록으로 이동후 사용하여 주세요.', '닫기');
      return;
    }
    this.bibleService.nextFilter({ id: id, chapter: chapter });
  }

  getVerseCount(id: number, index: number): number {
    let verseCount = this.verseArray.filter(x => x.id === id).map(x => x.verses)[0][index];
    return verseCount;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

