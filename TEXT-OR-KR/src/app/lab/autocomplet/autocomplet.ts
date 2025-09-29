import {AsyncPipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {map, Observable, startWith} from 'rxjs';

@Component({
  selector: 'app-autocomplet',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButton
  ],
  templateUrl: './autocomplet.html',
  styleUrl: './autocomplet.scss'
})
export class Autocomplet implements OnInit {

  formControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> = null!;

  ngOnInit(): void {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(x => this.filter(x || '')),
    );
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
