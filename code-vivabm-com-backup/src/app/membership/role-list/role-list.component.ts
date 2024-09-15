
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IRole } from '@app/interfaces/i-role';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent {

  @Input() roles!: IRole[] | null;
  @Output() deleteRole = new EventEmitter<string>();

  delete(id: string) {
    this.deleteRole.emit(id);
  }
}
