import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent implements OnInit,
  AfterViewInit,
  AfterContentChecked,
  DoCheck,
  AfterViewChecked {

  public test = '-';

  currentClasses: Record<string, boolean> = {};
  setCurrentClasses() {
    this.currentClasses = {
      'text-red-500': true,
      'text-white': true,
      'p-4': true,
      'm-4': true
    };
  }

  constructor() {
    console.log('(1) constructor called');
  }

  ngOnInit() {
    console.log('(2) ngOnInit called');
  }

  ngDoCheck() { // Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    console.log('(3) ngDoCheck called');
  }

  ngAfterContentChecked(): void {
    console.log('(4) ngAfterContentChecked called');
  }

  ngAfterViewInit(): void {
    console.log('(5) ngAfterViewInit called');
  }

  ngAfterViewChecked() {
    console.log('(6) ngAfterViewChecked called');
  }

  clickMe() {
    console.log('Clicked');
  }
}
