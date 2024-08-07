import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Category } from '@app/models/category';
import { CategoryService } from '@app/services/category.service';
import { MessageService } from '@app/services/message.service';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent implements OnInit {

  isExpand: boolean = false;
  toggleWidth() {
    this.isExpand = !this.isExpand;
  }


  categoryService = inject(CategoryService);
  messageService = inject(MessageService);

  categories!: Category[];

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      }, error: (error) => {
        this.messageService.openSnackBar(error.error.message);
      }
    });
  }
}
