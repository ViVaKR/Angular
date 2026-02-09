import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChatService } from '@app/core/services/chat/chat-service';
import { ChatStore } from '@app/core/services/chat/chat-store';
import { HubConnectionState } from '@microsoft/signalr';
import { Router } from "@angular/router";
import { LoaderService } from '@app/core/services/loader-service';
import { IValidationError } from '@app/core/interfaces/i-validation-error';
import { catchError, EMPTY, exhaustMap, filter, finalize, from, Subject, tap } from 'rxjs';
import { AlertService } from '@app/core/services/alert-service';
import { IBottomSheet } from '@app/core/interfaces/i-bottom-sheet';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { IChatRoom } from '@app/core/interfaces/i-chat-room';
import { UserStore } from '@app/core/services/user-store';

@Component({
  selector: 'app-lobby',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule
  ],
  templateUrl: './lobby.html',
  styleUrl: './lobby.scss',
  host: { 'class': 'route-lobby' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Lobby implements OnInit {
  title = "로 비";

  private svc = inject(ChatService);
  private store = inject(ChatStore);
  private userStore = inject(UserStore);
  private formBuilder = inject(FormBuilder);
  private loader = inject(LoaderService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  // Signals
  room = this.store.room;
  _rooms = this.store.rooms;
  rooms = computed(() => this._rooms());

  systemMessage = this.store.systemMessage;
  error = this.store.error;
  state = this.svc.conn.state;

  currentUser = toSignal(this.userStore.user$, { initialValue: null });
  userId = computed(() => this.currentUser()?.id);

  pseudoName = signal<string | null>(null);
  isConnected = computed(() => this.state() == HubConnectionState.Connected);
  showForm = signal<boolean>(true);

  private createRoom$ = new Subject<void>();
  errors: IValidationError[] = [];

  // * Form
  form: FormGroup = this.formBuilder.group({
    roomName: ['', Validators.required],
    description: ['']
  });

  // * switchMap (이전요청 취소), mergeMap (다중요청 허용), exhaustMap ()
  constructor() {

    this.createRoom$.pipe(
      filter(() => {
        if (this.form.invalid) {
          this.form.markAllAsDirty();
          return false;
        }
        return true;
      }),
      tap(() => this.loader.show()),
      exhaustMap(() =>
        from(this.svc.createRoom(this.form.getRawValue())).pipe(
          tap(() => {
            const room = this.store.room();
            if (room?.id) {
              const data: IBottomSheet[] = [{ title: `방생성 완료`, content: `${this.store.room.name}` }];
              this.alertService.openSheet(data);
              this.router.navigate(['/Communication/ChatRoom', room.id]);
            }
            this.resetForm();
          }),
          catchError(err => {
            this.store.error.set(err?.message ?? '방 생성 실패');
            return EMPTY;
          }),
          finalize(() => this.loader.hide())
        )
      ),
      takeUntilDestroyed()
    ).subscribe();
  }

  async ngOnInit(): Promise<void> {
    this.pseudoName.set(await this.svc.getPseudonymName());

    // 연결되지 않은 상태에서도 안전하게 처리
    try {
      // 먼저 연결 시도
      await this.svc.ensureConnected();

      // 연결 성공 후 서버 요청
      this.pseudoName.set(await this.svc.getPseudonymName());
      await this.svc.GetToken();
      await this.svc.getRooms();
    } catch (err: any) {
      console.error('초기화 실패:', err);

      // 연결 실패시 기본 값 설정
      this.pseudoName.set('게스트');
      this.store.error.set(err.message || '서버 연결에 실패했습니다.');
    }
    // 자동 연결
    this.svc.ensureConnected();
    this.svc.GetToken();
  }

  // ==================== 연결 상태 ====================

  connectionStateText = computed(() => {
    switch (this.state()) {
      case HubConnectionState.Connected: return 'Connected';
      case HubConnectionState.Connecting: return 'Connecting...';
      case HubConnectionState.Reconnecting: return 'Reconnecting...';
      case HubConnectionState.Disconnected: return 'Disconnected';
      default: return 'Unknown';
    }
  });

  // #region
  // ==================== 연결 관리 ====================

  async connectToServer(): Promise<void> {
    try {
      // 의도적 연결 끊기 플래그 초기화 (ChatService에 추가 필요)
      await this.svc.connect(); // 새로운 메서드 추가
      await this.svc.bootstrap();
      await this.svc.getRooms(); // 방 목록 가져오기
      this.store.error.set(''); // 에러 메시지 초기화
    } catch (err: any) {
      this.store.error.set(err.message || '서버 연결 실패');
    }
  }

  async disconnectServer() {
    try {
      await this.svc.disconnect();
      this.store.reset();
    } catch (err: any) {
      this.store.error.set(err.message || '서버 연결 끊기 오류');
    }
  }

  async refreshRooms() {
    try {
      await this.svc.getRooms();
    } catch (err: any) {
      this.store.error.set(err.message || '서버 갱신 오류');
    }
  }

  // ==================== 방 관리 ====================

  toggleForm() {
    this.showForm.set(!this.showForm());
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.createRoom$.next();
  }

  resetForm() {
    this.form.reset();
    Object.values(this.form.controls).forEach(control => {
      control.markAsPristine();
      control.markAsUntouched();
      control.setErrors(null);
    });
  }

  async deleteRoom(roomId: string) {
    if (!confirm('정말로 이 방을 삭제하시겠습니까?')) return;

    try {
      const success = await this.svc.deleteRoom(roomId);
      if (!success) this.store.error.set('방 삭제 권한이 없습니다.');
    } catch (err: any) {
      this.store.error.set(err.message || '방 삭제 실패');
    }
  }

  canDeleteRoom(room: IChatRoom): boolean {
    return room.ownerId === this.userId();
  }

  async joinAndEnter(roomId: string): Promise<void> {
    this.loader.show();
    try {
      const success = await this.svc.joinRoom(roomId);
      if (success) {
        await this.router.navigate(['/Communication/ChatRoom', roomId]);
      } else {
        this.store.error.set('방 입장에 실패했습니다.');
      }
    } catch (err: any) {
      this.store.error.set(err.message || '방 입장 중 오류가 발생했습니다.');
    } finally {
      this.loader.hide();
    }
  }

  async isCurrentlyInRoom(roomId: string): Promise<boolean> {
    return roomId === this.room()?.id;
  }
}

// cmd+k, cmd+0
// cmd+k, cmd+j
