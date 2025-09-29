import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-post-create',
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './post-create.html',
  styleUrl: './post-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCreate {

  title = signal('글 쓰기');

}
