import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterContentChecked, ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ICode } from '@app/interfaces/i-code';
import { CodeService } from '@app/services/code.service';
import { map, Observable, of, Subscription } from 'rxjs';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { CategoryService } from '@app/services/category.service';
import { ICategory } from '@app/interfaces/i-category';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '@app/services/auth.service';

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
export class CodeComponent implements OnInit, OnDestroy {

  readonly panelOpenState = signal(false);

  categoryService = inject(CategoryService);
  codeService = inject(CodeService);
  snackbar = inject(MatSnackBar);
  codeSubscription!: Subscription;

  codes$!: Observable<ICode[]>;
  sortedCategories$!: Observable<ICategory[]>;

  isExpand: boolean = false;
  windowWidth: number = window.innerWidth;

  currentKey: string = '';
  myIp = '0.0.0.0';

  isEmailConfirmed: boolean = false;

  @ViewChild('target') target!: HTMLDivElement;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.isExpand = event.target.innerWidth < 1280;
    this.cdredf.detectChanges();
  }

  constructor(private router: Router,
    public route: ActivatedRoute,
    private cdredf: ChangeDetectorRef,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    this.isExpand = window.innerWidth < 1280;

    this.sortedCategories$ = this.categoryService.getCategories().pipe(
      map(categories => categories.sort((a, b) => a.name.localeCompare(b.name)))
    );
    this.codes$ = this.codeService.getCodes();

    this.codeSubscription = this.codeService.subject.subscribe(x => this.codes$ = of(x));

    // 업데이트시에도 코드 목록을 다시 불러온다데
    this.codeService.isUpdated.subscribe(x => {
      this.codes$ = this.codeService.getCodes();
    });

    // 삭제시 코드 목록을 다시 불러온다.
    this.codeService.isDeleted.subscribe(x => {
      this.codes$ = this.codeService.getCodes();
    });

    // 이메일 인증 여부를 확인한다.
    this.authService.getDetail().subscribe({
      next: (x) => {
        this.isEmailConfirmed = x.emailConfirmed;
      },
      error: (_) => {
        this.isEmailConfirmed = false;
      }
    });
  }

  // ngAfterContentChecked() {
  //   this.cdredf.detectChanges();
  // }

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
    this.router.navigate(['CodeRead'], { relativeTo: this.route, queryParams: { id: id } });
  }

  ngOnDestroy() {
    if (this.codeSubscription) {
      this.codeSubscription.unsubscribe();
    }
  }

}
