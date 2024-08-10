import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterContentChecked, ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ICode } from '@app/interfaces/i-code';
import { CodeService } from '@app/services/code.service';
import { map, Observable, Subscription } from 'rxjs';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { CategoryService } from '@app/services/category.service';
import { ICategory } from '@app/interfaces/i-category';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterOutlet,
    NgIf,
    NgFor,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatTooltipModule
  ],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent implements OnInit, AfterContentChecked, OnDestroy {

  readonly panelOpenState = signal(false);


  categoryService = inject(CategoryService);

  codeService = inject(CodeService);

  snackbar = inject(MatSnackBar);

  // readonly alphabets = Alphabet.sort((a, b) => a.letter.localeCompare(b.letter));

  codeSubscription!: Subscription;

  codes$!: Observable<ICode[]>;

  isExpand: boolean = false;

  currentKey: string = '';

  @ViewChild('target') target!: HTMLDivElement;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isExpand = this.isExpand = event.target.innerWidth < 768;
    this.cdredf.detectChanges();
  }

  constructor(private router: Router,
    public route: ActivatedRoute,
    private cdredf: ChangeDetectorRef,
  ) { }


  sortedCategories$!: Observable<ICategory[]>;

  ngOnInit(): void {
    this.sortedCategories$ = this.categoryService.getCategories().pipe(
      map(categories => categories.sort((a, b) => a.name.localeCompare(b.name)))
    );
    this.codes$ = this.codeService.getCodes();
  }

  ngAfterContentChecked() {
    this.cdredf.detectChanges();
  }

  scroll(el: HTMLDivElement) {
    el.scrollIntoView();
  }

  goTo(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }

  toggleWidth() {
    this.isExpand = !this.isExpand;
  }

  goNavigateRead(id: number) {
    //
  }

  ngOnDestroy() {
    if (this.codeSubscription) {
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
      'row-start-1': true,
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
