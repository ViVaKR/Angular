import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { RsCode } from '@app/core/enums/rs-code';
import { IResponse } from '@app/core/interfaces/i-response';
import { IUser } from '@app/core/interfaces/i-user';
import { AlertService } from '@app/core/services/alert-service';
import { AuthService } from '@app/core/services/auth-service';
import { LoaderService } from '@app/core/services/loader-service';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { environment } from '@env/environment.development';
import {
  catchError,
  EMPTY, filter,
  finalize, from, of, Subject,
  switchMap, exhaustMap,
  tap, shareReplay,
  combineLatest, startWith
} from 'rxjs';

@Component({
  selector: 'app-user-info',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
  ],
  templateUrl: './user-info.html',
  styleUrl: './user-info.scss',
})
export class UserInfo {

  public baseUrl = environment.apiUrl;
  private defaultAvatar = environment.defaultAvatar;

  private reload$ = new Subject<void>();
  private updateRoles$ = new Subject<void>()

  private authService = inject(AuthService);
  private loader = inject(LoaderService);
  private alertService = inject(AlertService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  id = signal<string>('');

  private userDetail$ = combineLatest([
    toObservable(this.id).pipe(filter(id => !!id)), // Observable 1
    this.reload$.pipe(startWith(null)) // Observable 2
  ]).pipe(
    switchMap(([id]) => {
      return this.authService.getUserDetail(id).pipe(catchError(() => of(null)));
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  response = toSignal(this.userDetail$, { initialValue: null });
  userInfo = computed<IUser | null | undefined>(() => {
    const res = this.response();
    if (res?.rsCode === RsCode.Ok) {
      return res.rsData;
    }
    return null;
  });

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    // 기본 아바타가 또 404면 무한 루프 방지
    if (img.src !== this.defaultAvatar) {
      img.src = this.defaultAvatar;
    }
  }

  form: FormGroup = this.fb.group({
    id: ['', Validators.required],
    roles: [[], [Validators.required]],
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.id.set(id!);

    effect(() => {
      this.form.get('id')?.setValue(this.id());
      this.form.get('roles')?.setValue(this.userInfo()?.roles)
    });

    this.updateRoles$.pipe(
      filter(() => {
        if (this.form.invalid) {
          this.form.markAllAsDirty();
          return false;
        }
        return true
      }),
      tap(() => this.loader.show()),
      exhaustMap(() =>
        from(this.authService.updateUserRoles(this.id(), this.form.getRawValue())).pipe(
          tap((res: IResponse) => {
            if (res.rsCode === RsCode.Ok) {
              this.alertService.openSheet([{
                title: "권한 변경완료",
                content: res.rsMessage
              }]);
              this.reload$.next();
            }
          }),
          catchError(err => {
            this.alertService.openSheet([{
              title: '에러발생',
              content: err?.message
            }]);
            return EMPTY;
          }),
          finalize(() => this.loader.hide())
        )
      ),
      takeUntilDestroyed()
    ).subscribe();

  }

  addRole(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const currentRoles = this.form.get('roles')?.value || [];
      this.form.patchValue({
        roles: [...currentRoles, value]
      });
    }
    event.chipInput!.clear();
  }

  removeRole(role: string): void {
    const currentRoles = this.form.get('roles')?.value || [];
    const index = currentRoles.indexOf(role);
    if (index >= 0) {
      currentRoles.splice(index, 1);
      this.form.patchValue({ roles: [...currentRoles] });
    }
  }

  onSubmit(event: MouseEvent) {
    event.preventDefault();
    this.updateRoles$.next();
  }
}
