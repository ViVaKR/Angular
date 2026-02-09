import { computed, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment.development';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { map, Observable, tap, throwError, forkJoin, catchError, finalize, of, Subject } from 'rxjs';
import { IResponse } from '@interfaces/i-response';
import { IUploadProgress } from '@interfaces/i-upload-progress';
import { PsStatus } from '@enums/ps-status';
import { IFile } from '@interfaces/i-file';
import { TokenStorage } from './token-storage';
import { RsCode } from '../enums/rs-code';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  private readonly baseUrl = environment.apiUrl;
  private accessToken: string | null;

  private _avatarUpdated = new Subject<string>();
  readonly avatarUpdated$ = this._avatarUpdated.asObservable();

  private _fileUploaded = new Subject<string>();
  readonly fileUploaded$ = this._fileUploaded.asObservable();

  readonly uploadProgress = signal<IUploadProgress>({
    progress: 0,
    loaded: 0,
    total: 0,
    status: PsStatus.Idle
  });

  readonly isUploading = computed(() =>
    this.uploadProgress().status === PsStatus.Uploading
  );

  readonly uploadComplete = computed(() =>
    this.uploadProgress().status === PsStatus.Success
  );

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage) {
    this.accessToken = this.tokenStorage.getAccessToken();
  }

  /**
   * 아바타 업로드
   * @param file 아바타 파일
   * @param onProgress 진행상태
   * @returns IFile
   */
  uploadAvatar(file: File, onProgress?: (progress: number) => void): Observable<IResponse<IFile> | null> {

    const formData = new FormData();

    formData.append('file', file, file.name);

    this.uploadProgress.set({
      progress: 0, loaded: 0, total: file.size, status: PsStatus.Uploading
    });

    return this.http.post<IResponse<IFile>>(`${this.baseUrl}/FileData/UploadAvatar`, formData,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        },
        reportProgress: true,
        observe: 'events'
      }
    )
      .pipe(
        map(event => this.handleHttpEvent(event, onProgress)),
        tap(response => {
          if (response) {
            if (response?.rsCode === RsCode.Ok) {
              const avatarUrl = response.rsData?.fileName
                ? `/Images/avatars/${response.rsData.userId}/${response.rsData.fileName}`
                : null;

              if (avatarUrl) {
                this._avatarUpdated.next(avatarUrl);
              }

              this.uploadProgress.update(state => ({
                ...state,
                progress: 100,
                status: PsStatus.Success
              }));
            }
          }
          catchError(error => {
            this.uploadProgress.update(state => ({
              ...state,
              status: PsStatus.Error
            }));
            throw error;
          })
          finalize(() => {
            // 업로드 완료 후 3초 뒤 상태 초기화
            setTimeout(() => {
              this.uploadProgress.set({
                progress: 0,
                loaded: 0,
                total: 0,
                status: PsStatus.Idle
              });
            }, 3000);
          })
        }));
  }

  /**
   * 파일 업로드
   * @param file 일반 파일
   * @param onProgress 진행상태
   * @returns IFile
   */
  uploadFile(file: File, onProgress?: (progress: number) => void): Observable<IResponse<IFile> | null> {

    const formData = new FormData();
    formData.append('file', file, file.name);

    this.uploadProgress.set({
      progress: 0,
      loaded: 0,
      total: file.size,
      status: PsStatus.Uploading
    });

    return this.http.post<IResponse<IFile>>(`${this.baseUrl}/FileData/UploadFile`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    ).pipe(
      map(event => this.handleHttpEvent(event, onProgress)),
      tap(response => {
        if (response) {
          if (response.rsCode === RsCode.Ok) {
            const fileUrl = response.rsData?.fileName
              ? `/Images/files/users/${response.rsData.userId}/${response.rsData.fileName}`
              : null;
            if (fileUrl) this._fileUploaded.next(fileUrl);
          }
          this.uploadProgress.update(state => ({
            ...state,
            progress: 100,
            status: PsStatus.Success
          }));
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
        }, 3000);
      })
    );
  }

  /**
   * 공유 파일 업로드
   * @param file 일반 파일
   * @param onProgress 진행상태
   * @returns IFile
   */
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
            if (fileUrl) this._fileUploaded.next(fileUrl);

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
      }), finalize(() => {
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
   * 간단한 업로드 (프로그레스 불필요)
   * @param file
   * @returns
   */
  uploadSimpleFile(file: File): Observable<IResponse<IFile>> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<IResponse<IFile>>(`${this.baseUrl}/FileData/Uploadfile`, formData);
  }

  uploadMultipleFiles(files: File[]): Observable<IResponse<IFile>[]> {
    const uploadObservables = files.map(file => this.uploadSimpleFile(file));
    return forkJoin(uploadObservables);
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
   * (1) 파일 업로드
   * @param file 업로드할 파일
   * @param choice 1 = 파일, 2 = 아바타
   * @returns
   */
  upload(file: File, choice: 1 | 2) {
    if (!file) return undefined;
    this.resolveUploader(choice)(file).pipe(catchError(_ => of(null))).subscribe();
  }

  uploadShared(file: File) {
    if (!file) return undefined;
    const func = (f: File) => this.uploadSharedFile(f, _ => { });
    func(file).pipe(catchError(_ => of(null))).subscribe();
  }

  /**
   * (2) 업로더
   * @param choice 1 = file, 2 = avatar
   * @returns
   */
  public resolveUploader(choice: 1 | 2) {
    switch (choice) {
      case 1: return (f: File) => this.uploadFile(f, _ => { });
      case 2: return (f: File) => this.uploadAvatar(f, _ => { });
    }
  }

  /**
  * 파일 유효성 검사 (클라이언트 측)
  */
  validateFile(file: File): { valid: boolean; error?: string } {
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

  /**
   * 파일 크기를 읽기 쉬운 형식으로 변환
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Math.round(bytes / Math.pow(k, i) * 100) / 100} ${sizes[i]}`;
  }

  /**
  * HTTP 에러 처리
  */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '업로드 중 오류가 발생했습니다.';

    if (error.error instanceof ErrorEvent) {
      // 클라이언트 축 에러
      errorMessage = `클라이언트 오류: ${error.error.message}`;
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
