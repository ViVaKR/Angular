import { JsonPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, inject, isDevMode, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoadingCircleComponent } from '@app/common/loading-circle/loading-circle.component';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { IMenu } from '@app/interfaces/i-menu';
import { ActionService } from '@app/services/action.service';
import { AuthService } from '@app/services/auth.service';
import { CodeService } from '@app/services/code.service';
import { FileManagerService } from '@app/services/file-manager.service';
import { LoadingService } from '@app/services/loading.service';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatMenuModule,
    MatIconModule,
    NgIf,
    NgFor,
    JsonPipe,
    UpperCasePipe,
    MatProgressBarModule
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit, AfterViewInit {

  title = "Code";
  defaultImage = '/login-icon.png';

  router = inject(Router);
  codeService = inject(CodeService);
  authService = inject(AuthService);
  fileService = inject(FileManagerService);
  dialog = inject(MatDialog);
  actionService = inject(ActionService);
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  isLoggedIn: boolean = this.authService.isLoggedIn();
  id: number | null | undefined;
  isLoading: boolean = false;

  menus: IMenu[] = [
    { id: 1, title: "코드조각", url: "/Code", icon: "code", param: true },
    { id: 2, title: "문서", url: "/Doc", icon: "account_circle", param: this.isLoggedIn ? true : false },
    { id: 2, title: "질문과답변", url: "/ChatClient", icon: "code", param: true },

  ];

  solutions: IMenu[] = [
    { id: 1, title: "Chat", url: "/VivChat", icon: "folder", param: true },
    { id: 2, title: "ReadDocument", url: "/Read-Document", icon: "folder", param: true },
    { id: 3, title: "Ball TransForm", url: "/BallTransForm", icon: "folder", param: this.isLoggedIn ? true : false },
    { id: 4, title: "PlayGround", url: "/PlayGround", icon: "folder", param: this.isLoggedIn ? true : false },
    { id: 5, title: "Markdown", url: "/Readme", icon: "folder", param: this.isLoggedIn ? true : false },

  ]


  userAvata: WritableSignal<string> = signal(this.defaultImage);

  isAdmin: boolean = false;
  isDev: boolean;

  userDetail: {
    id: number,
    fullName: string,
    email: string,
    roles: string[]
  } | null = this.authService.getUserDetail();

  constructor() {
    this.actionService.loading$.subscribe({
      next: (loading) => {
        this.isLoading = loading;
      },
      error: (_) => {
        this.isLoading = false;
      }
    });

    this.isDev = isDevMode();
    this.authService.isSignIn.subscribe({
      next: (res) => {
        if (res) {
          this.isLoggedIn = res;
          this.id = this.authService.getUserDetail()?.id;
          if (this.isLoggedIn)
            this.loadAvata();
        } else {
          this.isLoggedIn = false;
          this.id = null;
        }
      },
      error: (_) => {
        this.isLoggedIn = false;
        this.id = null;
      }
    });
  }

  ngOnInit(): void {

    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn)
      this.loadAvata();
    this.authService.isAdmin().subscribe({
      next: (res) => this.isAdmin = res,
      error: (_) => this.isAdmin = false
    });

    if (this.isLoggedIn) {
      this.fileService.getAvata.subscribe({
        next: (fileInfo: IFileInfo) => {
          if (fileInfo.dbPath === null || fileInfo.dbPath === undefined || fileInfo.dbPath === '-' || fileInfo.dbPath === '') {
            this.userAvata.set(this.defaultImage);
            return;
          }
          this.userAvata.set(this.createImagePath(`${fileInfo.dbPath}`));
        },
        error: (_) => {
          this.userAvata.set(this.defaultImage)
        }
      });
    } else {
      this.userAvata.set(this.defaultImage);
    }
  }

  ngAfterViewInit(): void {
    this.authService.isSignIn.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
        if (this.isLoggedIn)
          this.loadAvata();
      },
      error: (_) => this.isLoggedIn = false
    });

    this.authService.isAdmin().subscribe({
      next: (res) => this.isAdmin = res,
      error: (_) => this.isAdmin = false
    });
  }

  loadAvata(): void {

    if (this.isLoggedIn) {
      this.fileService.getUserImage().subscribe({
        next: (data: IFileInfo) => {
          if (data.dbPath === null || data.dbPath === undefined || data.dbPath === '-') {
            this.userAvata.set(this.defaultImage);
            return;
          }
          this.userAvata.set(this.createImagePath(`${this.authService.getUserDetail()?.id}_${data.dbPath}`));
        },
        error: (_) => {
          this.userAvata.set(this.defaultImage)
        }
      });
    } else {
      this.userAvata.set(this.defaultImage);
    }
  }

  createImagePath(fileName: string | null | undefined) {
    return `${this.codeService.baseUrl}/images/${fileName}`;
  }

  goToProfile() {
    this.router.navigate(['/Profile'], {
      queryParams: { id: this.id }
    });
  }

  loadingService = inject(LoadingService);

  goToLink(url: string, id: number | null) {
    // this.actionService.nextLoading(true);
    // this.loadingService.loadingOn();
    if (id === null) {
      this.router.navigate([url]);
    } else {
      this.router.navigate([url], {
        queryParams: { id: id }
      });
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LoadingCircleComponent, {
      width: '250px',
      height: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        message: 'Please wait...'
      },
    });
  }

  signOut() {
    this.authService.signOut();
  }
}
