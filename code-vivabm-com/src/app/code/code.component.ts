import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
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
import { DataListComponent } from '@app/common/data-list/data-list.component';
import { DataService } from '@app/services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ScrollArrowComponent } from "../common/scroll-arrow/scroll-arrow.component";

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
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    ScrollArrowComponent,
    ScrollArrowComponent
  ],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy {

  readonly panelOpenState = signal(false);

  categoryService = inject(CategoryService);
  codeService = inject(CodeService);
  snackbar = inject(MatSnackBar);
  codeSubscription!: Subscription;
  codes$!: Observable<ICode[]>;
  sortedCategories$!: Observable<ICategory[]>;
  dataService = inject(DataService);
  currentKey: string = '';
  myIp = '0.0.0.0';
  isEmailConfirmed: boolean = false;
  message = '(코드목록) + 코드작성은 회원가입후 로그인 프로파일 메뉴에서 이메일 인증 필요합니다.';

  @ViewChild('target') target!: HTMLDivElement;
  @ViewChild(DataListComponent) dataList!: DataListComponent;

  private minWidth: number = 1024;

  leftMenuClassMobile = {
    "flex": true,
    "flex-col": true,
    "justify-start": true,
    "col-span-3": true,
    "order-2": true,
  }
  leftMenuClass = {
    "flex": true,
    "flex-col": true,
    "justify-start": true,
  }

  outletClass = {
    "overflow-x-auto": true,
    "col-span-2": true,
    "relative": true,
  }

  outletClassMobile = {
    "overflow-x-auto": true,
    "col-span-3": true,
    "relative": true,
    "order-1": true,
  }

  windowWidth: number = window.innerWidth;
  isMobile: boolean = this.windowWidth < this.minWidth;

  set setIsMobile(value: boolean) {
    this.isMobile = value;
  }
  get getIsMobile(): boolean {
    return this.isMobile;
  }

  topClass = {
    'flex-none': true,
    'w-full': false,
    'mx-4': true,
    'my-8': true
  }

  leftClass = {
    'flex': true,
    'w-[300px]': true,
    'mx-4': true,
    'my-8': true
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.setIsMobile = event.target.innerWidth <= this.minWidth;
    // this.cdref.detectChanges();
  }

  constructor(private router: Router,
    public route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.codeService.isElement.next(true);

    this.sortedCategories$ = this.categoryService.getCategories().pipe(
      map(categories => categories.sort((a, b) => a.name.localeCompare(b.name)))
    );

    this.codeSubscription = this.codeService.subject.subscribe(x => this.codes$ = of(x));

    // 업데이트시에도 코드 목록을 다시 불러온다데
    this.codeService.isUpdated.subscribe(x => {
      this.codes$ = this.codeService.getCodes();
    });

    // 삭제시 코드 목록을 다시 불러온다.
    this.codeService.isDeleted.subscribe(x => {
      this.codes$ = this.codeService.getCodes();
    });

    if (this.authService.isLoggedIn()) {
      this.authService.getDetail().subscribe({
        next: (x) => this.isEmailConfirmed = x.emailConfirmed,
        error: (_) => this.isEmailConfirmed = false
      });
    } else {
      this.isEmailConfirmed = false;
    }

    // 공인 아이피 주소를 가져온다.
    this.codeService.publicIPAddress.subscribe((ip: string) => { this.myIp = ip; });
  }

  ngAfterViewInit(): void {
    this.isMobile = this.windowWidth < this.minWidth;
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  goTo(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }

  goNavigateRead(id: number, userId: string) {
    this.router.navigate(['CodeRead'], { relativeTo: this.route, queryParams: { id: id, userId: userId } });
  }

  toggleWidth() {
    this.setIsMobile = !this.getIsMobile;
  }

  ngOnDestroy() {
    if (this.codeSubscription) {
      this.codeSubscription.unsubscribe();
    }
  }
}
