import { Component, inject, OnChanges, OnDestroy, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';

import { BuddhaService } from '@app/services/buddha.service';
import { BuddistScripture } from '@app/types/buddist-scripture';
import { Observable, of, Subscription } from 'rxjs';

import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { HangulOrderArray } from '@app/types/hangul-order';
import { BuddhistScriptureReadComponent } from './buddhist-scripture-read/buddhist-scripture-read.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buddha',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    AllMatModule
  ],
  templateUrl: './buddha.component.html',
  styleUrl: './buddha.component.scss'
})
export class BuddhaComponent implements OnInit, OnDestroy {


  readonly panelOpenState = signal(false);
  readonly kors = HangulOrderArray.sort((a, b) => a.key.localeCompare(b.key));
  service = inject(BuddhaService);
  sutras$!: Observable<BuddistScripture[]>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public read: BuddhistScriptureReadComponent,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.sutras$ = this.service.getScriptures();

    // Read 에서 삭제시 이벤트를 받아온다. (목록 갱신용)
    this.service.subject.subscribe(x => this.sutras$ = of(x));
  }

  demo() {
    this.read.onDelete();
  }


  goNavigate(id: number) {
    this.router.navigate(['BuddistScriptureRead'], { relativeTo: this.route, queryParams: { id } });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy() {
  }

  isExpand = false;
  menuIcon = 'expand_content'
  onExpand() {
    this.isExpand = !this.isExpand;
    this.menuIcon = this.isExpand ? 'collapse_content' : 'expand_content';

  }

  mainClass = {
    'grid': true,
    'grid-cols-5': true,
    "grid-cols-[150px_1fr_1fr_1fr_1fr]": false,
  }

  isScale = false;

  onScale() {
    this.isScale = !this.isScale;
    this.mainClass = {
      "grid": true,
      "grid-cols-5": !this.isScale,
      "grid-cols-[150px_1fr_1fr_1fr_1fr]": this.isScale,
    }
  }
}

/*
<span class="material-symbols-outlined">
fit_width
</span>
<span class="material-symbols-outlined">
width
</span>

*/
