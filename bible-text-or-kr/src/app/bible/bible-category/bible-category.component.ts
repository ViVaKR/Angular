import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from '@app/interfaces/i-category';
import { CategoryService } from '@app/services/category.service';
import { Subscription } from 'rxjs';

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
    MatIconModule
  ],
  templateUrl: './bible-category.component.html',
  styleUrl: './bible-category.component.scss'
})
export class BibleCategoryComponent implements OnInit, OnDestroy {
  goTo(url: string, id: number) {
    console.log(url, id);
  }

  temp = 10;

  readonly panelOpenState = signal(false);
  categoryService = inject(CategoryService);
  snackBar = inject(MatSnackBar);

  categories!: ICategory[];
  subscription!: Subscription;
  currentKey: any;

  ngOnInit() {
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
