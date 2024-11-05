import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../interfaces/i-category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryModel } from './category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit, OnDestroy {

  categoryService = inject(CategoryService)

  snackBar = inject(MatSnackBar)

  categories!: ICategory[];

  categoryModelService = inject(CategoryModel);

  constructor() {
    this.categoryModelService.addCategory({ id: 1, name: "CSharp" });
    this.categoryModelService.addCategory({ id: 2, name: "ASP.NET Core" });
    this.categoryModelService.addCategory({ id: 3, name: "JavaScript" });
    this.categoryModelService.addCategory({ id: 4, name: "Angular" });
    this.categoryModelService.addCategory({ id: 5, name: "Node.Js" });
    this.categoryModelService.addCategory({ id: 6, name: "Blazor" });
    this.categoryModelService.addCategory({ id: 7, name: "Rust" });
    this.categoryModelService.addCategory({ id: 8, name: "PowerShell" });
    this.categoryModelService.addCategory({ id: 9, name: "Shell" });
    this.categoryModelService.addCategory({ id: 10, name: "C" });
    this.categoryModelService.addCategory({ id: 11, name: "C++" });
    this.categoryModelService.addCategory({ id: 12, name: "R" });
    this.categoryModelService.addCategory({ id: 13, name: "Python" });
    this.categoryModelService.addCategory({ id: 14, name: "Java" });
    this.categoryModelService.addCategory({ id: 15, name: "Flutter" });
    this.categoryModelService.addCategory({ id: 16, name: "Go" });
    this.categoryModelService.addCategory({ id: 17, name: "HTML" });
    this.categoryModelService.addCategory({ id: 18, name: "CSS" });
    this.categoryModelService.addCategory({ id: 19, name: "MSSQL" });
    this.categoryModelService.addCategory({ id: 20, name: "PostgreSQL" });
    this.categoryModelService.addCategory({ id: 21, name: "Git" });
    this.categoryModelService.addCategory({ id: 22, name: "Docker" });
    this.categoryModelService.addCategory({ id: 23, name: "Assembly" });
    this.categoryModelService.addCategory({ id: 24, name: "NginX" });
    this.categoryModelService.addCategory({ id: 25, name: "TypeScript" });
    this.categoryModelService.addCategory({ id: 26, name: "VBA" });
    this.categoryModelService.addCategory({ id: 27, name: "Swift" });
    this.categoryModelService.addCategory({ id: 28, name: "MAUI" });
    this.categoryModelService.addCategory({ id: 29, name: "NameServer" });
    this.categoryModelService.addCategory({ id: 30, name: "Dart" });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe({
      next: (categories: ICategory[]) => {
        this.categories = categories;
      },
      error: (err: any) => this.snackBar.open(`오류: ${err.error}`, '확인',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
    });
  }

}
