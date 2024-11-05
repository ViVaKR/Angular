import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-regular-expression',
  standalone: true,
  imports: [],
  templateUrl: './regular-expression.component.html',
  styleUrl: './regular-expression.component.scss'
})
export class RegularExpressionComponent {
  rendered: any;
  clipboardButton: any;
  katexOptions: any;
  onCopyToClipboard() {
    throw new Error('Method not implemented.');
  }

  @Input()
  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
}
