import { AfterViewInit, Component, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { bibleChapters } from '@app/bible/bible-category/bibleChapters';
import { ICategory } from '@app/interfaces/i-category';
import { ICategoryVerse } from '@app/interfaces/i-category-verse';
import { CategoryService } from '@app/services/category.service';

@Component({
  selector: 'app-export-data',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './export-data.component.html',
  styleUrl: './export-data.component.scss'
})
export class ExportDataComponent implements AfterViewInit {

  data: ICategoryVerse[] = bibleChapters;
  categories: ICategory[] = [];

  categoryService = inject(CategoryService);

  ngAfterViewInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  exportToCsv() {
    let exp = this.categories;
    console.log('ExportDataComponent.exportToCsv', exp);
    const columns = this.getColumns(exp);
    const csvData = this.convertToCsv(exp, columns);
    this.downloadFile(csvData, 'export.csv', 'text/csv');
  }
  getColumns(exp: any[]): string[] {

    let columns: string[] = [];

    exp.forEach(row => {
      Object.keys(row).forEach(col => {
        if (!columns.includes(col))
          columns.push(col);
      })
    })
    return columns
  }

  convertToCsv(data: any[], columns: string[]): string {
    let csv = '';
    csv += columns.join(',') + '\n';
    data.forEach((row) => {
      let values: string[] = [];
      columns.forEach((col, index) => {
        let value = row[col];
        if (index === 1) {
          value = row[col] === 0 ? '구약' : '신약';
        }
        if (row)
          values.push(value);
      });
      csv += values.join(',') + '\n';
    });
    return csv;
  }

  downloadFile(data: string, filename: string, type: string) {
    const blob = new Blob([data], { type: type });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
