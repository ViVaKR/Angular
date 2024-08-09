import { AsyncPipe, NgIf } from '@angular/common';
import { AfterContentChecked, ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ICode } from '@app/interfaces/i-code';
import { CodeService } from '@app/services/code.service';
import { Observable, Subscription } from 'rxjs';
import { Alphabet } from './alphabet';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterOutlet,
    NgIf,

  ],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent implements OnInit, AfterContentChecked, OnDestroy {

  codeService = inject(CodeService);
  snackbar = inject(MatSnackBar);

  readonly alphabet = Alphabet.sort((a, b) => a.letter.localeCompare(b.letter));

  codeSubscription!: Subscription;

  code$!: Observable<ICode[]>;
  isExpand: boolean = false;
  currentKey: string = '';

  @ViewChild('target') target!: HTMLDivElement;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isExpand = this.isExpand = event.target.innerWidth > 1024;
    this.cdredf.detectChanges();
  }

  constructor(private router: Router,
    public route: ActivatedRoute,
    private cdredf: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.code$ = this.codeService.getCodes();
  }

  ngAfterContentChecked() {
    this.cdredf.detectChanges();
  }

  scroll(el: HTMLDivElement) {
    el.scrollIntoView();
  }

  ngOnDestroy() {
    if (this.code$) {
      this.codeSubscription.unsubscribe();
    }
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
  ];
}
