import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { BuddhaService } from '@app/services/buddha.service';
import { BuddistScripture } from '@app/types/buddist-scripture';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buddhist-scripture',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './buddhist-scripture.component.html',
  styleUrl: './buddhist-scripture.component.scss'
})
export class BuddhistScriptureComponent implements OnInit {

  sutras$!: Observable<BuddistScripture[]>;
  service = inject(BuddhaService);

  ngOnInit(): void {
    this.sutras$ = this.service.getScriptures();
  }
}

