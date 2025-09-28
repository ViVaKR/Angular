import { AfterViewInit, Component, signal } from '@angular/core';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.scss'
})
export class Post implements AfterViewInit {

  count = signal(0);

  constructor() {

    this.count.set(
      this.count() + 1
    )
  }

  ngAfterViewInit(): void { }


}
