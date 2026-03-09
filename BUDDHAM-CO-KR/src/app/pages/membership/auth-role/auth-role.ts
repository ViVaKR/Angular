import {
  AfterViewInit,
  Component,
  effect,
  inject,
  Injector,
  runInInjectionContext,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RoleService } from '@app/core/services/role-service';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { IRole } from '@app/core/interfaces/i-role';
import { Paths } from '@app/data/menu-data';
import { CreateRole } from "./create-role/create-role";
import { AccordionTable } from "@app/shared/components/accordion-table/accordion-table";
import { IColumnDef } from '@app/core/interfaces/i-column-def';
import { BodyTitle } from "@app/shared/body-title/body-title";

@Component({
  selector: 'app-auth-role',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    CreateRole,
    AccordionTable,
    BodyTitle
  ],
  templateUrl: './auth-role.html',
  styleUrl: './auth-role.scss'
})
export class AuthRole implements AfterViewInit {

  title = Paths.AuthRole.title;
  createRoleTitle = '역할 만들기';
  detailUrl = 'MemberShip/ReadRole';

  pageSize = signal(10);
  role = signal<IRole | null>(null);
  roles = signal<IRole[]>([]);
  data = signal<IRole[]>([]);

  page = viewChild<MatPaginator>(MatPaginator)
  sortor = viewChild<MatSort>(MatSort)

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  private roleService = inject(RoleService);
  private injector = inject(Injector);

  roleList = this.roleService.roleList.value;
  readonly dataSource = new MatTableDataSource<IRole>([]);

  columns = signal<IColumnDef[]>([
    // 핵심 정보 (테이블 + 탭)
    { key: 'name', label: '역할', width: '30%', showInTable: true, showInTab: true, tabOrder: 1 },
    { key: 'description', label: '설명', width: '65%', showInTable: true, showInTab: true, tabOrder: 2 },

    // 부가 정보 (탭만)
    { key: 'id', label: 'ID', showInTable: false, showInTab: true, tabOrder: 0 },
  ]);

  constructor() {
    effect(() => {
      const list = this.roleList();
      if (list) this.data.set(list);
    })
  }

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

  onReceiveData(role: IRole) {
    this.role.set(role);
  }
}
