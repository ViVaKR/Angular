import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, isDevMode, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoadingCircleComponent } from '@app/common/loading-circle/loading-circle.component';
import { IFileInfo } from '@app/interfaces/i-file-info';
import { AuthService } from '@app/services/auth.service';
import { CodeService } from '@app/services/code.service';
import { FileManagerService } from '@app/services/file-manager.service';

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
    JsonPipe
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit, AfterViewInit {

  title = "Code";
  defaultImage = '/login-icon.png';

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  router = inject(Router);
  codeService = inject(CodeService);
  authService = inject(AuthService);
  fileService = inject(FileManagerService);
  dialog = inject(MatDialog);

  userAvata: WritableSignal<string> = signal(this.defaultImage);

  isAdmin: boolean = false;
  isDev: boolean;
  isLoggedIn: boolean = this.authService.isLoggedIn();
  id: number | null | undefined;

  userDetail: {
    id: number,
    fullName: string,
    email: string,
    roles: string[]
  } | null = this.authService.getUserDetail();

  constructor() {

    this.isDev = isDevMode();
    this.authService.isSignIn.subscribe({
      next: (res) => {
        if (res) {
          this.isLoggedIn = res;
          this.id = this.authService.getUserDetail()?.id;
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
    this.authService.isAdmin().subscribe({
      next: (res) => this.isAdmin = res,
      error: (_) => this.isAdmin = false
    });

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

  }

  ngAfterViewInit(): void {
    this.authService.isSignIn.subscribe({
      next: (res) => this.isLoggedIn = res,
      error: (_) => this.isLoggedIn = false
    });

    this.authService.isAdmin().subscribe({
      next: (res) => this.isAdmin = res,
      error: (_) => this.isAdmin = false
    });

    this.loadAvata();
  }

  loadAvata(): void {
    this.fileService.getUserImage().subscribe({
      next: (data: IFileInfo) => {
        if (data.dbPath === null || data.dbPath === undefined || data.dbPath === '-' || data.dbPath === '') {
          this.userAvata.set(this.defaultImage);
          return;
        }
        this.userAvata.set(this.createImagePath(`${this.authService.getUserDetail()?.id}_${data.dbPath}`));
      },
      error: (_) => {
        this.userAvata.set(this.defaultImage)
      }
    });
  }

  createImagePath(fileName: string | null | undefined) {
    return `${this.codeService.baseUrl}/images/${fileName}`;
  }

  goToProfile() {
    this.router.navigate(['/Profile'], {
      queryParams: { id: this.id }
    });
  }

  goToLink(url: string, id: number | null) {
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
