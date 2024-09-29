import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent implements OnChanges {

  private _price: number;
  private _name: string;

  @Input()
  public get price() {
    return this._price;
  }

  public set price(value: number) {
    this._price = value;
  }

  @Input()
  public get name() {
    return this._name;
  }

  @Input() demo: number;

  public set name(value: string) {
    this._name = value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['price']) {
      console.log(changes['price'].currentValue);
    }
  }
}
