import { ChangeDetectionStrategy, Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormErrorStateMatcher } from '@app/core/classes/form-error-state-matcher';
import { UniqueValidators } from '@app/core/classes/unique-validators';
import { RsCode } from '@app/core/enums/rs-code';
import { IAppUser } from '@app/core/interfaces/i-app-user';
import { IFileInfo } from '@app/core/interfaces/i-file-info';
import { IResponse } from '@app/core/interfaces/i-response';
import { IUser } from '@app/core/interfaces/i-user';
import { IValidationError } from '@app/core/interfaces/i-validation-error';
import { AlertService } from '@app/core/services/alert-service';
import { AuthService } from '@app/core/services/auth-service';
import { FileService } from '@app/core/services/file-service';
import { LoaderService } from '@app/core/services/loader-service';
import { UserStore } from '@app/core/services/user-store';
import { Paths } from '@app/data/menu-data';
import { environment } from '@env/environment.development';
import { catchError, EMPTY, exhaustMap, filter, finalize, from, of, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfile {

  readonly title = Paths.EditProfile.title;
  private baseUrl = environment.apiUrl;
  private authService = inject(AuthService);
  private updateUserInfo$ = new Subject<void>();
  private loader = inject(LoaderService);
  private fileSevice = inject(FileService);
  private alertService = inject(AlertService);
  private userStore = inject(UserStore);

  fb = inject(FormBuilder);

  hidePassword = signal(true);
  fileInfo: WritableSignal<IFileInfo | null> = signal<IFileInfo | null>(null);
  matcher = new FormErrorStateMatcher();

  errors = signal<IValidationError[]>([]);
  user = toSignal<IUser | null>(this.userStore.user$, { initialValue: null });
  selectedFile = signal<any>(null);
  defaultAvatar = `${this.baseUrl}/Images/buddha.png`;

  // (1)
  private defaultAvatarSignal = computed(() => {
    const usr = this.user();
    if (usr === null || usr.avatar === 'default.png') return this.defaultAvatar;
    return `${this.baseUrl}/Images/avatars/${usr.id}/${usr.avatar}`;
  });

  // (2)
  private updatedAvatar = toSignal(this.fileSevice.avatarUpdated$, { initialValue: null });

  // (3)
  avatar = computed(() => {
    const updated = this.updatedAvatar();
    if (updated) return `${this.baseUrl}${updated}`;
    return this.defaultAvatarSignal();
  });

  appUser = {} as IAppUser;

  form = this.fb.group({
    id: ['', Validators.required],
    fullName: ['', Validators.required],
    avatar: ['', Validators.required],
    pseudonym: ['', Validators.required, UniqueValidators.createPseudonymAuthValidator(this.authService)],
  });

  constructor() {
    this.initForm();

    // * 업데이트
    this.updateUserInfo$.pipe(
      filter(() => {
        if (this.form.invalid) {
          this.form.markAllAsDirty();
          return false;
        }
        return true;
      }),
      tap(() => this.loader.show()), // 로딩
      exhaustMap(() =>
        from(this.authService.updateUserInfo(this.user()?.id!, this.form.getRawValue() as IAppUser)).pipe(
          tap((res: IResponse) => {
            if (res.rsCode === RsCode.Ok) {
              this.alertService.openSheet([{
                title: "업데이트 완료",
                content: res.rsMessage
              }]);

              this.form.reset();
              this.form.patchValue({
                id: res.rsData.id,
                fullName: res.rsData.fullName,
                avatar: res.rsData.avatar,
                pseudonym: res.rsData.pseudonym
              });
            } else {
              this.alertService.openSheet([{
                title: "업데이트 실패",
                content: res.rsMessage
              }]);
            }
          }),
          catchError(err => {
            this.alertService.openSheet([{ title: '에러발생', content: err?.message ?? "업데이트 실패" }]);
            return EMPTY;
          }),
          finalize(() => this.loader.hide())
        )
      ),
      takeUntilDestroyed()
    ).subscribe();


  }

  private initForm() {
    this.form.patchValue({
      id: this.user()?.id,
      fullName: this.user()?.fullName,
      pseudonym: this.user()?.pseudonym,
      avatar: this.user()?.avatar
    });
  }


  onSingleFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.selectedFile.set(file);
    this.upload(file, 2);
  }

  upload(file: File, choice: 1 | 2) {
    if (!file) return undefined;
    this.fileSevice.resolveUploader(choice)(file)
      .pipe(catchError(_ => of(null)))
      .subscribe(res => {
        this.form.patchValue({
          avatar: res?.rsData?.fileName
        });
      });
  }

  togglePassword() {
    this.hidePassword.set(!this.hidePassword());
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName);
    return !!(
      control &&
      control.hasError(error) &&
      (control.dirty || control.touched));
  }

  resetForm() {
    this.form.reset();
    Object.values(this.form.controls).forEach(control => {
      control.markAsPristine();
      control.markAsUntouched();
      control.setErrors(null);
    });
  }

  onSubmit(event: MouseEvent) {
    event.preventDefault();
    this.updateUserInfo$.next();
  }
}
