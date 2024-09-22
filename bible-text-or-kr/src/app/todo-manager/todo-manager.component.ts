import { CommonModule, JsonPipe } from '@angular/common';
import { Component, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { TodosStore } from '@app/store/todo.store';
import { PrettyPrintPipe } from "../pipes/pretty-print.pipe";
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-manager',
  standalone: true,
  imports: [
    JsonPipe,
    PrettyPrintPipe,
    RouterOutlet,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatLabel,
    CommonModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './todo-manager.component.html',
  styleUrl: './todo-manager.component.scss'
})
export class TodoManagerComponent implements OnInit {

  store = inject(TodosStore);

  @ViewChild('btn') button!: ElementRef<HTMLDivElement>;
  @ViewChild('svg') svg!: ElementRef<SVGElement>;

  showSvg: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.showSvg.set(false);
    this.loadTodos().then(() => console.log('Todos loaded'));
  }

  async loadTodos() {
    await this.store.loadAll();
  }

  onClick() {
    this.button.nativeElement.classList.add('active');

    setTimeout(() => {
      this.button.nativeElement.classList.remove('active');
      this.showSvg.set(true);
    }, 6000);
  }
}
