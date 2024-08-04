import { Component, EventEmitter, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '@app/interfaces/role';

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

  @Input() roles!: Role[] | null;
  @Input() deleteRole: EventEmitter<string> = new EventEmitter<string>();

  delete(id: string) {
    this.deleteRole.emit(id);
  }
}
