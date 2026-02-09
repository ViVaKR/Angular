import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-role',
  imports: [],
  templateUrl: './read-role.html',
  styleUrl: './read-role.scss',
})
export class ReadRole {

  roleId = signal<string | null>(null);
  private route = inject(ActivatedRoute);

  constructor() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.roleId.set(paramId);
  }
}
