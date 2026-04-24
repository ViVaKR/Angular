import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  // private _snackBar = inject(MatSnackBar);
  constructor(private _snackBar: MatSnackBar) { }

  // 기본 설정값
  private defaultConfig: MatSnackBarConfig = {
    duration: 5_000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  }

  /**
   * 기본 알림창
   * @param message 표시할 메시지
   * @param action 버튼 텍스트 (기본값: '닫기')
   * @param customConfig 설정 덮어쓰기 (옵션)
  */
  open(message: string, action: string = '닫기', customConfig?: MatSnackBarConfig) {
    // 기본 설정 + 커스텀 설정 합치기
    const finalConfig = { ...this.defaultConfig, ...customConfig };
    this._snackBar.open(message, action, finalConfig);
  }

  // ★ 꿀팁: 자주 쓰는 '에러용', '성공용' 메서드를 따로 만들어두면 더 편해!
  error(message: string) {
    this.open(message, '옴 마니 반메 훔 (닫기)', {
      panelClass: ['snackbar-error'], // CSS에서 빨간색 배경 지정 가능
      duration: 8000 // 에러는 좀 더 길게
    });
  }

  success(message: string) {
    this.open(message, '나무 관세음 보살 (닫기)', {
      panelClass: ['snackbar-success'], // CSS에서 초록색 배경 지정 가능
      duration: 3000,
      verticalPosition: 'bottom'
    });
  }
}
