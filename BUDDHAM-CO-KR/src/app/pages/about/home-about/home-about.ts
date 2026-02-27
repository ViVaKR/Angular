import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { Subject } from '@microsoft/signalr';
import { catchError, debounceTime, from, fromEvent, interval, map, mergeMap, of, scan, switchMap, timer } from 'rxjs';
import { BodyTitle } from "@app/shared/body-title/body-title";

@Component({
  selector: 'app-home-about',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    BodyTitle
  ],
  templateUrl: './home-about.html',
  styleUrl: './home-about.scss',
})
export class HomeAbout {

  title = Paths.HomeAbout.title;
  counter = signal<number>(0);
  searchControl = new FormControl();


  ngOnInit() {

    // of(1, 2, 3, 4)
    //   .pipe(
    //     map(n => {
    //       if (n === 4) {
    //         throw 'four!';
    //       }
    //       return n;
    //     }),
    //     catchError(err => of('a', 'b', 'c', err))
    //   )
    //   .subscribe(console.log);

    // const div = document.createElement('div');
    // div.style.cssText = 'width: 200px; height: 200px; background: #09c;';
    // document.body.appendChild(div);

    // const clicksDocument = fromEvent(document, 'click', { capture: true });
    // const clicksDiv = fromEvent(div, 'click');

    // clicksDocument.subscribe(() => console.log('document'));
    // clicksDiv.subscribe(() => console.log('div'));

    // const clicks = fromEvent(document, 'click');
    // clicks.subscribe(console.log);

    // const array = [10, 20, 30];
    // const result = from(array);
    // result.subscribe(console.log);

    // of(10, 20, 30)
    //   .subscribe({
    //     next: value => console.log('next', value),
    //     error(err) {
    //       console.log(err)
    //     },
    //     complete: () => console.log('the end')
    //   })


    // const numbers$ = of(1, 2, 3);

    // numbers$.pipe(
    //   scan((total, n) => total + n),
    //   map((sum, index) => sum / (index + 1))
    // )
    //   .subscribe(console.log);

    // addEventListener('keydown', (event: KeyboardEvent) => {
    //   if (event.key === '65') this.oneSubject.next('65');
    // });


    // let ob1$ = timer(2000, 3000);
    // of('1', '2', '3').pipe(
    //   mergeMap(num => of(num))
    // ).subscribe(console.log);

    // this.searchControl.valueChanges.pipe(
    //   debounceTime(1_000),
    //   switchMap(() => interval(500)))
    //   .subscribe((x) => (this.counter.set(x)));

    // fromEvent(document, 'click')
    //   .pipe(switchMap(() => interval(500)))
    //   .subscribe(val => this.counter.set(val));
  }
}
