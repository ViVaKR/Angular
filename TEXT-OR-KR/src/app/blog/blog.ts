import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-blog',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog {

  blogForm = new FormGroup({

    id: new FormControl(''),
    title: new FormControl(''),
  });
}
