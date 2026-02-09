import { CommonModule } from '@angular/common';
import { Component, effect, inject, Injector, OnInit, runInInjectionContext, signal, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RsCode } from '@app/core/enums/rs-code';
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { IUser } from '@app/core/interfaces/i-user';
import { UserService } from '@app/core/services/user-service';
import { Paths } from '@app/data/menu-data';
import { AccordionTable } from '@app/shared/components/accordion-table/accordion-table';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';

@Component({
  selector: 'app-member-list',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    AccordionTable,

  ],
  templateUrl: './member-list.html',
  styleUrl: './member-list.scss',
})
export class MemberList implements OnInit {

  title = Paths.MemberList.title;
  detailUrl = `/${Paths.MemberShip.url}/${Paths.UserInfo.url}`;

  pageSize = signal(10);
  user = signal<IUser | null>(null);

  private userService = inject(UserService);
  private injector = inject(Injector);
  private userList = signal<IUser[]>([]);

  readonly dataSource = new MatTableDataSource<IUser>([]);

  columns = signal<IColumnDef[]>([
    // 핵심 정보 (테이블 + 탭)
    { key: 'fullName', label: '이름', width: '10%', showInTable: true, showInTab: true, tabOrder: 1 },
    { key: 'pseudonym', label: '필명', width: '15%', showInTable: true, showInTab: true, tabOrder: 2 },
    { key: 'email', label: '이메일', width: '20%', showInTable: true, showInTab: true, tabOrder: 3 },
    { key: 'emailConfirmed', label: '인증', width: '15%', showInTable: true, showInTab: true, tabOrder: 4 },
    { key: 'roles', label: '역할', width: 'auto', showInTable: true, showInTab: true, tabOrder: 5 },

    // 부가 정보 (탭만)
    { key: 'id', label: 'ID', showInTable: false, showInTab: true, tabOrder: 0 },
    { key: 'phoneNumber', label: '전화번호', showInTable: false, showInTab: true, tabOrder: 6 },
    { key: 'twoFactorEnabled', label: '2FA', showInTable: false, showInTab: true, tabOrder: 7 },
    { key: 'phoneNumberConfirmed', label: '전화인증', showInTable: false, showInTab: true, tabOrder: 8 },
    { key: 'accessFailedCount', label: '로그인 실패', showInTable: false, showInTab: true, tabOrder: 9 },
    { key: 'avatar', label: '아바타', showInTable: false, showInTab: true, tabOrder: 10 }
  ]);

  data = signal<IUser[]>([]);
  page = viewChild<MatPaginator>(MatPaginator)
  sortor = viewChild<MatSort>(MatSort)

  constructor() {
    effect(() => {

      this.userService.getUserList().subscribe(res => {
        if (res.rsCode === RsCode.Ok) {
          this.data.set(res?.rsData ?? []);
        }
      })
    });
  }

  ngOnInit(): void {
    // TODO
  }
  /*
      effect(() => {
        this.userService.getUserList().subscribe(res => {
          if (res.rsCode === RsCode.Ok) {
            this.data.set(res?.rsData ?? []);
          }
        })
      }

  */
  ngAfterViewInit() {
    const paginator = this.page();
    const sort = this.sortor();

    if (!paginator || !sort) return;
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (this.data())
          this.dataSource.data = this.data();
      })
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onReceiveData(user: IUser) {
    this.user.set(user);
  }
}
