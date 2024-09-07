import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '@app/interfaces/i-category';
import { CategoryService } from '@app/services/category.service';
import { Subscription } from 'rxjs';
import { bibleChapters } from './bibleChapters';
import { ICategoryVerse } from '@app/interfaces/i-category-verse';

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
    MatTooltipModule
  ],
  templateUrl: './bible-category.component.html',
  styleUrl: './bible-category.component.scss'
})
export class BibleCategoryComponent implements OnInit, AfterViewInit, OnDestroy {

  route = inject(ActivatedRoute);
  router = inject(Router);


  scroll(element: HTMLSpanElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  goTo(url: string, id: number) {
    if (id > -1)
      this.router.navigate([url, id], { relativeTo: this.route });
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

  ngOnInit() { }

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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

