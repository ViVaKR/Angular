import { Component, inject, ChangeDetectorRef, OnDestroy, OnInit, signal, HostListener, ViewChild } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

import { BuddhaService } from '@app/services/buddha.service';
import { BuddistScripture } from '@app/types/buddist-scripture';
import { Observable, of, Subscription } from 'rxjs';

import { AllMatModule } from '@app/materials/all-mat/all-mat.module';
import { HangulOrderArray } from '@app/types/hangul-order';
import { BuddhistScriptureReadComponent } from './buddhist-scripture-read/buddhist-scripture-read.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GotoLoginComponent } from "../common/goto-login/goto-login.component";
import { AuthService } from '@app/services/auth.service';
import { DataListComponent } from '@app/common/data-list/data-list.component';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'app-buddha',
  standalone: true,
  imports: [
    AsyncPipe,
    AllMatModule,
    RouterLink,
    RouterOutlet,
    GotoLoginComponent,
    NgIf,
    DataListComponent
  ],
  templateUrl: './buddha.component.html',
  styleUrl: './buddha.component.scss'
})
export class BuddhaComponent implements OnInit, OnDestroy {

  readonly panelOpenState = signal(false);
  readonly kors = HangulOrderArray.sort((a, b) => a.key.localeCompare(b.key));

  service = inject(BuddhaService);
  authService = inject(AuthService);

  isEmailConfirmed: boolean = false;

  sutras$!: Observable<BuddistScripture[]>;

  sutraSubscription!: Subscription;
  isExpand: boolean = false;
  currentKey: string = '';

  @ViewChild('target') target!: HTMLDivElement;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 1024) { // lg
      this.isExpand = true;
    } else {
      this.isExpand = false;
    }
  }

  dataService = inject(DataService);

  constructor(private router: Router,
    public route: ActivatedRoute,
    public read: BuddhistScriptureReadComponent,
    private cdredf: ChangeDetectorRef,
    private snackBar: MatSnackBar) {

    this.dataService.hangulKey$.subscribe(x => {
      this.currentKey = x;
    });
  }

  scroll(el: HTMLDivElement) {
    el.scrollIntoView();
  }

  ngAfterContentChecked() {
    this.cdredf.detectChanges();
  }

  ngOnInit(): void {
    this.sutras$ = this.service.getScriptures();

    // Read 에서 삭제시 이벤트를 받아온다. (목록 갱신용)
    this.sutraSubscription = this.service.subject.subscribe(x => this.sutras$ = of(x));

    this.service.isUpdated.subscribe(x => {
      if (x) {
        this.sutras$ = this.service.getScriptures();
      }
    });

    this.authService.getDetail().subscribe({
      next: (result) => {
        this.isEmailConfirmed = result.emailConfirmed;
      },
      error: (error) => {
        this.isEmailConfirmed = false;
        this.snackBar.open(`${error.error.message}`, '확인', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      }
    });
  }

  goNavigateList() {
    this.router.navigate(['BuddhistScriptureList'], { relativeTo: this.route });
  }

  goNavigateCreate() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['SignIn']);
    } else {
      this.router.navigate(['BuddhistScriptureCreate'], { relativeTo: this.route });
    }
  }

  goNavigateRead(id: number) {
    this.router.navigate(['BuddhistScriptureRead'], { relativeTo: this.route, queryParams: { id } });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  toggleWidth() {
    this.isExpand = !this.isExpand;
  }

  leftMenuClasses = [
    {
      'grid-start-1': true,
      'h-screen': true,
      'col-start-1': true,
      'p-4': true,
      'ml-2': true,
      'mt-2': true
    },
    {
      'grid-start-1': true,
      'col-span-5': true,
      'h-auto': true,
      'col-start-1': true,
      'p-4': true,
      'ml-2': true,
      'mt-2': true
    }
  ]

  bodyClasses = [
    { // 확장되었을때.
      'row-start-2': true,
      'col-start-1': true,
      'col-span-5': true,
      'pl-2': true,
      'pr-8': true,
      'w-full': true,
    },
    { // 축소되었을때.
      'row-start-1': true,
      'col-start-2': true,
      'col-span-4': true,
      'pl-2': true,
      'pr-8': true,
      'w-full': true,
    }
  ]

  ngOnDestroy() {
    if (this.sutraSubscription) {
      this.sutraSubscription.unsubscribe();
    }
  }
}
