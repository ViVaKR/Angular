import { inject, Injectable, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { TokenStorage } from '../token-storage';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatConnectionService implements OnDestroy {

  private connection!: HubConnection;
  private initialized = false;
  private tokenStorage = inject(TokenStorage);
  private authServer = inject(AuthService);
  private router = inject(Router);

  // 상태 관리
  public readonly state = signal<HubConnectionState>(HubConnectionState.Disconnected);

  // 재연결 설정
  private healthCheckTimer?: ReturnType<typeof setInterval>;
  private reconnectTimer?: ReturnType<typeof setTimeout>;
  private readonly HEALTH_CHECK_INTERVAL = 30_000; // 30초
  private readonly MAX_RETRY_ATTEMPTS = 5;
  private retryCount = 0;

  // 의도적 연결 끊기 플래그
  private intentionalDisconnect = false;

  constructor() {
    if (isPlatformBrowser(PLATFORM_ID)) {
      window.addEventListener('beforeunload', () => this.disconnect());
    }
  }

  // ==================== 초기화 ====================

  public async init(url: string): Promise<void> {
    if (this.initialized) {
      console.log('✅ SignalR 이미 초기화됨');
      return;
    }

    console.log('🛫 SignalR 초기화 시작:', url);

    this.connection = new HubConnectionBuilder()
      .withUrl(url, {
        accessTokenFactory: async () => this.getAccessToken(),
        skipNegotiation: false,
        transport: HttpTransportType.WebSockets | HttpTransportType.ServerSentEvents
      })
      .configureLogging(LogLevel.Information) // Trace -> Information으로 변경 (로그 줄이기)
      .build();

    this.setupEventHandlers();
    this.initialized = true;
    console.log('✅ SignalR 초기화 완료');
  }

  // ==================== 이벤트 핸들러 ====================

  private setupEventHandlers(): void {
    this.connection.onclose((error) => {
      console.log('🔴 연결 종료:', error);
      this.state.set(HubConnectionState.Disconnected);

      // 의도적 연결 끊기인 경우
      if (this.intentionalDisconnect) {
        console.log('✅ 의도적 연결 종료 - 재연결하지 않음');
        this.stopHealthCheck();
        this.stopReconnectTimer();
        return;
      }

      // 인증 실패
      if (this.isAuthError(error)) {
        console.error('❌ 인증 실패 - 로그아웃 처리');
        this.handleAuthFailure();
        return;
      }

      // 일반 연결 끊김 - 재연결 시도
      this.startReconnectTimer();
    });
  }

  // ==================== 연결 관리 ====================

  async connect(): Promise<void> {
    if (!this.initialized) {
      throw new Error('SignalR이 초기화되지 않았습니다.');
    }

    // 연결 시도 시 플래그 초기화
    this.intentionalDisconnect = false;

    if (this.connection.state === HubConnectionState.Connected) {
      console.log('✅ 이미 연결됨');
      return;
    }

    try {
      console.log('🔌 연결 시도...');
      this.state.set(HubConnectionState.Connecting);

      await this.connection.start();

      this.state.set(HubConnectionState.Connected);
      this.retryCount = 0;
      console.log('✅ 연결 성공');

      this.startHealthCheck();
    } catch (err) {
      console.error('❌ 연결 실패:', err);
      this.state.set(HubConnectionState.Disconnected);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    console.log('🔴 연결 끊기 시작');

    this.intentionalDisconnect = true;
    this.stopHealthCheck();
    this.stopReconnectTimer();

    if (this.connection?.state !== HubConnectionState.Disconnected) {
      try {
        await this.connection.stop();
        console.log('✅ 연결 종료됨');
      } catch (err) {
        console.error('❌ 연결 종료 실패:', err);
      }
    }

    this.state.set(HubConnectionState.Disconnected);
  }

  async ensureConnected(): Promise<void> {
    if (this.intentionalDisconnect) {
      throw new Error('서버 연결이 종료된 상태입니다. 먼저 연결해주세요.');
    }

    if (this.state() === HubConnectionState.Connected) {
      return;
    }

    await this.connect();
    await this.waitUntilConnected();
  }

  async waitUntilConnected(timeoutMs: number = 30000): Promise<void> {
    const startTime = Date.now();
    const pollInterval = 100;

    while (this.state() !== HubConnectionState.Connected) {
      if (Date.now() - startTime > timeoutMs) {
        throw new Error(`연결 타임아웃 (${timeoutMs}ms 초과)`);
      }
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
  }

  // ==================== 재연결 로직 ====================

  private startHealthCheck(): void {
    this.stopHealthCheck();

    this.healthCheckTimer = setInterval(async () => {
      if (this.intentionalDisconnect) {
        this.stopHealthCheck();
        return;
      }

      const currentState = this.state();

      if (currentState === HubConnectionState.Disconnected) {
        console.warn('⚠️ 연결 끊김 감지 - 재연결 시도');
        try {
          await this.connect();
        } catch (err) {
          console.error('❌ 재연결 실패:', err);
        }
      }
    }, this.HEALTH_CHECK_INTERVAL);
  }

  private stopHealthCheck(): void {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
      this.healthCheckTimer = undefined;
    }
  }

  private startReconnectTimer(): void {
    if (this.intentionalDisconnect) {
      return;
    }

    if (this.retryCount >= this.MAX_RETRY_ATTEMPTS) {
      console.error('❌ 최대 재연결 시도 초과 - 로그아웃');
      this.handleAuthFailure();
      return;
    }

    this.stopReconnectTimer();

    const delay = Math.min(1000 * Math.pow(2, this.retryCount), 30_000);
    console.log(`⏰ ${delay}ms 후 재연결 시도 (${this.retryCount + 1}/${this.MAX_RETRY_ATTEMPTS})`);

    this.reconnectTimer = setTimeout(async () => {
      if (this.intentionalDisconnect) {
        return;
      }

      try {
        await this.connect();
      } catch (err) {
        console.error('❌ 재연결 실패:', err);
        this.retryCount++;
        this.startReconnectTimer();
      }
    }, delay);
  }

  private stopReconnectTimer(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = undefined;
    }
  }

  // ==================== 유틸리티 ====================

  setIntentionalDisconnect(value: boolean): void {
    this.intentionalDisconnect = value;
  }

  isConnected(): boolean {
    return this.state() === HubConnectionState.Connected;
  }

  get hub(): HubConnection {
    return this.connection;
  }

  // ==================== Private 헬퍼 ====================

  private async getAccessToken(): Promise<string> {
    let token = this.tokenStorage.getAccessToken();

    if (token && this.isTokenExpiringSoon(token)) {
      console.log('⏳ 토큰 곧 만료 - 갱신 시도');
      try {
        const result = await firstValueFrom(this.authServer.refreshToken());
        if (result.isSuccess) {
          token = result.token;
          console.log('✅ 토큰 갱신 성공');
        }
      } catch (err) {
        console.error('❌ 토큰 갱신 실패:', err);
      }
    }

    return token || '';
  }

  private isTokenExpiringSoon(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      return exp - now < fiveMinutes;
    } catch {
      return false;
    }
  }

  private isAuthError(error: Error | undefined): boolean {
    return error?.message?.includes('401') ||
      error?.message?.includes('Unauthorized') ||
      false;
  }

  private handleAuthFailure(): void {
    this.intentionalDisconnect = true;
    this.disconnect();
    this.authServer.signOut();
    this.router.navigate(['SignIn']);
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
