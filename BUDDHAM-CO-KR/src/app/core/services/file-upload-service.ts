import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment.development';
import { catchError, finalize, map, Observable, Subject, tap, throwError } from 'rxjs';
import { IResponse } from '@app/core/interfaces/i-response';
import { PsStatus } from '@app/core/enums/ps-status';
import { IUploadProgress } from '@app/core/interfaces/i-upload-progress';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { IFile } from '../interfaces/i-file';
import { RsCode } from '../enums/rs-code';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  private readonly baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  private _uploaded = new Subject<string>();
  public uploaded$ = this._uploaded.asObservable();

  public readonly uploadProgress = signal<IUploadProgress>({
    progress: 0,
    loaded: 0,
    total: 0,
    status: PsStatus.Idle
  });

  public readonly isUploading = computed(() => this.uploadProgress().status === PsStatus.Uploading);

  public readonly uploadComplete = computed(() => this.uploadProgress().status === PsStatus.Success);

  uploadSharedFile(file: File, onProgress?: (progress: number) => void): Observable<IResponse<IFile> | null> {

    const formData = new FormData();

    formData.append('file', file, file.name);
    this.uploadProgress.set({
      progress: 0,
      loaded: 0,
      total: file.size,
      status: PsStatus.Uploading
    });

    return this.http.post<IResponse<IFile>>(`${this.baseUrl}/FileData/UploadSharedFile`, formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    ).pipe(
      map(event => this.handleHttpEvent(event, onProgress)),
      tap(res => {
        if (res) {
          if (res.rsCode === RsCode.Ok) {
            const fileUrl = res.rsData?.fileName ?? null;
            if (fileUrl) this._uploaded.next(fileUrl);
            this.uploadProgress.update(state => ({
              ...state,
              progress: 100,
              total: state.total,
              status: PsStatus.Success
            }));
          }
        }
      }),
      catchError(error => {
        this.uploadProgress.update(state => ({
          ...state,
          status: PsStatus.Error
        }));
        return this.handleError(error);
      }),
      finalize(() => {
        setTimeout(() => {
          this.uploadProgress.set({
            progress: 0,
            loaded: 0,
            total: 0,
            status: PsStatus.Idle
          });
        }, 3_000)
      })
    );
  }
  /**
   * HTTP 이벤트 핸들러
   * @param event HttpEvent<IResponse<IFile>>
   * @param onProgress
   * @returns IResponse<IFile> | null
   */
  private handleHttpEvent(event: HttpEvent<IResponse<IFile>>, onProgress?: (progress: number) => void): IResponse<IFile> | null {

    switch (event.type) {
      case HttpEventType.Sent: {
        return null;
      }
      case HttpEventType.UploadProgress:
        {
          const percentDone = event.total
            ? Math.round(100 * event.loaded / event.total)
            : 0;

          this.uploadProgress.update(state => ({
            ...state,
            progress: percentDone,
            loaded: event.loaded,
            total: event.total || 0
          }));

          onProgress?.(percentDone);
          return null;
        }
      case HttpEventType.Response:
        return event.body!;

      default:
        return null;
    }
  }
  /**
  * 파일 유효성 검사 (클라이언트 측)
  */
  public validateFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 50 * 1024 * 1024;
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/mpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg",
      "image/x-icon",
      "image/svg+xml",
      "image/tif",
      "image/tiff",
      "image/avif",

      "audio/mpeg",
      "audio/wav",
      "audio/ogg",

      "text/plain",
      "text/csv",

      // 문서
      "application/json",
      "application/pdf",
      "application/xml",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",

      // 압축
      "application/zip",
      "application/x-zip-compressed",
      "application/x-7z-compressed",
      "application/x-tar",
      "application/gzip",
      "application/x-gzip",
      "application/vnd.rar",
      "application/x-rar-compressed",
      "application/x-bzip",
      "application/x-bzip2"
    ];

    if (file.size > maxSize) {
      return { valid: false, error: '파일 크기는 최대 50MB입니다.' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: '허용되지 않은 파일 형식입니다.' };
    }

    return { valid: true };
  }

  public validateSvgFile(file: File): Promise<{ valid: boolean; error?: string }> {
    return new Promise((resolve) => {
      // ★ 파일 크기 사전 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        resolve({ valid: false, error: 'SVG 파일이 너무 큽니다 (최대 5MB)' });
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;

        // ★ 크기 재검증 (SVG 폭탄 방지)
        if (content.length > 5 * 1024 * 1024) {
          resolve({ valid: false, error: 'SVG 내용이 너무 큽니다' });
          return;
        }

        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(content, 'image/svg+xml');

          // 파싱 에러 체크
          const parserError = doc.querySelector('parsererror');
          if (parserError) {
            resolve({ valid: false, error: 'SVG 파일 형식이 올바르지 않습니다.' });
            return;
          }

          // ★ 루트 요소 검증
          if (doc.documentElement.tagName.toLowerCase() !== 'svg') {
            resolve({ valid: false, error: 'SVG 루트 요소가 아닙니다.' });
            return;
          }

          // 위험한 태그 검사
          const dangerousTags = [
            'script', 'iframe', 'embed', 'object', 'foreignObject',
            'use', 'animate', 'set', 'animateTransform', 'animateMotion' // ★ 추가
          ];

          for (const tagName of dangerousTags) {
            if (doc.getElementsByTagName(tagName).length > 0) {
              resolve({
                valid: false,
                error: `허용되지 않는 태그: <${tagName}>`
              });
              return;
            }
          }

          // 위험한 속성 검사
          const allElements = doc.getElementsByTagName('*');
          const dangerousAttrs = [
            // 이벤트 핸들러
            ...['click', 'load', 'error', 'mouseover', 'mouseout', 'focus', 'blur']
              .map(e => `on${e}`),
            // 기타
            'formaction', 'action'
          ];

          for (let i = 0; i < allElements.length; i++) {
            const element = allElements[i];

            // 속성 검사
            for (const attr of dangerousAttrs) {
              if (element.hasAttribute(attr)) {
                resolve({
                  valid: false,
                  error: `허용되지 않는 속성: ${attr}`
                });
                return;
              }
            }

            // href/xlink:href 검사
            const href = element.getAttribute('href') ||
              element.getAttributeNS('http://www.w3.org/1999/xlink', 'href');

            if (href) {
              const lower = href.toLowerCase();
              if (lower.startsWith('javascript:') ||
                lower.startsWith('data:text/html')) {
                resolve({
                  valid: false,
                  error: '위험한 URL이 포함되어 있습니다.'
                });
                return;
              }
            }
          }

          // ★ 문자열 레벨 추가 검사 (DOM 우회 방지)
          const lowerContent = content.toLowerCase();
          const patterns = [
            'javascript:',
            'data:text/html',
            '<script',
            'onerror=',
            'onload='
          ];

          for (const pattern of patterns) {
            if (lowerContent.includes(pattern)) {
              resolve({
                valid: false,
                error: '의심스러운 코드 패턴 발견'
              });
              return;
            }
          }
          resolve({ valid: true });
        } catch (error) {
          console.error('SVG 검증 오류:', error);
          resolve({
            valid: false,
            error: 'SVG 파일 검증 중 오류가 발생했습니다.'
          });
        }
      };

      reader.onerror = () => {
        resolve({ valid: false, error: 'SVG 파일을 읽을 수 없습니다.' });
      };

      reader.readAsText(file);
    });
  }


  /**
  * HTTP 에러 처리
  */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '업로드 중 오류가 발생했습니다.';

    if (error.error instanceof ErrorEvent) {
      // 클라이언트 축 에러
      errorMessage = `클라이언트 오류: ${error.error.message} `;
    } else {
      // 서버 측 에러 - IResponse 형식 처리
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.status === 401) {
        errorMessage = '로그인 후 다시 시도하여 주세요.';
      } else if (error.status === 404) {
        errorMessage = '회원정보를 찾을 수 없습니다.';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || '잘못된 요청입니다';
      } else if (error.status === 413) {
        errorMessage = '파일 크기가 너무 큽니다. (최대 5MB)';
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
