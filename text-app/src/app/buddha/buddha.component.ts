import { AfterViewInit, Component, inject, OnChanges, OnDestroy, OnInit, signal } from '@angular/core';
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
}
