import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-checkbox',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    JsonPipe
  ],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkbox {
  
  private readonly _formBuilder = inject(FormBuilder);

  readonly topping
    = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });
}
