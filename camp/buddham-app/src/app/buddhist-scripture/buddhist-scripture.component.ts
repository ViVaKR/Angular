import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BuddistScriptureService } from '@app/services/buddist-scripture.service';
import { BuddhistScripture } from '@app/types/buddist-scripture';
import { Observable } from 'rxjs';
import { BuddhistScriptureCreateComponent } from '@app/buddhist-scripture/buddhist-scripture-create/buddhist-scripture-create.component';
import { BuddhistScriptureDetailComponent } from '@app/buddhist-scripture/buddhist-scripture-detail/buddhist-scripture-detail.component';
import { BuddhistScriptureEditComponent } from '@app/buddhist-scripture/buddhist-scripture-edit/buddhist-scripture-edit.component';
import { BuddhistScriptureDeleteComponent } from '@app/buddhist-scripture/buddhist-scripture-delete/buddhist-scripture-delete.component';

@Component({
  selector: 'app-buddhist-scripture',
  standalone: true,
  imports: [
    AsyncPipe, // (추가) @for loop async pipe
    RouterLink, // (추가) router link directive
    BuddhistScriptureCreateComponent, // (추가) 경전 생성 컴포넌트
    BuddhistScriptureDetailComponent, // (추가) 경전 상세 컴포넌트
    BuddhistScriptureEditComponent, // (추가) 경전 수정 컴포넌트
    BuddhistScriptureDeleteComponent // (추가) 경전 삭제 컴포넌트
  ],
  templateUrl: './buddhist-scripture.component.html',
  styleUrl: './buddhist-scripture.component.scss'
})
export class BuddhistScriptureComponent implements OnInit, AfterViewInit {

  // sutras$!: Observable<BuddhistScripture[]>;
  // service = inject(BuddistScriptureService);

  sutras$!: BuddhistScripture[];


  constructor(private service: BuddistScriptureService) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.service.getScriptures().subscribe({
      next: (data) => {
        this.sutras$ = data;
      },
      error: (error) => {
        console.error(error);
      }

    });
  }

}
