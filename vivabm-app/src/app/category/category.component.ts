import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../interfaces/i-category';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  categoryService = inject(CategoryService)
  snackBar = inject(MatSnackBar)

  categories!: ICategory[];

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe({
      next: (categories: ICategory[]) => {
        this.categories = categories;
      },
      error: (err: any) => this.snackBar.open('오류: ' + err, '확인',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
    });
  }

}
