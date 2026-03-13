import { Component, DOCUMENT, inject, isDevMode, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderService } from '@core/services/loader-service';
import { Loading } from "./shared/components/loading/loading";
import { Footer } from "./shared/footer/footer";
import { AsyncPipe } from '@angular/common';
import { Menus } from './shared/menus/menus';
import { UiService } from './core/services/ui-service';
import { MatIconModule } from "@angular/material/icon";
import { MatBottomSheetModule, } from '@angular/material/bottom-sheet';
import { filter } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '@env/environment.development';
import { Breadcrumb } from "./shared/breadcrumb/breadcrumb";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Menus,
    Loading,
    Footer,
    AsyncPipe,
    MatIconModule,
    MatBottomSheetModule,
    MatButtonModule,
    Breadcrumb
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: []
})
export class App implements OnInit {

  private document = inject(DOCUMENT);

  private loader = inject(LoaderService);
  private uiService = inject(UiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loading = this.loader.loading$;
  showbar = this.uiService.showbar$;

  show = signal(false);
  private readonly kakaoSdk = 'kakao-sdk';

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRouteData();
    });

    this.injectKakaoSdk();
  }

  private injectKakaoSdk(): void {
    if (this.document.getElementById(this.kakaoSdk)) return;

    const script = this.document.createElement('script');
    script.id = this.kakaoSdk;
    script.src = `https://t1.kakaocdn.net/kakao_js_sdk/${environment.kakaoSdkVersion}/kakao.min.js`;
    script.integrity = environment.kakaoSdkIntegrity;
    script.crossOrigin = 'anonymouse';

    // ── 🔥 성공 ──────────────────────────────────────
    script.onload = () => {
      const kakao = (window as any).Kakao;
      if (!kakao) {
        this.logKakao('error', 'Kakao 객체가 window에 없습니다.');
        return;
      }
      try {
        kakao.init(environment.kakaoAppKey);

        // 초기화 성공 여부는 kakao.isInitialized() 공식 확인
        if (kakao.isInitialized()) {
          this.logKakao('success', `SDK 초기화 성공 (v${environment.kakaoSdkVersion})`);
        } else {
          this.logKakao('error', '초기화 실패 - App Key를 확인하세요.');
        }
      } catch (err) {
        this.logKakao('error', `초기화 중 예외 발생: ${err}`);
      }
    };

    // ── 🔥 실패 (네트워크 오류, integrity 불일치 등) ──
    script.onerror = () => {
      this.logKakao('error', 'SDK 스크립트 로드 실패 - 네트워크 또는 integrity 값을 확인하세요.');
    }

    this.document.head.appendChild(script);

  }

  private checkRouteData() {
    let route = this.route;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const showBar = route.snapshot.data['showBar'] ?? false;
    if (showBar) {
      this.uiService.showbar();
    } else {
      this.uiService.hidebar();
    }
  }

  toggleMenu() {
    this.show.update(v => !v);
    this.uiService.toggleLeft();
  }

  // ── 🔥 개발 모드에서만 출력되는 로거 ─────────────────
  private logKakao(type: 'success' | 'error', message: string): void {
    if (!isDevMode()) return; // 프로덕션에서는 완전 무시

    const prefix = '[KakaoSDK]';

    if (type === 'success') {
      console.log(
        `%c${prefix} ${message}`,
        'color: #FEE500; background: #3C1E1E; padding: 2px 6px; border-radius: 4px; font-weight: bold;'
      );
    } else {
      console.error(`${prefix} ❌ ${message}`);
    }
  }
}
