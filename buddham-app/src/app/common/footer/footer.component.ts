import { Component, Output, Input, EventEmitter, booleanAttribute, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnChanges {

  @Output() toParentEvent = new EventEmitter<string>();

  private _defaultValue!: string;
  @Input({ required: true })
  get defaultValue() { return this._defaultValue; }
  set defaultValue(value: string) { this._defaultValue = value + ' - Received'; }

  @Input({ transform: booleanAttribute }) itemAvailablility!: boolean;

  @Input() major = 0;
  @Input() minor = 0;

  changeLog: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    const log: string[] = [];
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }

  sendToParent(value: string) {
    this.toParentEvent.emit(this.defaultValue + ', ' + value);
  }
}
