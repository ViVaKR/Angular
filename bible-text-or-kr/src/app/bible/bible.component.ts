import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ICategory } from '@app/interfaces/i-category';
import { BibleService } from '@app/services/bible.service';
import { CategoryService } from '@app/services/category.service';
import { BibleListComponent } from "./bible-list/bible-list.component";
import { BibleCategoryComponent } from "./bible-category/bible-category.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { Observable, Subscription } from 'rxjs';
import { IBible } from '@app/interfaces/i-bible';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IResponse } from '@app/interfaces/i-response';

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
    MatButtonModule
  ],
  templateUrl: './bible.component.html',
  styleUrl: './bible.component.scss'
})
export class BibleComponent implements OnInit, OnDestroy {

  readonly panelOpenState = signal(false);

  categoryService = inject(CategoryService);
  bibleService = inject(BibleService);
  snackBar = inject(MatSnackBar);

  subscription!: Subscription;
  bibles$: Observable<IBible[]> | undefined;


  ngOnInit() {
    // this.subscription = this.bibleService.getBibles().subscribe({
    //   next: (data) => {
    //     this.bibles$ = data;
    //   }
    // });

    this.bibles$ = this.bibleService.getBibles();


  }

  bible: IBible = {
    id: 5,
    categoryId: 1,
    chapter: 1,
    verse: 4,
    textKor: '하나님이 빛이 좋다 하시니 하나님이 빛과 어둠을 나누시니라',
    textEng: 'God saw that the light was good, and he separated the light from the darkness.',
    note: '데모 노트',
    comments: '데모 코멘트',
    category: null
  };

  postBibleData() {

    this.bibleService.postBible(this.bible).subscribe({
      next: (data: IResponse) => {
        if (data.isSuccess) {
          this.bibles$ = this.bibleService.getBibles();
          this.snackBar.open(data.message, '닫기');
        } else {
          this.snackBar.open("알수 없는 이유로 데이터 저장에 실패하였습니다.", '닫기');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.message + "====", '닫기');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
