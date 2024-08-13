import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IRole } from '@app/interfaces/i-role';
import { RoleService } from '@app/services/role.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent implements OnInit {

  roleService = inject(RoleService);

  roles$!: Observable<IRole[]>;

  ngOnInit(): void {
    this.roles$ = this.roleService.getRoles();
  }

}
